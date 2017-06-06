export const getValue = (value, max, min) => {
  return min + (max - min) * value;
};

export const getDecimal = step => {
  const fixed = String(step).split('.')[1];
  return fixed ? fixed.length : 0;
};

export const toFixed = (value, step) => {
  const length = getDecimal(step);
  return Number(Number(value).toFixed(length));
};

export const getLeft = (value, max, min) => {
  return (value - min) * 100 / (max - min);
};

export const getClosest = (value, pointValue) => {
  let newValue;
  if (Math.abs(value[0] - pointValue) <= Math.abs(value[1] - pointValue)) {
    newValue = [pointValue, value[1]];
  } else {
    newValue = [value[0], pointValue];
  }
  return newValue;
};

export const checkValueInRange = (newValue, max, min) => {
  if (newValue > max) {
    newValue = max;
  } else if (newValue < min) {
    newValue = min;
  }
  return newValue;
};
