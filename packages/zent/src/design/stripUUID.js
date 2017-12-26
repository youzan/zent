import has from 'lodash/has';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';

const UUID_KEY_PATTERN = /__.+uuid__/i;
const OLD_KEY = 'zent-design-uuid';

export default function stripUUID(value) {
  if (isPlainObject(value)) {
    // eslint-disable-next-line
    for (const key in value) {
      if (has(value, key)) {
        if (OLD_KEY === key || UUID_KEY_PATTERN.test(key)) {
          delete value[key];
        } else {
          const oldValue = value[key];
          const newValue = stripUUID(oldValue);
          if (newValue !== oldValue) {
            value[key] = newValue;
          }
        }
      }
    }
  } else if (isArray(value)) {
    value.forEach(v => stripUUID(v));
  }

  return value;
}
