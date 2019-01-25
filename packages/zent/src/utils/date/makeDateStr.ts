import { getValidDate } from './helpers';
import formatDate from './formatDate';

/**
 * 获得 YYYY-MM-DD 格式的日期字符串的快捷方法
 * @memberof module:date
 * @param date 需要格式化的字符串，兼容字符串、数字和 Date 实例
 * @param mask 解析的格式，默认为 'YYYY-MM-DD'，方便日常开发
 * @returns 格式化后的日期字符串
 * @example
 * const makeDateStr = require('zan-utils/date/makeDateStr');
 * makeDateStr(new Date());
 * // '2017-06-06'
 */
function makeDateStr(date: string | Date | number, mask = 'YYYY-MM-DD') {
  date = getValidDate(date);
  return formatDate(date, mask);
}
export default makeDateStr;
