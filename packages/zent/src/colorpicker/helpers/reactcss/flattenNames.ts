import isPlainObject from 'lodash-es/isPlainObject';
import forOwn from 'lodash-es/forOwn';

const flattenNames = (things = []) => {
  let names = [];

  things.forEach(thing => {
    if (Array.isArray(thing)) {
      names = names.concat(flattenNames(thing));
    } else if (isPlainObject(thing)) {
      forOwn(thing, (value, key) => {
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
