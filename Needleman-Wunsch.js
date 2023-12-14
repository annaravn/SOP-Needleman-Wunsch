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

console.log(compareDatabase(string1, database));

function compareDatabase(string, database) {
  let result = [];
  for (let i = 0; i < database.length; i++) {
    result.push(Align(string, database[i]));
  }
  return result;
}

function Align(str1, str2) {
  var matrix = []; //et tomt array oprettes
  //der angives "point" for match, mismatch og gap
  var gap = -1;
  var match = 1;
  var mismatch = -1;
  var i, j;
  //strengenes længde gemmes i variabler
  var m = str1.length;
  var n = str2.length;

  //et tomt matrix oprettes ved hjælp af et array bestående af arrays
  for (i = 0; i <= m; i++) {
    matrix[i] = [];
    for (j = 0; j <= n; j++) {
      matrix[i][j] = new MatrixEntry("none", 0);
    }
  }

  //den første række og den første kolonne udfyldes med "point" for gap

  for (i = 0; i <= m; i++) {
    matrix[i][0].score = i * gap;
    matrix[i][0].arrow = "up";
  }
  for (j = 0; j <= n; j++) {
    matrix[0][j].score = j * gap;
    matrix[0][j].arrow = "left";
  }

  //resten af matricen udfyldes ved hjælp af de eksisterende værdier,
  // og der angives "pile", i de retninger, der giver det største antal point

  for (i = 1; i <= m; i++) {
    for (j = 1; j < n + 1; j++) {
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

  //der oprettes to arrays, der skaber alignmentet
  // her følges pilene fra nederste højre hjørne i matricen, hvorefter
  // pilene følges baglæns, indtil det øverste venstre hjørne nås
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

  //funktionen returnerer det endelige alignment og scoren
  // her bruges "join", som laver et string af arrayet
  return [matrix[m][n].score, alignment[0].join(""), alignment[1].join("")];
}

// AGC-G-CG
// A-CTCACG
