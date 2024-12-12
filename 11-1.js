const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

input = input.split(" ").map((a) => Number(a));

let blinks = 25;

for (let j = 0; j < blinks; j++) {
  console.log(j);
  for (let i = 0; i < input.length; i++) {
    if (input[i] == 0) {
      input[i] = 1;
    } else if ((currString = input[i].toString()).length % 2 == 0) {
      let strLen = currString.length;
      let halfLen = Math.floor(strLen) / 2;
      let left = currString.substring(0, halfLen);
      let right = currString.substring(halfLen, strLen);
      input[i] = Number(right);
      input.splice(i, 0, Number(left).toString());
      i++;
    } else input[i] = input[i] * 2024;
  }
}
console.log(input.length);
