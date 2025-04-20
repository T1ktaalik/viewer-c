export default function SliceObjectsButton() {
    return (
<button
            type="button"
            className="xeokit-i18n xeokit-section xeokit-btn fa fa-cut fa-2x disabled"
            data-xeokit-i18ntip="toolbar.sliceObjectsTip"
            data-tippy-content="Slice objects"
          >
            <div
              className="xeokit-i18n xeokit-section-menu-button disabled"
              data-xeokit-i18ntip="toolbar.slicesMenuTip"
              data-tippy-content="Slices menu"
            >
              <span className="xeokit-arrow-down xeokit-section-menu-button-arrow" />
            </div>
            <div
              className="xeokit-i18n xeokit-section-counter"
              data-xeokit-i18ntip="toolbar.numSlicesTip"
              data-tippy-content="Number of existing slices"
            />
          </button>
    )
}