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

function findAndPopLowest(input) {
  let lowest = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < input.length; i++) {
    if (input[i] < lowest) {
      lowest = input[i];
    }
  }
  input.splice(input.indexOf(lowest), 1);
  return { lowest: lowest, input: input };
}

let arrs = inputToArr(input);
let left = arrs.left;
let right = arrs.right;

let distanceSum = 0;
while (left.length > 0) {
  let retLeft = findAndPopLowest(left);
  let retRight = findAndPopLowest(right);
  distanceSum += Math.abs(retLeft.lowest - retRight.lowest);
  left = retLeft.input;
  right = retRight.input;
}
console.log(distanceSum);
