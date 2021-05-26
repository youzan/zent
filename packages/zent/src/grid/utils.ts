export function flattenBy(arr, key) {
  const flat = [];

  const recurse = arr => {
    arr.forEach(d => {
      if (!d[key]) {
        flat.push(d);
      } else {
        recurse(d[key]);
      }
    });
  };

  recurse(arr);

  return flat;
}
