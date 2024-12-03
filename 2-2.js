let matrix = input.split("\n");
matrix = matrix.map((row) => row.split(" ").map(Number));

function testRow(row) {
  let ascending = -1;
  let marked = false;
  for (let j = 1; j < row.length; j++) {
    if (row[j] > row[j - 1]) {
      if (ascending == 0) {
        return true;
      }
      ascending = 1;
    } else {
      if (ascending == 1) {
        return true;
      }
      ascending = 0;
    }
    let diff = Math.abs(row[j] - row[j - 1]);
    if (!(diff > 0 && diff < 4)) {
      return true;
    }
  }
  return marked;
}

let sum = 0;
let failed = [];
for (let i = 0; i < matrix.length; i++) {
  let marked = testRow(matrix[i]);
  if (!marked) {
    sum++;
  } else {
    failed.push(i);
  }
}

for (let i = 0; i < failed.length; i++) {
  let currRow = matrix[failed[i]];
  for (let j = 0; j < currRow.length; j++) {
    const rowCopy = [...currRow];
    currRow.splice(j, 1);
    if (!testRow(currRow)) {
      currRow = rowCopy;
      sum++;
      break;
    }
    currRow = rowCopy;
  }
}

console.log(sum);
