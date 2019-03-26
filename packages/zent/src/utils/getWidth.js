import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export default function getWidth(width) {
  if (isString(width) || isNumber(width)) {
    return { width };
  }

  return {};
}
