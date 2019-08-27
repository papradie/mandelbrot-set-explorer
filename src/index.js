import { withPerf } from './performance';
import { calculatePoints, calcStepX, calcStepY } from './mandelbrot';
import { drawScene } from './draw';
import { pointsStats } from './statistics';
import { canvasProps } from './constants';
import style from "./style.css";

const calcStep = (min, max, totalSize) => Math.abs(max - min) / totalSize;

// FIXME using global namespace is not very nice!
window.zoom = event => {
    let xmin = viewport.x.min  + (event.clientX - 75) * viewport.x.step;
    let xmax = viewport.x.min  + (event.clientX + 75) * viewport.x.step;

    let ymin = viewport.y.min  + (event.clientY - 50) * viewport.y.step;
    let ymax = viewport.y.min  + (event.clientY + 50) * viewport.y.step;

    viewport = {
        x: { min: xmin, max: xmax, step: calcStep(xmin, xmax, canvasProps.width) },
        y: { min: ymin, max: ymax, step: calcStep(ymin, ymax, canvasProps.height) }
    }

    redrawWithPerf();
}

const redraw = (viewport) => {
    // calculate all points in viewport
    const points = withPerf(calculatePoints, [viewport]);

    // print statistics about the points
    pointsStats(points);

    // draw scene
    withPerf(drawScene, [points]);
}

const redrawWithPerf = () => withPerf(redraw, [viewport]);

let viewport = {
    x: { min: -2, max: 1, step: calcStep(-2, 1, canvasProps.width) },
    y: { min: -1, max: 1, step: calcStep(-1, 1, canvasProps.height) }
}

redrawWithPerf();