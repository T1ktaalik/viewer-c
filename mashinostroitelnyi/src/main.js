/* import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
 */

import './style_viewer.css'

import {
  BIMViewer,
  LocaleService,
  Server,
} from 'https://cdn.jsdelivr.net/npm/@xeokit/xeokit-bim-viewer@2.5.1-beta-22';
import { messages as localeMessages } from 'https://cdn.jsdelivr.net/npm/@xeokit/xeokit-bim-viewer@2.5.1-beta-22/dist/messages.js';

const defaultProject = 'm';



window.onload = load;

async function load() {
  const server = new Server({
    //dataDir: './public/data',
    dataDir: 'https://storage.yandexcloud.net/apps.nova-engineering.pro/dorremstroy/data',
  });

  const bimViewer = new BIMViewer(server, {
    localeService: new LocaleService({
      messages: localeMessages,
      locale: 'ru',
    }),
    canvasElement: document.getElementById('canvas'), // WebGL canvas
    keyboardEventsElement: document, // Optional, defaults to document
    explorerElement: document.getElementById('explorer'), // Left panel
    toolbarElement: document.getElementById('toolbar'), // Toolbar
    inspectorElement: document.getElementById('inspector'), // Right panel
    navCubeCanvasElement: document.getElementById('nav-cube-canvas'),
    busyModelBackdropElement: document.getElementById('viewer'),
    enableEditModels: true,
  });

 
/* 

  co
  bimViewer.localeService.on('updated', () => {
    const localizedElements = document.querySelectorAll('.xeokit-i18n');
    localizedElements.forEach((localizedElement) => {
      if (localizedElement.dataset.xeokitI18n) {
        localizedElement.innerText = bimViewer.localeService.translate(
          localizedElement.dataset.xeokitI18n,
        );
      }
      if (localizedElement.dataset.xeokitI18ntip) {
        const translation = bimViewer.localeService.translate(
          localizedElement.dataset.xeokitI18ntip,
        );
        if (translation) {
          localizedElement.dataset.tippyContent = bimViewer.localeService.translate(
            localizedElement.dataset.xeokitI18ntip,
          );
        }
      }
      if (localizedElement.dataset.tippyContent) {
        if (localizedElement._tippy) {
          localizedElement._tippy.setContent(localizedElement.dataset.tippyContent);
        } else {
          tippy(localizedElement, {
            appendTo: 'parent',
            zIndex: 1000000,
            allowHTML: true,
          });
        }
      }
    });
  }); */

  bimViewer.setConfigs({
    showSpaces: false, // Default
   // selectedGlowThrough: true,
    //highlightGlowThrough: true,
    dtxEnabled: true, // Enable data texture scene representation for models - may be slow on low-spec GPUs
    backgroundColor: [0.96, 0.96, 0.96]
  });

  bimViewer.setViewerState({setCamera: {eye: [], look: [], up: [] }})




/*   bimViewer.on('openExplorer', () => {
    setExplorerOpen(true);
  });

  bimViewer.on('openInspector', () => {
    setInspectorOpen(true);
  }); */

/*   bimViewer.on('addModel', (event: BrowserEvent) => {
    // "Add" selected in Models tab's context menu
    console.log('addModel: ' + JSON.stringify(event, null, '\t'));
  });

  bimViewer.on('editModel', (event: BrowserEvent) => {
    // "Edit" selected in Models tab's context menu
    console.log('editModel: ' + JSON.stringify(event, null, '\t'));
  });

  bimViewer.on('deleteModel', (event: BrowserEvent) => {
    // "Delete" selected in Models tab's context menu
    console.log('deleteModel: ' + JSON.stringify(event, null, '\t'));
  }); */

  window.bimViewer = bimViewer;

 // server.getProjects(({ projects }:  any) => {
   /*  const projectSelect = document.getElementById('project-select'); */

    /* projectSelect.addEventListener('change', (event) => {
      bimViewer.unloadAllModels();
      bimViewer.unloadProject();

      const projectId = event.target.value;
      loadProject(projectId);
    }); */

    /* for (const project of projects) {
      const option = document.createElement('option');
      option.value = project.id;
      option.text = project.name;

      if (project.id === defaultProject) option.selected = true;

      projectSelect.add(option);
    } */
 // });

  

  loadProject(defaultProject);

 
}

function loadProject(projectId, modelId, tab) {
  window.bimViewer.loadProject(
    projectId,
    () => {
     /*  if (modelId) bimViewer.loadModel(modelId);
      if (tab) bimViewer.openTab(tab); */
    /*   bimViewer.resetView(); */
      bimViewer.setCamera(
        {
         eye: [56.656, 13, -42.790 ],
          look: [29.378, 4.666, -19.409],
          up: [-0.171,0.974, 0.147], 
        }
      );
    },
    (errorMsg) => {
      console.error(errorMsg);
      /* isLoading = false; */
    },
  );

  setTimeout(() => {
    const x =  window.bimViewer.saveBCFViewpoint()
    console.log( window.bimViewer.viewer.camera.eye)
    console.log( window.bimViewer.viewer.camera.look)
 
    console.log( window.bimViewer.viewer.camera.up)
  }, 10000);
}

/* function setExplorerOpen(explorerOpen) {
  const toggle = document.getElementById('explorer-toggle');
  if (toggle) {
    toggle.checked = explorerOpen;
  }
} */
/* 
function setInspectorOpen(inspectorOpen) {
  const toggle = document.getElementById('inspector-toggle');
  if (toggle) {
    toggle.checked = inspectorOpen;
  }
} */
