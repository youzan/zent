import isObject from '../../../utils/isObject';

const flattenNames = (things = []) => {
  let names = [];

  things.forEach(thing => {
    if (Array.isArray(thing)) {
      names = names.concat(flattenNames(thing));
    } else if (isObject(thing)) {
      Object.keys(thing).forEach(key => {
        const value = thing[key];
        value === true && names.push(key);
        names.push(`${key}-${value}`);
      });
    } else if (typeof thing === 'string') {
      names.push(thing);
    }
  });

  return names;
};

export default flattenNames;
