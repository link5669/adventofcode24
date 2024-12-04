const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

const matrix = input.split("\n").map((a) => a.split(""));
const pattern = "XMAS";
const exp = new RegExp(pattern, "g");

let count = 0;

for (let i = 0; i < matrix.length; i++) {
  let rowCopy = [...matrix[i]];
  while ((match = exp.exec(rowCopy.join(""))) !== null) count++;
  while ((match = exp.exec(rowCopy.reverse().join(""))) !== null) count++;
}

for (let i = 0; i < matrix[0].length; i++) {
  let col = "";
  for (let j = 0; j < matrix.length; j++) {
    col += matrix[j][i];
  }
  while ((match = exp.exec(col)) !== null) count++;
  while ((match = exp.exec(col.split("").reverse().join(""))) !== null) count++;
}

function checkDiagonal(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let col = "";
    for (let j = 0; j < matrix[0].length; j++) {
      if (i + j >= matrix.length) break;
      col += matrix.at(i + j).at(j);
    }
    while ((match = exp.exec(col)) !== null) count++;
    while ((match = exp.exec(col.split("").reverse().join(""))) !== null)
      count++;
  }
  for (let i = 1; i < matrix[0].length; i++) {
    let col = "";
    for (let j = 0; j < matrix.length; j++) {
      if (i + j >= matrix[0].length) break;
      col += matrix.at(j).at(j + i);
    }
    while ((match = exp.exec(col)) !== null) count++;
    while ((match = exp.exec(col.split("").reverse().join(""))) !== null)
      count++;
  }
}

checkDiagonal(matrix);
let newMatrix = matrix.map((row) => row.slice());
newMatrix = newMatrix.map((a) => a.reverse());
checkDiagonal(newMatrix);

console.log(count);
