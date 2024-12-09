const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

let matrix = input.split("\n").map((a) => a.split(" "));
let totalResult = 0;
for (let i = 0; i < matrix.length; i++) {
  let val = Number(matrix[i][0].substring(0, matrix[i][0].length - 1));
  let combos = operatorCombos(matrix[i].length - 2);
  for (let j = 0; j < combos.length; j++) {
    let testVal = Number(matrix[i][1]);
    for (let k = 2; k < matrix[i].length; k++) {
      testVal =
        combos[j][k - 2] == "*"
          ? testVal * Number(matrix[i][k])
          : combos[j][k - 2] == "+"
            ? testVal + Number(matrix[i][k])
            : Number(String(testVal) + String(matrix[i][k]));
    }
    if (val == testVal) {
      totalResult += val;
      break;
    }
  }
}
console.log(totalResult);

function operatorCombos(length) {
  if (length <= 0) return [];
  const result = [];
  function generate(current, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    for (const letter of ["*", "+", "||"]) {
      current.push(letter);
      generate(current, remaining - 1);
      current.pop();
    }
  }

  generate([], length);
  return result;
}
