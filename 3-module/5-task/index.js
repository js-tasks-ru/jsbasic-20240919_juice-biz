function getMinMax(str) {
  const numbers = str.split(' ').filter((item) => isFinite(item));
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}