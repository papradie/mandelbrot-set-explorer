import { canvasProps, maxIterations } from './constants';

const getCanvasContext = () => {
    const canvas = document.getElementById(canvasProps.id);
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

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

const binaryColoring = (x, maxIterations) => x < maxIterations
    ? '#000000'
    : '#ffffff';

const discreteColorColoring = (x, maxIterations) => {
    let hue = Math.floor(255 * x / maxIterations);
    let saturation = 255;
    let value = x < maxIterations ? 255 : 0;
    return `hsl(${hue}, 100%, 50%)`;
}

const bwColoring = (x, maxIterations) => {
    const color = 255 - Math.floor(x * 255 / maxIterations);
    return rgbToHex(color, color, color);
}

const coloringFn = bwColoring;

export { drawScene }