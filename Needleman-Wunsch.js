class MatrixEntry {
  constructor(arrow, score) {
    this.arrow = arrow;
    this.score = score;
  }
}

const string1 = "AGTACGCA";
const string2 = "TATGC";
const string3 = "AAAAAAAAAAAGGGGGGAAAAAA";
const string4 = "AAAAAAAGGGAGGAAAAAA";
const database = [string2, string3, string4];

console.log(compareDatabase(string1,database));

function compareDatabase(string, database) {
  let result = [];
  for (let i = 0; i < database.length; i++) {
    result.push(Align(string, database[i]));
  }
  return result;
}

function Align(str1, str2) {
  var matrix = [];
  var gap = -1;
  var match = 1;
  var mismatch = -1;
  var i, j;
  var m = str1.length;
  var n = str2.length;
  var min = n;
  var max = m;

  for (i = 0; i <= max; i++) {
    matrix[i] = [];
    for (j = 0; j <= min; j++) {
      matrix[i][j] = new MatrixEntry("none", 0);
    }
  }
  for (i = 0; i <= max; i++) {
    matrix[i][0].score = i * gap;
    matrix[i][0].arrow = "up";
  }
  for (j = 0; j <= min; j++) {
    matrix[0][j].score = j * gap;
    matrix[0][j].arrow = "left";
  }
  for (i = 1; i <= max; i++) {
    for (j = 1; j < min + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        if (
          matrix[i - 1][j - 1].score + match >= matrix[i - 1][j].score + gap &&
          matrix[i - 1][j - 1].score + match >= matrix[i][j - 1].score + gap
        ) {
          matrix[i][j].score = matrix[i - 1][j - 1].score + match;
          matrix[i][j].arrow = "diagonal";
        } else if (
          matrix[i - 1][j].score + gap > matrix[i - 1][j - 1].score + match &&
          matrix[i - 1][j].score + gap > matrix[i][j - 1].score + gap
        ) {
          matrix[i][j].score = matrix[i - 1][j].score + gap;
          matrix[i][j].arrow = "up";
        } else if (
          matrix[i][j - 1].score + gap > matrix[i - 1][j - 1].score + match &&
          matrix[i][j - 1].score + gap > matrix[i - 1][j].score + gap
        ) {
          matrix[i][j].score = matrix[i][j - 1].score + gap;
          matrix[i][j].arrow = "left";
        }
      } else {
        if (
          matrix[i - 1][j - 1].score + mismatch >=
            matrix[i - 1][j].score + gap &&
          matrix[i - 1][j - 1].score + mismatch >= matrix[i][j - 1].score + gap
        ) {
          matrix[i][j].score = matrix[i - 1][j - 1].score + mismatch;
          matrix[i][j].arrow = "diagonal";
        } else if (
          matrix[i - 1][j].score + gap >
            matrix[i - 1][j - 1].score + mismatch &&
          matrix[i - 1][j].score + gap > matrix[i][j - 1].score + gap
        ) {
          matrix[i][j].score = matrix[i - 1][j].score + gap;
          matrix[i][j].arrow = "up";
        } else if (
          matrix[i][j - 1].score + gap >
            matrix[i - 1][j - 1].score + mismatch &&
          matrix[i][j - 1].score + gap > matrix[i - 1][j].score + gap
        ) {
          matrix[i][j].score = matrix[i][j - 1].score + gap;
          matrix[i][j].arrow = "left";
        }
      }
    }
  }

  var alignment = [[], []];

  // TODO beregn alignment ud fra "pile" i matrix
  i = m;
  j = n;
  while (i > 0 || j > 0) {
    if (matrix[i][j].arrow === "diagonal") {
      alignment[0].push(str1[i - 1]);
      alignment[1].push(str2[j - 1]);
      i--;
      j--;
    } else if (matrix[i][j].arrow === "left") {
      alignment[0].push("-");
      alignment[1].push(str2[j - 1]);
      j--;
    } else if (matrix[i][j].arrow === "up") {
      alignment[0].push(str1[i - 1]);
      alignment[1].push("-");
      i--;
    }
  }
  return [matrix[m][n].score, alignment[0].join(""), alignment[1].join("")];
}

// AGC-G-CG
// A-CTCACG
