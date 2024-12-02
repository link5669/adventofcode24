let matrix = input.split("\n");
matrix = matrix.map((row) => row.split(" ").map(Number));

let sum = 0;
for (let i = 0; i < matrix.length; i++) {
  let ascending = -1;
  let marked = 0;
  for (let j = 1; j < matrix[i].length; j++) {
    if (matrix[i][j] > matrix[i][j - 1]) {
      if (ascending == 0) {
        marked = 1;
        break;
      }
      ascending = 1;
    } else {
      if (ascending == 1) {
        marked = 1;
        break;
      }
      ascending = 0;
    }
    let diff = Math.abs(matrix[i][j] - matrix[i][j - 1]);
    if (!(diff > 0 && diff < 4)) {
      marked = 1;
      break;
    }
  }
  if (marked == 0) {
    sum++;
  }
}

console.log(sum);
