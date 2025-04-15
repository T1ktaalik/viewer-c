import Explorer from './explorer/Explorer'
import Inspector from './inspector/Inspector'

export default function Viewer() {

    return (
        <>
        <div id="explorer"> <Explorer /></div>
        <div id="inspector"> <Inspector /></div>
        <div id="viewer">
            <canvas id="viewerCanvas"></canvas>
            <canvas id="navCubeCanvas"></canvas>
        </div>
        </>
    )
}