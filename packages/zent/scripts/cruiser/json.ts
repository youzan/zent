export function log(arg: any) {
  console.log(stringify(arg));
}

export function stringify(arg: any) {
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
