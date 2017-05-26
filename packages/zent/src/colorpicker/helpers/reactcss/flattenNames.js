import map from 'lodash/map';
import isPlainObject from 'lodash/isPlainObject';
import forOwn from 'lodash/forOwn';
import isString from 'lodash/isString';

const flattenNames = (things = []) => {
  const names = [];

  map(things, thing => {
    if (Array.isArray(thing)) {
      flattenNames(thing).map(name => names.push(name));
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
