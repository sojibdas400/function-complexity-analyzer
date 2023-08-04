const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let a, b;

rl.question("Enter two numbers separated by space: ", (input) => {
    const tokens = input.split(" ");
    a = parseInt(tokens[0]);
    b = parseInt(tokens[1]);
    console.log(a + b);
    rl.close();
});
