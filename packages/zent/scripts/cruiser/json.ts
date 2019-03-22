export function log(arg) {
  console.log(stringify(arg));
}

export function stringify(arg) {
  return JSON.stringify(
    arg,
    (key, value) => {
      if (Object.prototype.toString.call(value) === '[object Set]') {
        return [...value];
      }

      return value;
    },
    2
  );
}
