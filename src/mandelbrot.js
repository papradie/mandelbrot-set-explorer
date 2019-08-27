import { canvasProps, maxIterations } from './constants';

const calcStepX = viewport => Math.abs(viewport.x.max - viewport.x.min) / canvasProps.width;

const calcStepY = viewport => Math.abs(viewport.y.max - viewport.y.min) / canvasProps.height;

const calculatePoints = viewport => {
    const stepX = calcStepX(viewport, canvasProps);
    const stepY = calcStepY(viewport, canvasProps);

    let points = [];
    for (let i = 0; i < canvasProps.width; i++) {
        points[i] = [];
        for (let j = 0; j < canvasProps.height; j++) {
            points[i][j] = iterate(viewport.x.min + stepX * i, viewport.y.min + stepY * j, maxIterations);
        }
    }

    return points;
}

const iterate = (real, imaginary, maxIterations) => {
    let zReal = 0;
    let zImag = 0;

    let zRealSquared = 0;
    let zImagSquared = 0;

    let i = 0;
    while (zRealSquared + zImagSquared <= 4 && i < maxIterations) {
        zImag = zReal * zImag;
        zImag += zImag;
        zImag += imaginary;

        zReal = zRealSquared - zImagSquared + real;
        zRealSquared = zReal * zReal;
        zImagSquared = zImag * zImag;

        i++;
    }
    return i;
}

export { calculatePoints, calcStepX, calcStepY }