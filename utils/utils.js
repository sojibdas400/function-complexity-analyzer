/**
 * Generates a random number between 1 and 1000 (inclusive).
 * @returns {number} The random number generated.
 */
function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

/**
 * Generates an array of random numbers of a specified size.
 * @param {number} size - The size of the array to be generated.
 * @returns {number[]} An array of random numbers.
 */
function generateInput(size) {
    return Array.from({ length: size }, getRandomNumber);
}

/**
 * Measures the time and space complexity of a function for a given input size.
 * @param {Function} fn - The function to be analyzed.
 * @param {number[]} input - The input for the function.
 * @returns {Object} An object containing the complexity results.
 */
function analyzeFunctionComplexity(fn, input) {
    const timeResults = {};
    const spaceResults = {};

    // Measure time complexity
    const startTime = performance.now();
    fn(input);
    const endTime = performance.now();
    const elapsedMs = endTime - startTime;
    timeResults[input.length] = elapsedMs;

    // Measure space complexity (Node.js)
    const startMemory = process.memoryUsage().heapUsed;
    fn(input);
    const endMemory = process.memoryUsage().heapUsed;
    const usedMemory = endMemory - startMemory;
    spaceResults[input.length] = usedMemory;

    return { timeResults, spaceResults };
}

/**
 * Checks the time and space complexity of an array of functions for different input sizes.
 * @param {Function[]} functionsArray - An array of functions to be analyzed.
 * @param {number[]} inputSizes - An array of input sizes to test the functions with.
 * @returns {Object} An object containing the complexity results for each function.
 */
function checkComplexity(functionsArray, inputSizes) {
    const result = {};

    for (const fn of functionsArray) {
        const fnName = fn.name || "Anonymous Function";
        result[fnName] = {};

        for (const size of inputSizes) {
            const input = generateInput(size);
            const complexityResult = analyzeFunctionComplexity(fn, input);
            result[fnName][size] = complexityResult;
        }
    }

    return result;
}

/**
 * Performs stress testing on an array of functions with a large input for a specified number of iterations.
 * @param {Function|Function[]} functionsArray - A function or an array of functions to be stress tested.
 * @param {number} numIterations - The number of iterations to run the stress test.
 * @param {number} maxInput - The maximum size of the input for the stress test.
 * @param {boolean} [ElapsedTimes=false] - If true, the elapsed time for each iteration will be returned.
 * @returns {Object[]} An array of stress test results for each function.
 */
function stressTest(
    functionsArray,
    numIterations,
    maxInput,
    ElapsedTimes = false
) {
    const input = generateInput(maxInput);

    const stressTestFunction = (func, iteration, isArray) => {
        const startTime = performance.now();
        const result = func(input);
        const endTime = performance.now();
        const elapsedMs = endTime - startTime;
        let funcName = func.name;

        return { result, elapsedMs, funcName };
    };

    const results = [];

    for (let iteration = 1; iteration <= numIterations; iteration++) {
        if (Array.isArray(functionsArray)) {
            for (const func of functionsArray) {
                const result = stressTestFunction(
                    func,
                    iteration,
                    (isArray = true)
                );
                results.push(result);
            }
        } else {
            const result = stressTestFunction(functionsArray, iteration);
            results.push(result);
        }
    }

    return results;
}

/**
 * Analyzes the complexity and performs stress testing on an array of functions.
 * @param {Function|Function[]} functionsArray - A function or an array of functions to be analyzed.
 * @param {number} numIterations - The number of iterations to run the stress test.
 * @param {number} maxInput - The maximum size of the input for the stress test.
 * @param {boolean} ElapsedTimes - If true, the elapsed time for each iteration will be logged.
 * @param {number[]} inputSizes - An array of input sizes to test the functions with.
 * @returns {Object} An object containing the complexity and stress test results.
 */
function functionAnalyzer(
    functionsArray,
    numIterations,
    maxInput,
    ElapsedTimes,
    inputSizes
) {
    const complexityResults = checkComplexity(functionsArray, inputSizes);
    const stressTestResults = stressTest(
        functionsArray,
        numIterations,
        maxInput,
        ElapsedTimes
    );
    return { complexityResults, stressTestResults };
}

module.exports = {
    generateInput,
    checkComplexity,
    stressTest,
    functionAnalyzer,
};
