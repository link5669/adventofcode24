const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

const matrix = input.split("\n").map((a) => a.split(""));
let count = 0;

for (let i = 1; i < matrix.length - 1; i++) {
  for (let j = 1; j < matrix[0].length - 1; j++) {
    if (matrix[i][j] != "A") continue;
    if (
      !(
        (matrix[i - 1][j - 1] == "M" && matrix[i + 1][j + 1] == "S") ||
        (matrix[i - 1][j - 1] == "S" && matrix[i + 1][j + 1] == "M")
      )
    )
      continue;
    if (
      (matrix[i - 1][j + 1] == "M" && matrix[i + 1][j - 1] == "S") ||
      (matrix[i - 1][j + 1] == "S" && matrix[i + 1][j - 1] == "M")
    )
      count++;
  }
}

console.log(count);
