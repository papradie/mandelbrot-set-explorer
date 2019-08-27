import { withPerf } from './performance';
import { calculatePoints, calcStepX, calcStepY } from './mandelbrot';
import { drawScene } from './draw';
import { pointsStats } from './statistics';

import style from "./style.css";


let viewport = {
    x: { min: -2, max: 1 },
    y: { min: -1, max: 1 }
}

// FIXME using global namespace is not very nice!
window.zoom = event => {
    let xmin = viewport.x.min  + (event.clientX - 75) * calcStepX(viewport);
    let xmax = viewport.x.min  + (event.clientX + 75) * calcStepX(viewport);

    let ymin = viewport.y.min  + (event.clientY - 50) * calcStepY(viewport);
    let ymax = viewport.y.min  + (event.clientY + 50) * calcStepY(viewport);

    viewport = {
        x: { min: xmin, max: xmax },
        y: { min: ymin, max: ymax }
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

redrawWithPerf();