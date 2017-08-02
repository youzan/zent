import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

export function getDesignType(editor) {
  const { designType } = editor;

  if (isString(designType)) {
    return designType;
  }
  if (isArray(designType) && designType.length > 0) {
    return designType[0];
  }

  throw new TypeError('designType should be a string or an array of strings');
}

export function isExpectedDesginType(component, expected) {
  const { type } = component;

  if (isString(type)) {
    return expected === type;
  }

  if (isArray(type)) {
    return type.indexOf(expected) !== -1;
  }

  return false;
}
