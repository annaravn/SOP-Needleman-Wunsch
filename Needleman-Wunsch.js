import "./harlekin.js";
import "./egen_mariehøne.js";
import "./gebleri.js";
import "./myg.js";
import "./pallens.js";
//opretter klassen MatrixEntry, som indeholder en pil og en score
class MatrixEntry {
  constructor(arrow, score) {
    this.arrow = arrow;
    this.score = score;
  }
}

const database1 = [[harlekin,"harlekin"],[gebleri,"gebleri"],[myg,"myg"]];
const database2 = [[pallens, "pallens"],[harlekin,"harlekin"],[gebleri,"gebleri"]];

const string1 = "AGTACGCA";
const string2 = "TATGC";
console.log(Align(string1, string2));
//console.log(compareDatabase(mariehøne, database1));
//console.log(compareDatabase(myg, database2));
//console.log(Align("AGGGCCAAATT",gebleri));

//sammenligner en enkelt streng med en database bestående af et array af strenge
//kalder Align funktionen for hver streng i databasen
function compareDatabase(string, database) {
  let result = [];
  for (let i = 0; i < database.length; i++) {
    result.push([ database[i][1]],Align(string, database[i][0]));
  }
  return result;
}

console.log(testAlign());

function testAlign() {
  let result = Align("AGC", "AC");
  if (result[0] === 1 && result[1] === "AGC" && result[2] === "A-C") {
    return [result[0], result[1], result[2], ["test Align() passed"]];
  } else {
    return [result[0], result[1], result[2], ["test Align() failed"]];
  }
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
    matrix.push([]);
    for (j = 0; j <= n; j++) {
      matrix[i].push(new MatrixEntry("none", 0));
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
    for (j = 1; j <= n; j++) {
      var diagonalMatch = matrix[i - 1][j - 1].score + match;
      var diagonalMismatch = matrix[i - 1][j - 1].score + mismatch;
      var up = matrix[i - 1][j].score + gap;
      var left = matrix[i][j - 1].score + gap;

      if (str1[i - 1] === str2[j - 1]) {
        if (diagonalMatch >= up && diagonalMatch >= left) {
          matrix[i][j].score = diagonalMatch;
          matrix[i][j].arrow = "diagonal";
        } else if (up >= diagonalMatch && up >= left) {
          matrix[i][j].score = up;
          matrix[i][j].arrow = "up";
        } else if (left >= diagonalMatch && left >= up) {
          matrix[i][j].score = left;
          matrix[i][j].arrow = "left";
        }
      } else {
        if (diagonalMismatch >= up && diagonalMismatch >= left) {
          matrix[i][j].score = diagonalMismatch;
          matrix[i][j].arrow = "diagonal";
        } else if (up >= diagonalMismatch && up >= left) {
          matrix[i][j].score = up;
          matrix[i][j].arrow = "up";
        } else if (left >= diagonalMismatch && left >= up) {
          matrix[i][j].score = left;
          matrix[i][j].arrow = "left";
        }
      }
    }
  }

  var alignment = [[], []];

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
    } else {
      console.log("hovsa");
    }
  }

  //funktionen returnerer det endelige alignment og scoren
  // her bruges "join", som laver et string af arrayet
  return [
   matrix[m][n].score,
    alignment[0].reverse().join(""),
    alignment[1].reverse().join(""),
  ];
}

// AGC-G-CG
// A-CTCACG
