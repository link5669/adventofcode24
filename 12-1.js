const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd()
  .split("\n")
  .map((a) => a.split(""));

let letters = [];
let visited = new Array(input.length);
for (let i = 0; i < visited.length; i++)
  visited[i] = new Array(input[0].length).fill(0);

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (visited[i][j] == 1) continue;
    let ret = findLocalArea(i, j, 1, 0);
    letters.push({
      letter: input[i][j],
      area: ret.area,
      perimeter: ret.perimeter,
    });
    index = letters.length - 1;
  }
}
// console.log(letters);

let total = 0;
for (let i = 0; i < letters.length; i++) {
  total += letters[i].area * letters[i].perimeter;
}

console.log(total);

function findLocalArea(i, j, area, perimeter) {
  visited[i][j] = 1;
  perimeter += checkPerimeter(i, j);
  if (input[i - 1] != undefined && visited[i - 1][j] == 0)
    if (input[i - 1][j] == input[i][j]) {
      ret = findLocalArea(i - 1, j, area + 1, perimeter);
      area = ret.area;
      perimeter += ret.perimeter - perimeter;
    }
  if (input[i + 1] != undefined && visited[i + 1][j] == 0)
    if (input[i + 1][j] == input[i][j]) {
      ret = findLocalArea(i + 1, j, area + 1, perimeter);
      area = ret.area;
      perimeter += ret.perimeter - perimeter;
    }
  if (input[i][j + 1] != undefined && visited[i][j + 1] == 0)
    if (input[i][j + 1] == input[i][j]) {
      ret = findLocalArea(i, j + 1, area + 1, perimeter);
      area = ret.area;
      perimeter += ret.perimeter - perimeter;
    }
  if (input[i][j - 1] != undefined && visited[i][j - 1] == 0)
    if (input[i][j - 1] == input[i][j]) {
      ret = findLocalArea(i, j - 1, area + 1, perimeter);
      area = ret.area;
      perimeter += ret.perimeter - perimeter;
    }
  return { area: area, perimeter: perimeter };
}

function checkPerimeter(i, j) {
  let perimeter = 0;

  if (input[i - 1] == undefined) perimeter++;
  else if (input[i - 1][j] != input[i][j]) {
    perimeter++;
  }

  if (input[i + 1] == undefined) perimeter++;
  else if (input[i + 1][j] != input[i][j]) {
    perimeter++;
  }

  if (input[i][j + 1] == undefined) perimeter++;
  else if (input[i][j + 1] != input[i][j]) {
    perimeter++;
  }

  if (input[i][j - 1] == undefined) perimeter++;
  else if (input[i][j - 1] != input[i][j]) {
    perimeter++;
  }

  return perimeter;
}
