import fecha from 'fecha';

import { zhCN } from '../../i18n/time-locale';

/**
 * 解析日期，字符串转化为日期
 * @memberof module:date
 * @param date 需要解析的 date，默认应该传入字符串，但对下面两个情况也做了兼容:
 * - 如果传入Date的实例则直接返回这个实例;
 * - 如果传入时间戳数字，则返回 new Date(date) 函数调用后的值;
 * @param mask 解析的格式
 * @param locale i18n 的设置，默认为 zhCN
 * @see {@link https://github.com/taylorhakes/fecha#parsing|parse文档}
 * @returns {date} 转化后的日期
 * @example
 * const parseDate = require('zan-utils/date/parseDate');
 * parseDate('February 3rd, 2014', 'MMMM Do, YYYY'); // new Date(2014, 1, 3)
 * parseDate('10-12-10 14:11:12', 'YY-MM-DD HH:mm:ss'); // new Date(2010, 11, 10, 14, 11, 12)
 * parseDate('5/3/98', 'shortDate'); // new Date(1998, 4, 3)
 * parseDate('November 4, 2005', 'longDate'); // new Date(2005, 10, 4)
 */
export default function parseDate(
  date: string | Date,
  mask = 'default',
  locale = zhCN
): Date {
  if (date instanceof Date) {
    return date;
  }

  if (typeof date === 'number') {
    return new Date(date);
  }

  mask = mask || 'default';

  const ret = fecha.parse(date, mask, locale);

  if (!ret) {
    return null;
  }

  return ret;
}
