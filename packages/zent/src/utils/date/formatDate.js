import { format } from 'fecha';

import i18n from './i18n';
import { getValidDate } from './helpers';

/**
 * 格式化一个 date 对象
 * @memberof module:date
 * @param {string|Date|number} date Date 的实例
 * @param {string} mask 解析的格式，默认为 'default'
 * @param {string} locale i18n 的设置，默认为 'zh'
 * @returns {string} date 对象
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
export default function formatDate(date, mask = 'default', locale = 'zh') {
  date = getValidDate(date);
  return format(date, mask, typeof locale === 'string' ? i18n[locale] : locale);
}
