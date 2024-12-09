const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

let matrix = input.split("\n").map((a) => a.split(""));
let matrixCopy = input.split("\n").map((a) => a.split(""));

let symbols = new Map();

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j] == ".") continue;
    if (!symbols.get(matrix[i][j])) {
      symbols.set(matrix[i][j], [[i, j]]);
    } else {
      let currIndices = symbols.get(matrix[i][j]);
      symbols.set(matrix[i][j], [...currIndices, [i, j]]);
    }
  }
}

symbols.forEach((indices) => {
  for (let i = 0; i < indices.length; i++) {
    for (let j = 0; j < indices.length; j++) {
      if (i == j) continue;
      let dy = Math.abs(indices[i][0] - indices[j][0]);
      let dx = Math.abs(indices[i][1] - indices[j][1]);
      let newCoordY =
        indices[i][0] < indices[j][0] ? indices[i][0] - dy : indices[i][0] + dy;
      let newCoordX =
        indices[i][1] < indices[j][1] ? indices[i][1] - dx : indices[i][1] + dx;
      while (
        !(
          newCoordY > matrix.length - 1 ||
          newCoordY < 0 ||
          newCoordX < 0 ||
          newCoordX > matrix[0].length
        )
      ) {
        matrixCopy[newCoordY][newCoordX] = "#";
        newCoordY =
          indices[i][0] < indices[j][0] ? newCoordY - dy : newCoordY + dy;
        newCoordX =
          indices[i][1] < indices[j][1] ? newCoordX - dx : newCoordX + dx;
      }
    }
  }
});
symbols.forEach((symbol) => {
  if (symbol.length > 1)
    symbol.forEach((coord) => {
      matrixCopy[coord[0]][coord[1]] = "#";
    });
});
let numAntinode = 0;
for (let i = 0; i < matrix.length; i++) {
  let str = "";
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrixCopy[i][j] == "#") numAntinode++;
    str += matrixCopy[i][j];
  }
}

console.log(numAntinode);
