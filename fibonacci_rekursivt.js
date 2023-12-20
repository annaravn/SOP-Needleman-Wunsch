
function FibRec (n) {
    if (n < 2) {
        return n;
    } else {
        return FibRec(n - 1) + FibRec(n - 2);
    }
}

console.log(FibRec(10));