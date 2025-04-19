import {
  BCFViewpointsPlugin,
  FastNavPlugin,
  math,
  stats,
  Viewer,
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";
import { Controller } from "./forkedComponents/src/Controller";
import { LocaleService, ObjectsKdTree3 } from "@xeokit/xeokit-sdk";
import { CanvasContextMenu } from "./forkedComponents/src/contextMenus/CanvasContextMenu";
import { ObjectContextMenu } from "./forkedComponents/src/contextMenus/ObjectContextMenu";
import { ModelsContextMenu } from "./forkedComponents/src/contextMenus/ModelsContextMenu";
import { SectionToolContextMenu } from "./forkedComponents/src/contextMenus/SectionToolContextMenu";
import { TreeViewContextMenu } from "./forkedComponents/src/contextMenus/TreeViewContextMenu";

class BIMViewer extends Controller {
  constructor(server, cfg = {}) {
    if (cfg.busyModelBackdropElement) {
      throw "Не определен элемент busyModelBackdropElement ";
    }

    if (cfg.canvasElement) {
      throw "Не определен canvasElement ";
    }

    if (cfg.explorerElement) {
      throw "Не определен explorerElement ";
    }

    if (cfg.inspectorElement) {
      throw "Не определен inspectorElement ";
    }

    if (cfg.toolbarElement) {
      throw "Не определен toolbarElement ";
    }

    if (cfg.navCubeCanvasElement) {
      throw "Не определен navCubeCanvasElement ";
    }
    const {
      busyModelBackdropElement,
      canvasElement,
      explorerElement,
      explorerTabId,
      inspectorElement,
      toolbarElement,
      navCubeCanvasElement,
      localeService,
    } = cfg;

    const viewer = new Viewer({
      canvasElement,
      localeService,
    });

    super(null, cfg, server, viewer);

    this._configs = {};
    this._enableAddModels = false;
    this._enableMeasurements = true;
    this._enablePropertiesInspector = true;

    this.viewer = viewer;

    this._objectKdTree3 = new ObjectsKdTree3({ viewer });
    this._customizeViewer();

    this._explorerElement = explorerElement;
    this._inspectorElement = inspectorElement;

    this._modelsExplorer = {};
    this._objectsExplorer = {};
    this._classesExplorer = {};
    this._storeysExplorer = {};
    this._propertiesInspector = {};
  }

  get localeService() {
    return this.viewer.localeService;
  }

  _customizeViewer() {
    const scene = this.viewer.scene;

    // Emphasis effects

    scene.xrayMaterial.fill = false;
    scene.xrayMaterial.fillAlpha = 0.3;
    scene.xrayMaterial.fillColor = [0, 0, 0];
    scene.xrayMaterial.edges = true;
    scene.xrayMaterial.edgeAlpha = 0.1;
    scene.xrayMaterial.edgeColor = [0, 0, 0];

    scene.highlightMaterial.edges = true;
    scene.highlightMaterial.edgeColor = [1, 1, 1];
    scene.highlightMaterial.edgeAlpha = 1.0;
    scene.highlightMaterial.fill = true;
    scene.highlightMaterial.fillAlpha = 0.1;
    scene.highlightMaterial.fillColor = [1, 0, 0];

    scene.selectedMaterial.edges = true;
    scene.selectedMaterial.edgeColor = [1, 1, 1];
    scene.selectedMaterial.edgeAlpha = 1.0;
    scene.selectedMaterial.fill = true;
    scene.selectedMaterial.fillAlpha = 0.1;
    scene.selectedMaterial.fillColor = [0, 1, 0];

    //------------------------------------------------------------------------------------------------------------------
    // Configure points material
    //------------------------------------------------------------------------------------------------------------------

    scene.pointsMaterial.pointSize = 1;
    scene.pointsMaterial.roundPoints = true;
    scene.pointsMaterial.perspectivePoints = true;
    scene.pointsMaterial.minPerspectivePointSize = 2;
    scene.pointsMaterial.maxPerspectivePointSize = 4;

    // Camera control

    this.viewer.cameraControl.panRightClick = false;
    this.viewer.cameraControl.followPointer = true;
    this.viewer.cameraControl.doublePickFlyTo = false;
    this.viewer.cameraControl.smartPivot = true;

    // Dolly tweaks for best precision when aligning camera for BCF snapshots

    this.viewer.cameraControl.keyboardDollyRate = 100.0;
    this.viewer.cameraControl.mouseWheelDollyRate = 100.0;
    this.viewer.cameraControl.dollyInertia = 0;
    this.viewer.cameraControl.dollyMinSpeed = 0.04;
    this.viewer.cameraControl.dollyProximityThreshold = 30.0;

    //Доработай CameraPivotElement, Ввынеси из классА, сделай аргументом конструктора и компонентом реакта.
    //Вообще, почему он цепляется к document?
    const cameraPivotElement = document
      .createRange()
      .createContextualFragment(
        "<div class='xeokit-camera-pivot-marker'></div>"
      ).firstChild;
    document.body.appendChild(cameraPivotElement);
    this.viewer.cameraControl.pivotElement = cameraPivotElement;

    scene.camera.perspective.near = 0.01;
    scene.camera.perspective.far = 3000.0;
    scene.camera.ortho.near = 0.01;
    scene.camera.ortho.far = 2000.0; //

    // Scalable Ambient Obscurance (SAO) defaults
    // Since SAO is non-interactive, set to higher-quality

    const sao = scene.sao;
    sao.enabled = true;
    sao.numSamples = 50;
    sao.kernelRadius = 200;
  }

  _initCanvasContextMenus() {
    this._canvasContextMenu = new CanvasContextMenu(this, {
      hideOnAction: true,
      enableMeasurements: true,
    });
    this._objectContextMenu = new ObjectContextMenu(this, {
      hideOnAction: true,
      enableMeasurements: true,
    });

    const getCanvasPosFromEvent = function (event) {
      const canvasPos = [];
      if (!event) {
        event = window.event;
        canvasPos[0] = event.x;
        canvasPos[1] = event.y;
      } else {
        let element = event.target;
        let totalOffsetLeft = 0;
        let totalOffsetTop = 0;
        let totalScrollX = 0;
        let totalScrollY = 0;
        while (element.offsetParent) {
          totalOffsetLeft += element.offsetLeft;
          totalOffsetTop += element.offsetTop;
          totalScrollX += element.scrollLeft;
          totalScrollY += element.scrollTop;
          element = element.offsetParent;
        }
        canvasPos[0] = event.pageX + totalScrollX - totalOffsetLeft;
        canvasPos[1] = event.pageY + totalScrollY - totalOffsetTop;
      }
      return canvasPos;
    };

    this.viewer.scene.canvas.canvas.addEveventListener("contextmenu", event => {
      const canvasPos = getCanvasPosFromEvent(event);
      const hit = this.viewer.scene.pick({
        canvasPos,
      });
      if (hit /** pick()  в пределах Viewer */ && hit.entity.isObject) {
        this._canvasContextMenu.hide();
        this._objectContextMenu.context = {
          viewer: this.viewer,
          bimViewer: this,
          showObjectInExplorer: objectId => {},
        };
      }
    });
  }

  _initConfigs() {}

  setConfigs() {}

  setConfig(name, value) {}

  getConfig(name) {}

  getProjectsInfo(done, error) {}

  getProjectInfo(projectId, modelId, objectId, done, error) {   }

  loadProject() {}

  unloadProject() {}

  getLoadedProjectId() {}

  getModelIds() {}

  loadModel(modelId, done, error) {}

  loadAllModels(/**внимательно с аргументом */) {}

  getLoadedModelIds() {}

  isModelLoaded(modelId) {}

  unloadModel(modelId) {}

  unloadAllModels() {}

  setBackgroundColor(rgbColor) {}

  getObjectColorSource() {}

  setViewerState(/**внимательно с аргументом */) {}

  _parseSelectedStorey() {}

  _parseThreeDMode() {}

  showObjectInExplorer(objectId) {}

  unshowObjectInExplorer() {}

  showObjectProperties(objectId) {}

  setObjectsVisible(objectIds, visible) {}

  setAllObjectsVisible(visible) {}

  setObjectsXRayed(objectIds, xrayed){}

  setAllObjectsXRayed(xrayed) {}

  setObjectsSelected(objectIds, selected) {}

  setAllObjectsSelected(selected) {}

  _withObjectsInSubtree(objectIds, callback) {}

  flyToObjects(objectId, done) {}

  viewFitObjects(objectIds, done) {}

  viewFitAll(done) {}

  jumpToObject(objectId) {}

  setCamera(camera) {}

  viewFitModels(modelIds, done) {}

  openTab(tabId) {}

  _openTab(element, tabSelector /***   */) {}

  getOpenTab() {}

  set3DEnabled(enabled, done) {}

  get3DEnabled() {}

  setSpaceShown(shown) {}

  getSpacesShown() {}

  setOrhthoEnabled(enabled, done) {
  }

  getOrthoEnabled() {}  

  selectStorey(storeyObjectid, done) {}

  saveBCFViewpoint(option) {}

  loadBCFViewpoint(bcfViewpoint, options) {}

  resetView() {}

  setControlsEnabled(enabled) {}

  setKeyboardEnabled(enabled) {}

  getKeyboardEnabled() {}

  clearSections() {}

  disableSections() {
  }

  enableSections() {}

  flipSections() {}

  hideSectionEditControl() {}

  getNumSections() {}

  getEnableMeasurements() {}

  clearMeasurements() {}

  getNumMeasurements() {}

  setMeasurementsAxisVisible(axisVisible) {}

  getMeasurementsAxisVisible() {}

  setMeasurementsSnappingEnabled(snappingEnabled) {}

  getMeasurementsSnappingEnabled() {}

  destroy() {}

}

export default BIMViewer;
