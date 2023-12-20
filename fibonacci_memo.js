
//fibonacci with memoization
function Fib(n) {
  var sequence = [0, 1];
  var i = sequence.length;
  var results = 0;
  if (n < i) {
    return n;
  } else {
    while (i <= n) {
      results = sequence[i - 1] + sequence[i - 2];
      sequence.push(results);
      i++;
    }
    return results;
  }
}

console.log(Fib(10)); // 55
