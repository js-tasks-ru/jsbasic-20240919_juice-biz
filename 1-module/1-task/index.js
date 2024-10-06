function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    let factorial = n;
    for (let i = n - 1; i > 0; i--) {
      factorial *= n - i;
    }
    return factorial;
  }
}