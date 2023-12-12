const string1 = "AGTACGCA";
const string2 = "TATGC";
const string3 = "AAAAAAAAAAAGGGGGGAAAAAA";
const string4 = "AAAAAAAGGGAGGAAAAAA";
const database = [string1,string3,string4];
console.log(Align(string1,string2));
console.log(Align(string3,string4));
console.log(compareDatabase(string2,database));
console.log(compareDatabase(string3,database));


class box {
    constructor(value,direction) {
        this.value = value;
        this.direction = direction;
    }
}



function compareDatabase(string, database) {
    let result = [];
    for (let i = 0; i < database.length; i++) {
        result.push(Align(string,database[i]));

}
return result;
}


function Align(str1,str2) {
    var matrix = [];
    var gap = -1;
    var match = 1;
    var mismatch = -1;
    var i,j;
    var m = str1.length;
    var n = str2.length;
    var max = Math.max(m,n);
    var alignment = "";
    for (i=0;i<=max;i++) {
        matrix[i] = [];
        for (j=0;j<=max;j++) {
        matrix[i][j] = 0;
        
        }
    }
    for (i=0;i<=m;i++) {
        matrix[i][0] = i*gap;
    }
    for (j=0;j<=n;j++) {
        matrix[0][j] = j*gap;
    }
    for (i=1;i<=m;i++) {
        for (j=1;j<=n;j++) {
        if (str1[i-1] == str2[j-1]) {
            matrix[i][j] = matrix[i-1][j-1] + match;
        } else {
            matrix[i][j] = Math.max(matrix[i-1][j-1] + mismatch,
                                    matrix[i-1][j] + gap,
                                    matrix[i][j-1] + gap);
        }
        }
    }
    return matrix[m][n];
}
