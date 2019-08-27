import { canvasProps, maxIterations } from './constants'

const pointsStats = points => {
    const flatPoints = points.flat().map(item => item.n);

    let data = [
        totalIterations(flatPoints),
        averageIterations(flatPoints),
        maxIterationsReached(flatPoints),
        maxIterationsPercentage(flatPoints)
    ];
    printResults(data);
}

const totalIterations = flatPoints => ({
    desc: 'Total iterations count  ',
    value: flatPoints.reduce((acc, curr) => acc + curr, 0)
});

const averageIterations = flatPoints => ({
    desc: 'Average iterations count',
    value: Math.floor(totalIterations(flatPoints).value / (canvasProps.width * canvasProps.height))
});

const maxIterationsReached = flatPoints => ({
    desc: 'Max iterations reached  ',
    value: flatPoints.filter(x => x === maxIterations).length
});

const maxIterationsPercentage = flatPoints => ({
    desc: 'Max iterations percents ',
    value: `${Math.floor(maxIterationsReached(flatPoints).value / flatPoints.length * 100)}%`
});

const printResults = data => {
    const cssStyle = 'color: orange'
    console.log("%c=== STATISTICS ==========================", cssStyle);
    data.forEach(item => console.log(`%c=== ${item.desc}\t\t\t${item.value}`, cssStyle));
    console.log("%c=========================================", cssStyle);
}

export { pointsStats }