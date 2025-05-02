import {
  BCFViewpointsPlugin,
  FastNavPlugin,
  math,
  stats,
  Viewer,
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

import {Controller} from "./source/Controller.js";
import {BusyModal} from "./source/BusyModal.js";
import {ResetAction} from "./source/toolbar/ResetAction.js";
import {FitAction} from "./source/toolbar/FitAction.js";
import {FirstPersonMode} from "./source/toolbar/FirstPersonMode.js";
import {HideTool} from "./source/toolbar/HideTool.js";
import {SelectionTool} from "./source/toolbar/SelectionTool.js";
import {ShowSpacesMode} from "./source/toolbar/ShowSpacesMode.js";
import {QueryTool} from "./source/toolbar/QueryTool.js";
import {SectionTool} from "./source/toolbar/SectionTool.js";
import {NavCubeMode} from "./source/toolbar/NavCubeMode.js";

import {ModelsExplorer} from "./source/explorer/ModelsExplorer.js";
import {ObjectsExplorer} from "./source/explorer/ObjectsExplorer.js";
import {ClassesExplorer} from "./source/explorer/ClassesExplorer.js";
import {StoreysExplorer} from "./source/explorer/StoreysExplorer.js";

import {ThreeDMode} from "./source/toolbar/ThreeDMode.js";
import {ObjectContextMenu} from "./source/contextMenus/ObjectContextMenu.js";
import {CanvasContextMenu} from "./source/contextMenus/CanvasContextMenu.js";
import {OrthoMode} from "./source/toolbar/OrthoMode.js";
import {PropertiesInspector} from "./source/inspector/PropertiesInspector.js";
import {ObjectsKdTree3} from "./source/collision/ObjectsKdTree3.js";
import {MarqueeSelectionTool} from "./source/toolbar/MarqueeSelectionTool.js";
import {MeasureDistanceTool} from "./source/toolbar/MeasureDistanceTool.js";
import {MeasureAngleTool} from "./source/toolbar/MeasureAngleTool.js";
type AllowedTabId = "models" | "objects" | "classes" | "storeys";
interface Configs {
  busyModelBackdropElement: HTMLElement;
  canvasElement: HTMLElement;
  explorerElement: HTMLElement;
  inspectorElement: HTMLElement;
  toolbarElement: HTMLElement;
  navCubeCanvasElement: HTMLElement;
  explorerTabId: AllowedTabId;
  localeService: string
}



class BIMViewer extends Controller {
  private configs: any = {};
  private enableAddModels: boolean = false;
  private enableMeasurements: boolean = true;
  private enableProperiesInspector: boolean = true;
  private objectsKdTree3: any = null;


  constructor(server: any, cfg: Configs ) {
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
      keyboardEventsElement: true,
      transparent: false,
      backgroundColor: [1, 1, 1],
      backgroundColorFromAmbientLight: false,
      saoEnabled: true,
      pbrEnabled: false,
      colorTextureEnabled: true,
      numCachedSectionPlanes: 4,
    });

    super(null, cfg, server, viewer);

    this.viewer = viewer;

    //this.objectsKdTree3 = new ObjectsKdTree3(viewer);
  }
}

export default BIMViewer;
