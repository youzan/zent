function cmp(a: number, b: number): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function getPotentialValues(
  marks: Record<string | number, React.ReactNode> | undefined
) {
  if (!marks) {
    return [];
  }
  return Object.keys(marks)
    .map(it => Number(it))
    .filter(it => !Number.isNaN(it) && it !== Infinity)
    .sort(cmp);
}

export function normalizeToPotentialValue(
  potentialValues: number[],
  value: number
) {
  let i = 0;
  let j = potentialValues.length;
  while (true) {
    const p = Math.floor((i + j) / 2);
    if (j === i + 1 || p === i) {
      if (
        Math.abs(potentialValues[i] - value) <=
        Math.abs(potentialValues[j] - value)
      ) {
        return potentialValues[i];
      }
      return potentialValues[j];
    }
    const mid = potentialValues[p];
    if (value === mid) {
      return mid;
    }
    if (value < mid) {
      j = p;
    } else if (value > mid) {
      i = p;
    }
  }
}
