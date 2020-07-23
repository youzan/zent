export const pick = (obj: Record<string, any>, pickKeys: string[]) => {
  return Object.keys(obj).reduce((val, item) => {
    if (pickKeys.includes(item)) {
      return {
        ...val,
        [item]: obj[item],
      };
    }
    return val;
  }, {});
};
