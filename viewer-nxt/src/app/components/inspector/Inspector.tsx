export default function Inspector () {
    return (
        <div className="xeokit-tabs bg-orange-100" onContextMenu={(e) => {e.preventDefault()}} >
  <div className="xeokit-tab xeokit-propertiesTab">
    <a
      className="xeokit-i18n xeokit-tab-btn disabled"
      href="#"
      data-xeokit-i18n="propertiesInspector.title"
    >
      Properties
    </a>
    <div className="xeokit-tab-content">
      <div className="xeokit-properties" />
    </div>
  </div>
</div>
    )
}