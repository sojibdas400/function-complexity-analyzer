const {
    checkComplexity,
    stressTest,
    functionAnalyzer,
} = require("./utils/utils.js");

function MaxPairwiseProductNaive(A) {
    let product = 0;
    const n = A.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            product = Math.max(product, A[i] * A[j]);
        }
    }

    return product;
}
function maxPairwiseProductFast(A) {
    let n = A.length;
    if (n < 2) {
        throw new Error("Array must contain at least two elements.");
    }

    let index1 = 0;
    for (let i = 1; i < n; i++) {
        if (A[i] > A[index1]) {
            index1 = i;
        }
    }

    let index2 = 0;
    for (let i = 1; i < n; i++) {
        if (i !== index1 && A[i] > A[index2]) {
            index2 = i;
        }
    }

    return A[index1] * A[index2];
}

// Call the functionAnalyzer to analyze the complexity and perform stress testing
const { complexityResults, stressTestResults } = functionAnalyzer(
    [MaxPairwiseProductNaive, maxPairwiseProductFast],
    10, // Number of stress test iterations
    10000, // Maximum size of the stress test input
    true, // Set this to 'true' to log elapsed times during stress testing
    [10, 100, 1000, 10000] // Input sizes for complexity analysis
);

// Display complexity results
console.log("Complexity Results:");
console.dir(complexityResults, { depth: null });

// Display stress test results
console.log("Stress Test Results:");
console.log(stressTestResults);

// Calculate and display the total elapsed time for each function
const totalElapsedTimes = stressTestResults.reduce((acc, result) => {
    const funcName = result.funcName || "anonymous";
    acc[funcName] = (acc[funcName] || 0) + result.elapsedMs;
    return acc;
}, {});

console.log("Total Elapsed Times:", totalElapsedTimes);
