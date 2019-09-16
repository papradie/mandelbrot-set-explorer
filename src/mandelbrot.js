import { canvasProps, maxIterations } from './constants';

const calculatePoints = viewport => {
    let points = [];
    for (let i = 0; i < canvasProps.width; i++) {
        for (let j = 0; j < canvasProps.height; j++) {
            points.push({
                i, j,
                ...iterate(viewport.x.min + viewport.x.step * i, viewport.y.min + viewport.y.step * j, maxIterations)
            });
        }
    }
    return points;
}

const iterate = (real, imaginary, maxIterations) => {
    let i=0, zReal=0, zImag=0, zRealSquared=0, zImagSquared=0;

    while (zRealSquared + zImagSquared <= 4 && i < maxIterations) {
        zImag = zReal * zImag;
        zImag += zImag;
        zImag += imaginary;

        zReal = zRealSquared - zImagSquared + real;
        zRealSquared = zReal * zReal;
        zImagSquared = zImag * zImag;

        i++;
    }
    return { n: i, real: zReal, imag: zImag };
}

export { calculatePoints }