import isEqual from 'lodash/isEqual';

export default function isEqualPlacement(a, b) {
  return (
    a && b && a.name === b.name && isEqual(a.getCSSStyle(), b.getCSSStyle())
  );
}
