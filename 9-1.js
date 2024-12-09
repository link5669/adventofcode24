const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();
input = input.split("");
let filesystem = [];
let index = 0;

function findFreeSpace() {
  for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] == ".") return i;
  }
  return -1;
}

function checkDoneMove() {
  let foundFree = false;
  for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] == ".") foundFree = true;
    if (filesystem[i] != "." && foundFree) return false;
  }
  return true;
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < Number(input[i]); j++) {
    filesystem.push(i % 2 == 0 ? index : ".");
  }
  if (i % 2) index++;
}

for (let i = filesystem.length - 1; i >= 0; i--) {
  if (checkDoneMove()) break;
  if (filesystem[i] != ".") {
    const freeSpace = findFreeSpace();
    const temp = filesystem[i];
    filesystem[i] = filesystem[freeSpace];
    filesystem[freeSpace] = temp;
  }
}
let checksum = 0;
for (let i = 0; i < filesystem.length; i++) {
  checksum += filesystem[i] != "." && Number(filesystem[i]) * i;
}
console.log(checksum);
