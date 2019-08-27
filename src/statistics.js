import { maxIterations } from './constants'

const pointsStats = points => {
    const flatPoints = points.flat();

    let sum = flatPoints.reduce((acc, curr) => acc + curr, 0);
    console.log(`Average iterations count is ${sum / (600 * 400)}`);

    let maxIterationsReached = flatPoints.filter(x => x === maxIterations).length;
    console.log(`Max iterations reached in ${maxIterationsReached} cases (${maxIterationsReached / flatPoints.length * 100}%)`)
}

export { pointsStats }