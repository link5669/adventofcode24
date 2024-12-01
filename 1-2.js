function inputToArr(input) {
  let left = [];
  let right = [];

  let lineSplit = input.split("\n");
  for (let i = 0; i < lineSplit.length; i++) {
    let lineSplitLine = lineSplit[i].split(" ");
    left.push(Number(lineSplitLine[0]));
    right.push(Number(lineSplitLine[lineSplitLine.length - 1]));
  }
  return { left: left, right: right };
}
function findInstances(input, val) {
  let instances = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == val) {
      instances++;
    }
  }
  return instances;
}

let arrs = inputToArr(input);
let left = arrs.left;
let right = arrs.right;

let similarityScore = 0;
for (let i = 0; i < left.length; i++) {
  similarityScore += findInstances(right, left[i]) * left[i];
}
console.log(similarityScore);
