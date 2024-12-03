const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const pattern = "mul\\\([0-9]+,[0-9]+\\\)|do\\\(\\\)|don't\\\(\\\)";
function reverseNumber(num) {
  const reversed = parseInt(
    Math.abs(num).toString().split("").reverse().join(""),
  );
  return reversed * Math.sign(num);
}
const exp = new RegExp(pattern, "g");
let matches = [];
while ((match = exp.exec(input)) !== null) matches.push(match[0]);
let total = 0;
let reading = true;
for (let i = 0; i < matches.length; i++) {
  if (matches[i] == "don't()") reading = false;
  if (matches[i] == "do()") reading = true;
  if (reading) {
    let a,
      b = 0;
    for (let j = 4; j < matches[i].length; j++) {
      let num = 0;
      while (!isNaN(matches[i][j])) {
        num = num * 10 + Number(matches[i][j]);
        j++;
      }
      if (a == 0) a = num;
      else b = num;
      if (b != 0) {
        total += a * b;
      }
    }
  }
}
console.log(matches, total);
