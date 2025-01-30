function dab(amount) {
  let remaining = Math.round(amount * 100);

  const denominations = [
    20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1,
  ];

  const distribution = [];

  for (let denom of denominations) {
    const count = Math.floor(remaining / denom);
    if (count > 0) {
      distribution.push({
        value: denom / 100,
        count: count,
      });
      remaining %= denom;
    }
  }

  return distribution;
}

export default dab;
