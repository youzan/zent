import isString from 'lodash-es/isString';
import isNumber from 'lodash-es/isNumber';

export default function getWidth(width: unknown) {
  if (isString(width) || isNumber(width)) {
    return { width };
  }

  return {};
}
