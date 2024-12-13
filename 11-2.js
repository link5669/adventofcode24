const fs = require("fs");
const path = require("path");
let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();

input = input.split(" ").map((a) => Number(a));

let blinks = 75;
let cache = new Map();

for (let i = 0; i < input.length; i++) {
  let val = cache.get(input[i]);
  if (val != undefined) cache.set(input[i], val + 1);
  else cache.set(input[i], 1);
}

for (let j = 0; j < blinks; j++) {
  let changes = [];
  cache.forEach((k, e) => {
    if (e == 0) {
      changes.push(() => addDup(1, k));
      changes.push(() => addDup(0, -1 * k));
    } else if ((currString = e.toString()).length % 2 == 0) {
      let strLen = currString.length;
      let halfLen = Math.floor(strLen) / 2;
      let left = currString.substring(0, halfLen);
      let right = currString.substring(halfLen, strLen);
      changes.push(() => addDup(Number(right), k));
      changes.push(() => addDup(Number(left), k));
      changes.push(() => addDup(e, -1 * k));
    } else {
      changes.push(() => addDup(e * 2024, k));
      changes.push(() => addDup(e, -1 * k));
    }
  });
  changes.forEach((a) => a());
}

function addDup(key, toAdd) {
  if ((val = cache.get(key)) == undefined) {
    val = 0;
  }
  if (toAdd + val < 1) {
    cache.delete(key);
  } else cache.set(key, toAdd + val);
}

let total = 0;
cache.forEach((a) => (total += a));
console.log(total);
