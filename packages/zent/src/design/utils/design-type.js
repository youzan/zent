import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';

export function getDesignType(editor, defaultType) {
  const { designType } = editor;

  if (isString(designType)) {
    if (isFunction(defaultType)) {
      return defaultType(designType);
    }
    return designType;
  }

  if (isArray(designType) && designType.length > 0) {
    if (isNumber(defaultType)) {
      return designType[defaultType || 0];
    } else if (isFunction(defaultType)) {
      return defaultType(designType);
    }

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

export function serializeDesignType(designType) {
  if (isString(designType)) {
    return designType;
  }
  if (isArray(designType)) {
    return designType.join(' | ');
  }

  throw new TypeError('designType should be a string or an array of strings');
}

export const COMPONENT_GROUP_DESIGN_TYPE = '__zent-design-component-group__';
