import get from 'lodash-es/get';

export interface IValidation {
  required?: boolean;
  isExisty?: boolean;
  matchRegex?: RegExp;
  isUndefined?: boolean;
  isEmptyString?: boolean;
  isEmail?: boolean;
  isUrl?: boolean;
  isTrue?: boolean;
  isFalse?: boolean;
  isNumeric?: boolean;
  isInt?: boolean;
  isFloat?: boolean;
  isLength?: boolean;
  equals?: any;
  equalsField?: string;
  maxLength?: number;
  minLength?: number;
}

function isExisty(value) {
  return value !== null && value !== undefined;
}

function isEmpty(value) {
  return value === '';
}

const validations = {
  required(values, value) {
    return isExisty(value) && !isEmpty(value);
  },
  isExisty(values, value) {
    return isExisty(value);
  },
  matchRegex(values, value, regexp) {
    return !isExisty(value) || isEmpty(value) || regexp.test(value);
  },
  isUndefined(values, value) {
    return value === undefined;
  },
  isEmptyString(values, value) {
    return isEmpty(value);
  },
  isEmail(values, value) {
    return validations.matchRegex(
      values,
      value,

      // eslint-disable-next-line
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    );
  },
  isUrl(values, value) {
    return validations.matchRegex(
      values,
      value,
      /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,=]|:|@)|\/|\?)*)?$/i
    );
  },
  isTrue(values, value) {
    return value === true;
  },
  isFalse(values, value) {
    return value === false;
  },
  isNumeric(values, value) {
    if (typeof value === 'number') {
      return true;
    }
    return validations.matchRegex(values, value, /^[-+]?(?:\d*[.])?\d+$/);
  },
  isInt(values, value) {
    return validations.matchRegex(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
  },
  isFloat(values, value) {
    return validations.matchRegex(
      values,
      value,
      /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/
    );
  },
  isLength(values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length === length;
  },
  equals(values, value, eql) {
    return !isExisty(value) || isEmpty(value) || value === eql;
  },
  equalsField(values, value, field) {
    return value === get(values, field);
  },
  maxLength(values, value, length) {
    return !isExisty(value) || value.length <= length;
  },
  minLength(values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length >= length;
  },
};

export default validations;
