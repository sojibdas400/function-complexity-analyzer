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
 * Checks the time and space complexity of an array of functions for different input sizes.
 * @param {Function[]} functionsArray - An array of functions to be analyzed.
 * @param {number[]} [inputSizes=[10, 100, 1000, 10000]] - An array of input sizes to test the functions with.
 * @returns {Object} An object containing the complexity results for each function.
 */
function checkComplexity(functionsArray, inputSizes = [10, 100, 1000, 10000]) {
    console.log("------------");
    const result = {};

    for (const fn of functionsArray) {
        const fnName = fn.name || "Anonymous Function";
        const timeResults = {};
        const spaceResults = {};

        for (const size of inputSizes) {
            const input = generateInput(size);

            // Measure time complexity
            const startTime = performance.now();
            fn(input);
            const endTime = performance.now();
            const elapsedMs = endTime - startTime;
            timeResults[size] = elapsedMs;

            // Measure space complexity (Node.js)
            const startMemory = process.memoryUsage().heapUsed;
            fn(input);
            const endMemory = process.memoryUsage().heapUsed;
            const usedMemory = endMemory - startMemory;
            spaceResults[size] = usedMemory;
        }

        result[fnName] = { timeResults, spaceResults };
    }

    console.log("Complexity Results", result);
    return result;
}
/**
 * Performs stress testing on an array of functions with a large input for a specified number of iterations.
 * @param {Function|Function[]} functionsArray - A function or an array of functions to be stress tested.
 * @param {number} [numIterations=100] - The number of iterations to run the stress test.
 * @param {number} [maxInput=10000] - The maximum size of the input for the stress test.
 * @param {boolean} [ElapsedTimes=false] - If true, the elapsed time for each iteration will be logged.
 * @returns {Object[]} An array of stress test results for each function.
 */
function stressTest(
    functionsArray,
    numIterations = 100,
    maxInput = 10000,
    ElapsedTimes = false
) {
    const input = generateInput(maxInput);

    const stressTestFunction = (func, iteration, isArray) => {
        const startTime = performance.now();
        const result = func(input);
        const endTime = performance.now();
        const elapsedMs = endTime - startTime;
        let funcName = func.name;

        if (ElapsedTimes) {
            console.log(`Iteration ${iteration}:`);
            console.log(
                `${
                    func.name || "anonymous"
                } Input ${input}  Output ${result} => OK`
            );
            console.log(`Elapsed Time: ${elapsedMs} ms` + "\n");
            if (isArray) {
                console.log("------------");
            }
        }

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

            const areAllResultsSame = results.every(
                (value, index, array) => value.result === array[0].result
            );

            if (!areAllResultsSame) {
                console.log(
                    "Wrong test: Outputs of different functions do not match."
                );
                for (let i = 0; i < functionsArray.length; i++) {
                    const func = functionsArray[i];
                    const result = results[i];
                    console.log(
                        `${func.name || "anonymous"} Output: ${JSON.stringify(
                            result.result
                        )}`
                    );
                }
                break;
            }
        } else {
            const result = stressTestFunction(functionsArray, iteration);
            results.push(result);
        }
    }

    // Calculate and display the total elapsed time for each function
    const totalElapsedTimes = {};

    for (const result of results) {
        const funcName = result.funcName || "anonymous";
        if (!totalElapsedTimes[funcName]) {
            totalElapsedTimes[funcName] = 0;
        }
        totalElapsedTimes[funcName] += result.elapsedMs;
    }

    console.log("Total Elapsed Times:");
    for (const funcName in totalElapsedTimes) {
        console.log(`${funcName}: ${totalElapsedTimes[funcName]} ms`);
    }

    return results;
}
/**
 * Analyzes the complexity and performs stress testing on an array of functions.
 * @param {Function|Function[]} functionsArray - A function or an array of functions to be analyzed.
 * @param {number} [numIterations=10] - The number of iterations to run the stress test.
 * @param {number} maxInput - The maximum size of the input for the stress test.
 * @param {boolean} ElapsedTimes - If true, the elapsed time for each iteration will be logged.
 * @param {number[]} [inputSizes=[10, 100, 1000, 10000]] - An array of input sizes to test the functions with.
 */
function functionAnalyzer(
    functionsArray,
    numIterations = 10,
    maxInput,
    ElapsedTimes,
    inputSizes = [10, 100, 1000, 10000]
) {
    console.log("############");
    checkComplexity(functionsArray, inputSizes);
    stressTest(functionsArray, numIterations, maxInput, ElapsedTimes);
    console.log("############");
}

module.exports = {
    generateInput,
    checkComplexity,
    stressTest,
    functionAnalyzer,
};
