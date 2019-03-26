import { getValidDate } from './helpers';
import formatDate from './formatDate';

/**
 * 获得 YYYY-MM-DD HH:mm:ss 格式的日期字符串的快捷方法
 * @memberof module:date
 * @param date 需要格式化的字符串，兼容字符串、数字和 Date 实例
 * @param mask 解析的格式，默认为 'YYYY-MM-DD HH:mm:ss'，方便日常开发
 * @returns 格式化后的日期字符串
 * @example
 * const makeDateTimeStr = require('zan-utils/date/makeDateTimeStr');
 * makeDateTimeStr(new Date());
 * // '2017-06-06 17:37:16'
 */
export default function makeDateTimeStr(
  date: string | Date | number,
  mask = 'YYYY-MM-DD HH:mm:ss'
) {
  date = getValidDate(date);
  return formatDate(date, mask);
}
