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

// checkComplexity([MaxPairwiseProductNaive, maxPairwiseProductFast]);
// stressTest([MaxPairwiseProductNaive, maxPairwiseProductFast], 10, 20,true);
functionAnalyzer(
    [MaxPairwiseProductNaive, maxPairwiseProductFast],
    100,
    10,
    true
);
