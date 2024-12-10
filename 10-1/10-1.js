const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

const matrixInput = input.split("\n").map((a) => a.split(""));

function findValidTrail(matrix, i, j, total) {
  console.log(i, j, total);
  if (matrix[i][j] == "9") {
    matrix[i][j] = "X";
    return [matrix, total + 1];
  }
  if (matrix[i + 1] != undefined)
    if (matrix[i + 1][j] == Number(matrix[i][j]) + 1)
      [matrix, total] = findValidTrail(matrix, i + 1, j, total);
  if (matrix[i - 1] != undefined)
    if (matrix[i - 1][j] == Number(matrix[i][j]) + 1)
      [matrix, total] = findValidTrail(matrix, i - 1, j, total);
  if (matrix[i][j + 1] != undefined)
    if (matrix[i][j + 1] == Number(matrix[i][j]) + 1)
      [matrix, total] = findValidTrail(matrix, i, j + 1, total);
  if (matrix[i][j - 1] != undefined)
    if (matrix[i][j - 1] == Number(matrix[i][j]) + 1)
      [matrix, total] = findValidTrail(matrix, i, j - 1, total);
  return [matrix, total];
}

let totalScore = 0;
for (let i = 0; i < matrixInput.length; i++) {
  for (let j = 0; j < matrixInput[0].length; j++) {
    if (matrixInput[i][j] == "0") {
      let newMatrix = JSON.parse(JSON.stringify(matrixInput));
      let [, trailScore] = findValidTrail(newMatrix, i, j, 0);
      totalScore += trailScore;
    }
  }
}
console.log(totalScore);
