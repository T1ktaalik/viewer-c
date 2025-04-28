import Explorer from "./explorer/Explorer";
import Inspector from "./inspector/Inspector";
import Toolbar from "./toolbar/Toolbar";
import BIMViewer from "../BIMViewer/BIMViewer";
import { LocaleService } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";
import  { messages }  from "../BIMViewer/source/locales/messages";
import { Server } from "@xeokit/xeokit-bim-viewer";
import { useRef} from "react";

export default function Viewer() {
  
  type AllowedTabId = "models" | "objects" | "classes" | "storeys" // this is a type alias
  const explorerTabId = useRef<AllowedTabId>("models");  
  const explorerElement = useRef<any>(null);
  const inspectorElement = useRef<any>(null);
  const navCubeCanvasElement = useRef<any>(null);
  const toolbarElement = useRef<any>(null);
  const canvasElement = useRef<any>(null);
  const viewerAppElement = useRef<any>(null);

  const server = new Server({ dataDir: "./data" }); //Добавь requestParams.dataDir

  
  /*  const bimViewer = new BIMViewer(server, {
    localeService: new LocaleService({
      messages,
      locale: "ru",
    }),
    busyModelBackdropElement: viewerAppElement.current,
    canvasElement: canvasElement.current,
    navCubeCanvasElement: navCubeCanvasElement.current,
    explorerElement: explorerElement.current,
    inspectorElement: inspectorElement.current,
    toolbarElement: toolbarElement.current,
    explorerTabId: explorerTabId.current,
  });  */

  return (
    <>
      <div id="viewerApp" ref={viewerAppElement}>
        <div id="toolbar" ref={toolbarElement}  >
          <Toolbar />
        </div>
        <div id="explorer" ref={explorerElement} >
          {" "}
          <Explorer />
        </div>
        <div id="inspector" ref={inspectorElement} >
        
          <Inspector />
        </div>
        <div id="viewer">
          <canvas id="viewerCanvas" ref={canvasElement}></canvas>
          <canvas id="navCubeCanvas" ref={navCubeCanvasElement}></canvas>
        </div>
      </div>
    </>
  );
}
