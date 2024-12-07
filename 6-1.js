const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

let direction = 0; // up: 0, right: 1, down: 2, left: 3

let matrix = input.split("\n").map((a) => a.split(""));

let x = 0;
let y = 0;

function next() {
  let lx = x;
  let ly = y;
  switch (direction) {
    case 0:
      x--;
      break;
    case 1:
      y++;
      break;
    case 2:
      x++;
      break;
    case 3:
      y--;
      break;
  }
  if (matrix[x] === undefined) {
    countMarks();
    process.exit();
  }
  if (matrix[x][y] === undefined) {
    countMarks();
    process.exit();
  }
  if (matrix[x][y] == "#") {
    x = lx;
    y = ly;
    direction++;
    if (direction == 4) direction = 0;
  }
  matrix[x][y] = "X";
}

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j] == "^") {
      x = i;
      y = j;
      matrix[x][y] = "X";
    }
  }
}

while (true) {
  next();
  // printMatrix();
}

function printMatrix() {
  console.log("------------");
  let bigstr = "";
  for (let i = 0; i < matrix.length; i++) {
    let str = "";
    for (let j = 0; j < matrix[0].length; j++) {
      str += matrix[i][j];
    }
    bigstr += str;
    bigstr += "\n";
  }
  console.log(bigstr);
  console.log("------------");
}

function countMarks() {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == "X") count++;
    }
  }
  console.log(count);
}
