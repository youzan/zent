/**
 * @author xuhong <chenxuhong@youzan.com>
 */

import { parse, format } from 'fecha';

const i18n = {
  zh: {
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    monthNamesShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    monthNames: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10]
      );
    }
  }
};

/**
 * 解析日期
 * @param {String} date 需要解析的 date，默认应该传入字符串，但对下面两个情况也做了兼容:
 * - 如果传入Date的实例则直接返回这个实例;
 * - 如果传入时间戳数字，则返回 Date.parse 函数调用后的值;
 * @param {String} mask 解析的格式
 */
export const parseDate = (date, mask) => {
  mask = mask || 'default';
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'number') return Date.parse(date);
  return parse(date, mask);
};

/**
 * 格式化一个 date 对象
 * @param {*} date Date 的实例
 * @param {*} mask 解析的格式，默认为 'default'
 * @param {*} locale i18n 的设置，默认为 'zh'
 */

export const formatDate = (date, mask = 'default', locale = 'zh') => {
  return format(date, mask, i18n[locale]);
};

export function maybeParseDate(value, mask) {
  if (typeof value === 'number') return new Date(value);
  if (value instanceof Date) return value;

  return parseDate(value, mask);
}

export function dayStart(date) {
  const now = date || new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function setTime(date, time = '00:00:00') {
  const timeArr = time.split(':');
  const dateTimeArr = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    ...timeArr
  ];
  return new Date(...dateTimeArr);
}
