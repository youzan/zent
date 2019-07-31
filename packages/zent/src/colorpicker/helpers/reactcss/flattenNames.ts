import isPlainObject from 'lodash-es/isPlainObject';
import forOwn from 'lodash-es/forOwn';
import isString from 'lodash-es/isString';

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
    } else if (isString(thing)) {
      names.push(thing);
    }
  });

  return names;
};

export default flattenNames;
