import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import forOwn from 'lodash/forOwn';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

const flattenNames = (things = []) => {
  let names = [];

  forEach(things, thing => {
    if (isArray(thing)) {
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
