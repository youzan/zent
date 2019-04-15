import fecha from 'fecha';

import { zhCN } from '../../i18n/time-locale';
import { getValidDate } from './helpers';

/**
 * 格式化一个 date 对象
 * @memberof module:date
 * @param date Date 的实例
 * @param mask 解析的格式，默认为 'default'
 * @param locale i18n 的设置，默认为 zhCN
 * @returns date 对象
 * @example
 * const formatDate = require('zan-utils/date/formatDate');
 * formatDate('2017-06-06T09:37:16.437Z');
 * // '周二 6月 06 2017 17:37:16'
 * formatDate('2017-06-06T09:37:16.437Z', 'YYYY-MM-DD');
 * // '2017-06-06'
 * formatDate(new Date(), 'YYYY-MM-DD');
 * // '2017-06-06'
 * formatDate(1496800160058, 'YYYY-MM-DD');
 * // '2017-06-07'
 */
export default function formatDate(
  date: string | Date | number,
  mask = 'default',
  locale = zhCN
): string {
  date = getValidDate(date);
  /**
   * TODO: remove as any after fecha fixes its d.ts
   */
  return fecha.format(date, mask, locale);
}
