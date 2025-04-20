
import {
    BCFViewpointsPlugin,
    FastNavPlugin,
    math,
    stats,
    Viewer,
  } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";
import { Controller } from './src/Controller'
import { Server } from './src/server/Server'
class BIMViewer extends Controller {
  private configs = {}
  private enableAddModels: boolean = false;
  private enableMeasurements: boolean = true;

    constructor(server: any, cfg: any={}) {
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
                numCachedSectionPlanes: 4
              });

        super(null, cfg, server, viewer)
       
}
    }

    

export default BIMViewer