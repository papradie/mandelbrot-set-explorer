
const withPerf = (fn, args) => {
    const t0 = performance.now();
    const result = fn.apply(null, args);
    const t1 = performance.now();
    console.log(`%cFunction ${fn.name} run in ${Math.floor(t1 - t0)} milliseconds`, 'color: blue');
    return result;
}

export { withPerf }