const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd();
const inputArr = input.split("\n");
const ruleMap = new Map();
let pageLine = 0;
let updates = [];

function checkRules(row, ruleMap) {
  for (let i = 0; i < row.length; i++) {
    if (ruleMap.get(row[i]) != undefined) {
      let rules = ruleMap.get(row[i]);
      for (let j = 0; j < rules.length; j++) {
        if (row.indexOf(row[i]) <= row.indexOf(rules[j])) continue;
        if (row.indexOf(rules[j]) == -1) continue; //rule val doesnt exist
        return false;
      }
    }
  }
  return true;
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
  if (checkRules(updates[i], ruleMap))
    sum += updates[i][Math.floor(updates[i].length / 2)];
}
console.log(sum);
