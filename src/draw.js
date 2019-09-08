import { canvasProps, maxIterations } from './constants';

const getCanvasContext = () => {
    const canvas = document.getElementById(canvasProps.id);
    canvas.width = canvasProps.width;
    canvas.height = canvasProps.height;

    const context = canvas.getContext('2d');
    context.canvas.width  = canvasProps.width;
    context.canvas.height = canvasProps.height;
    return context;
}

const drawScene = points => {
    const context = getCanvasContext();

    for (let i = 0; i < canvasProps.width; i++) {
        for (let j = 0; j < canvasProps.height; j++) {
            context.fillStyle = coloringFn(points[i][j], maxIterations);
            context.fillRect(i, j, 1, 1);
        }
    }
}

const binaryColoring = (point, maxIterations) => point.n < maxIterations
    ? '#000000'
    : '#ffffff';

const bwColoring  = (point, maxIterations) => {
    const color = 255 - Math.floor(point.n * 255 / maxIterations);
    return `rgb(${color}, ${color}, ${color})`;
}

const makePalette = () => {
    let palette = []
    // wrap values to a saw tooth pattern.
    function wrap(x) {
        x = ((x + 256) & 0x1ff) - 256;
        if (x < 0) x = -x;
        return x;
    }
    for (let i = 0; i <= maxIterations; i++) {
        palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
    }
    palette[maxIterations] = [0,0,0];
    return palette;
};

const palette = makePalette();

const colorfulColoring = (point, maxIterations) => {
    let color = palette[point.n];

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

const coloringFn = colorfulColoring;

export { drawScene }