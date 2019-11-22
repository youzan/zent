import isString from 'lodash-es/isString';

export default function getWidth(width: unknown) {
  if (isString(width) || typeof width === 'number') {
    return { width };
  }

  return {};
}
