const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();
input = input.split("");
let filesystem = [];
let index = 0;

let lastAllocatedFreeBlock = 0;

function findFreeSpace(limit, size) {
  for (let i = 0; i < limit; i++) {
    let blockSize = 0;
    if (filesystem[i] == ".") {
      for (let j = i; j < filesystem.length; j++)
        if (filesystem[j] == ".") blockSize++;
        else {
          if (blockSize >= size) return [blockSize, i];
          else break;
        }
    }
  }
  return [-1, -1];
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
    let blockSize = 0;
    for (let j = i; j >= 0; j--) {
      if (filesystem[j] == filesystem[i]) blockSize++;
      else break;
    }
    let [freeBlockSize, freeBlockIndex] = findFreeSpace(i, blockSize);
    if (blockSize <= freeBlockSize && freeBlockIndex < i) {
      lastAllocatedFreeBlock = freeBlockSize + freeBlockIndex;
      for (let offset = 0; offset < blockSize; offset++) {
        const temp = filesystem[i - blockSize + 1 + offset];
        filesystem[i - blockSize + 1 + offset] =
          filesystem[freeBlockIndex + offset];
        filesystem[freeBlockIndex + offset] = temp;
      }
    }
    i -= blockSize - 1;
  }
}
let checksum = 0;
for (let i = 0; i < filesystem.length; i++) {
  checksum += filesystem[i] != "." && Number(filesystem[i]) * i;
}
console.log(checksum);
