# Function Complexity Analyzer

Function Complexity Analyzer is a utility that helps you analyze the time and space complexity of JavaScript functions and perform stress testing on them. It's useful for understanding the performance characteristics of your functions under different input sizes.

## Requirements

-   Node.js (v14 or later)

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/sojibdas400/function-complexity-analyzer.git
cd function-complexity-analyzer

const { generateInput, checkComplexity, stressTest, functionAnalyzer } = require('./utils/utils.js');
```

## Checking Complexity

```
function exampleFunction(arr) {
  // Your function implementation here...
}

const functionsArray = [exampleFunction];
const inputSizes = [10, 100, 1000, 10000];

const complexityResults = checkComplexity(functionsArray, inputSizes);
```

## Stress Testing

```
const functionsArray = [exampleFunction,exampleFunction,.....];
const numIterations = 100;
const maxInput = 10000;
const ElapsedTimes = true; // Set to false if you don't want to log elapsed times.

const stressTestResults = stressTest(functionsArray, numIterations, maxInput, ElapsedTimes);

```

## Function Analyzer

```
const functionsArray = [exampleFunction,exampleFunction,.....];
const numIterations = 10;
const maxInput = 10000;
const ElapsedTimes = true;
const inputSizes = [10, 100, 1000, 10000];

functionAnalyzer(functionsArray, numIterations, maxInput, ElapsedTimes, inputSizes);

```
