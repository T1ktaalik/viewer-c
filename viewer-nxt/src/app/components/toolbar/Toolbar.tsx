import ResetViewButton from "./toolbarButtons/ResetViewButton"
import Toggle2d3dButton from "./toolbarButtons/Toggle2d3dButton"
import TogglePerspectiveOrthoButton from "./toolbarButtons/TogglPerspectiveOrthoButton"
import ViewFitButton from "./toolbarButtons/ViewFitButton"
import ShowIfcSpacesButton from "./toolbarButtons/ShowIfcSpacesButton"
import FirstPersonModeButton from "./toolbarButtons/FirstPersonModeButton"
import HideObjectsButton from "./toolbarButtons/HideObjectsButton"
import SelectObjectsButton from "./toolbarButtons/SelectObjectsButton"
import MarqueeSelectObjectsButton from "./toolbarButtons/MarqueeSelectObjectsButton"
import MeasureDistanceButton from "./toolbarButtons/MeasureDistanceButton"
import MeasureAngleButton from "./toolbarButtons/MeasureAngleButton"
import SliceObjectsButton from "./toolbarButtons/SliceObjectsButton"

export default function Toolbar() {
    return (<div className="xeokit-toolbar bg-blue-100" onContextMenu={(e) => {e.preventDefault()}}>
        {/* Reset button */}
        <div className="xeokit-btn-group">
          <ResetViewButton />
        </div>
        <div className="xeokit-btn-group" role="group">
          {/* 3D Mode button */}
          <Toggle2d3dButton />
          {/* Perspective/Ortho Mode button */}
          <TogglePerspectiveOrthoButton />
          {/* Fit button */}
          <ViewFitButton />
          {/* First Person mode button */}
          <FirstPersonModeButton />
          {/* Show/hide IFCSpaces */}
          <ShowIfcSpacesButton />
        </div>
        {/* Tools button group */}
        <div className="xeokit-btn-group" role="group">
          {/* Hide tool button */}
          <HideObjectsButton />
          {/* Select tool button */}
          <SelectObjectsButton />
          {/* Marquee select tool button */}
            <MarqueeSelectObjectsButton />
          {/* Measure distance tool button */}
          <MeasureDistanceButton />
          {/* Measure angle tool button */}
          <MeasureAngleButton />
          {/* section tool button */}
          <SliceObjectsButton />
        </div>
      </div>
      )
}