import {ReactElement} from 'react'
export default function Explorer(): ReactElement  {
    return (
        <div className="xeokit-tabs">
  <div className="xeokit-tab xeokit-modelsTab">
    <a
      className="xeokit-i18n xeokit-tab-btn"
      href="#"
      data-xeokit-i18n="modelsExplorer.title"
    >
      Models
    </a>
    <div className="xeokit-tab-content">
      <div className="xeokit-btn-group">
        <button
          type="button"
          className="xeokit-i18n xeokit-loadAllModels xeokit-btn disabled"
          data-xeokit-i18n="modelsExplorer.loadAll"
          data-xeokit-i18ntip="modelsExplorer.loadAllTip"
          data-tippy-content="Load all models"
        >
          Load all
        </button>
        <button
          type="button"
          className="xeokit-i18n xeokit-unloadAllModels xeokit-btn disabled"
          data-xeokit-i18n="modelsExplorer.unloadAll"
          data-xeokit-i18ntip="modelsExplorer.unloadAllTip"
          data-tippy-content="Unload all models"
        >
          Unload all
        </button>
        <button
          type="button"
          className="xeokit-i18n xeokit-addModel xeokit-btn disabled"
          data-xeokit-i18n="modelsExplorer.add"
          data-xeokit-i18ntip="modelsExplorer.addTip"
          data-tippy-content="Add model"
        >
          Add
        </button>
      </div>
      <div className="xeokit-models" />
    </div>
  </div>
  <div className="xeokit-tab xeokit-objectsTab">
    <a
      className="xeokit-i18n xeokit-tab-btn disabled"
      href="#"
      data-xeokit-i18n="objectsExplorer.title"
    >
      Objects
    </a>
    <div className="xeokit-tab-content">
      <div className="xeokit-btn-group">
        <button
          type="button"
          className="xeokit-i18n xeokit-showAllObjects xeokit-btn disabled"
          data-xeokit-i18n="objectsExplorer.showAll"
          data-xeokit-i18ntip="objectsExplorer.showAllTip"
          data-tippy-content="Show all objects"
        >
          Show all
        </button>
        <button
          type="button"
          className="xeokit-i18n xeokit-hideAllObjects xeokit-btn disabled"
          data-xeokit-i18n="objectsExplorer.hideAll"
          data-xeokit-i18ntip="objectsExplorer.hideAllTip"
          data-tippy-content="Hide all objects"
        >
          Hide all
        </button>
      </div>
      <div className="xeokit-objects xeokit-tree-panel" />
    </div>
  </div>
  <div className="xeokit-i18n xeokit-tab xeokit-classesTab">
    <a
      className="xeokit-i18n xeokit-tab-btn disabled"
      href="#"
      data-xeokit-i18n="classesExplorer.title"
    >
      Classes
    </a>
    <div className="xeokit-tab-content">
      <div className="xeokit-btn-group">
        <button
          type="button"
          className="xeokit-i18n xeokit-showAllClasses xeokit-btn disabled"
          data-xeokit-i18n="classesExplorer.showAll"
          data-xeokit-i18ntip="classesExplorer.hideAllTip"
          data-tippy-content="Show all classes"
        >
          Show all
        </button>
        <button
          type="button"
          className="xeokit-i18n xeokit-hideAllClasses xeokit-btn disabled"
          data-xeokit-i18n="classesExplorer.hideAll"
          data-xeokit-i18ntip="classesExplorer.hideAllTip"
          data-tippy-content="Hide all classes"
        >
          Hide all
        </button>
      </div>
      <div className="xeokit-classes xeokit-tree-panel" />
    </div>
  </div>
  <div className="xeokit-tab xeokit-storeysTab">
    <a
      className="xeokit-i18n xeokit-tab-btn disabled"
      href="#"
      data-xeokit-i18n="storeysExplorer.title"
    >
      Storeys
    </a>
    <div className="xeokit-tab-content">
      <div className="xeokit-btn-group">
        <button
          type="button"
          className="xeokit-i18n xeokit-showAllStoreys xeokit-btn disabled"
          data-xeokit-i18n="storeysExplorer.showAll"
          data-xeokit-i18ntip="storeysExplorer.showAllTip"
          data-tippy-content="Show all storeys"
        >
          Show all
        </button>
        <button
          type="button"
          className="xeokit-i18n xeokit-hideAllStoreys xeokit-btn disabled"
          data-xeokit-i18n="storeysExplorer.hideAll"
          data-xeokit-i18ntip="storeysExplorer.hideAllTip"
          data-tippy-content="Hide all storeys"
        >
          Hide all
        </button>
      </div>
      <div className="xeokit-storeys xeokit-tree-panel" />
    </div>
  </div>
</div>

    )
}