const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();
const inputArr = input.split("\n");
const ruleMap = new Map();
let pageLine = 0;
let updates = [];

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

function checkRules(row, ruleMap) {
  for (let i = 0; i < row.length; i++) {
    if (ruleMap.get(row[i]) == undefined) continue;
    let rules = ruleMap.get(row[i]);
    for (let j = 0; j < rules.length; j++) {
      if (row.indexOf(row[i]) <= row.indexOf(rules[j])) continue;
      if (row.indexOf(rules[j]) == -1) continue; //rule val doesnt exist
      let newArr = array_move(
        [...row],
        row.indexOf(row[i]),
        row.indexOf(rules[j]),
      );
      return checkRules(newArr, ruleMap);
    }
  }
  return row;
}

for (let i = 0; i < inputArr.length; i++) {
  if (inputArr[i].includes("|")) {
    let rule = inputArr[i].split("|");
    let currValue =
      ruleMap.get(Number(rule[0])) == undefined
        ? []
        : ruleMap.get(Number(rule[0]));
    ruleMap.set(Number(rule[0]), [...currValue, Number(rule[1])]);
  } else {
    pageLine = i;
    break;
  }
}
for (let i = pageLine; i < inputArr.length; i++) {
  updates.push(inputArr[i].split(",").map((a) => Number(a)));
}
let sum = 0;
for (let i = 1; i < updates.length; i++) {
  let fixedRow = checkRules(updates[i], ruleMap);
  console.log(fixedRow, updates[i]);
  if (updates[i] != fixedRow) sum += fixedRow[Math.floor(fixedRow.length / 2)];
}
console.log(sum);
