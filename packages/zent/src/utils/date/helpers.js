import isNaN from 'lodash/isNaN';

function isValidDate(value) {
  return !isNaN(+new Date(value));
}

/**
 * 将一个字符串、数字转化为 Date 的实例
 * @param {string|Date|number} date 需要转换的值
 * @return {date} Date 的实例
 * @example
 * const getValidDate = require('zan-utils/date/getValidDate');
 * let date = getValidDate(new Date());
 * date instanceof Date;// true
 * date = getValidDate(1496800160058);
 * date instanceof Date;// true
 */
export function getValidDate(date) {
  if (typeof date === 'undefined') {
    throw new Error('expects a date');
  }

  date = date || new Date();
  if (date instanceof Date) {
    return date;
  }

  if (typeof date === 'number') {
    if (isValidDate(date)) date = new Date(date);
  }

  if (typeof date === 'string') {
    if (!isValidDate(date)) {
      date = date.replace(/-/g, '/');
    }

    if (isValidDate(date)) {
      date = new Date(date);
    }
  }

  return date;
}
