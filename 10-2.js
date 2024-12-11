const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

let matrix = input.split("\n").map((a) => a.split(""));

function findValidTrail(i, j, total) {
  console.log(i, j, total);
  if (matrix[i][j] == "9") {
    return total + 1;
  }
  if (matrix[i + 1] != undefined)
    if (matrix[i + 1][j] == Number(matrix[i][j]) + 1)
      total = findValidTrail(i + 1, j, total);
  if (matrix[i - 1] != undefined)
    if (matrix[i - 1][j] == Number(matrix[i][j]) + 1)
      total = findValidTrail(i - 1, j, total);
  if (matrix[i][j + 1] != undefined)
    if (matrix[i][j + 1] == Number(matrix[i][j]) + 1)
      total = findValidTrail(i, j + 1, total);
  if (matrix[i][j - 1] != undefined)
    if (matrix[i][j - 1] == Number(matrix[i][j]) + 1)
      total = findValidTrail(i, j - 1, total);
  return total;
}

let totalScore = 0;
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j] == "0") {
      totalScore += findValidTrail(i, j, 0);
    }
  }
}
console.log(totalScore);
