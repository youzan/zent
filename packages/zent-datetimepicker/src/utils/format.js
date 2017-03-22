/**
 * @author xuhong <chenxuhong@youzan.com>
 */

import { parse, format } from 'fecha';

/**
 * 判断一个字符串是否是 iso 标准日期
 * @param {string} date 日期字符串
 */
export function isValidDate(date) {
  return isNaN(new Date(date));
}

const i18n = {
  zh: {
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
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
  if (date instanceof Date) { return date }
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

// const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
// const timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
// const timezoneClip = /[^-+\dA-Z]/g;
// const pad = (val, len) => {
//   val = String(val);
//   len = len || 2;
//   while (val.length < len) val = `0${val}`;
//   return val;
// };
// const dateI18n = {
//   en: {
//     dayNames: [
//       'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
//       'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
//     ],
//     monthNames: [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//       'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
//     ]
//   },

//   zh: {
//     dayNames: [
//       '周日', '周一', '周二', '周三', '周四', '周五', '周六',
//       '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
//     ],
//     monthNames: [
//       '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',
//       '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
//     ]
//   }
// };

// const dateMasks = {
//   default: 'ddd mmm dd yyyy HH:MM:ss',
//   shortDate: 'm/d/yy',
//   mediumDate: 'mmm d, yyyy',
//   longDate: 'mmmm d, yyyy',
//   fullDate: 'dddd, mmmm d, yyyy',
//   shortTime: 'h:MM TT',
//   mediumTime: 'h:MM:ss TT',
//   longTime: 'h:MM:ss TT Z',
//   isoDate: 'yyyy-mm-dd',
//   isoTime: 'HH:MM:ss',
//   isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
//   isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
// };

// const getFlags = (date, utc, locale) => {
//   let _ = utc ? 'getUTC' : 'get';
//   let d = date[`${_}Date`]();
//   let D = date[`${_}Day`]();
//   let m = date[`${_}Month`]();
//   let y = date[`${_}FullYear`]();
//   let H = date[`${_}Hours`]();
//   let M = date[`${_}Minutes`]();
//   let s = date[`${_}Seconds`]();
//   let L = date[`${_}Milliseconds`]();
//   let o = utc ? 0 : date.getTimezoneOffset();
//   let flags = {
//     d,
//     dd: pad(d),
//     ddd: dateI18n[locale].dayNames[D],
//     dddd: dateI18n[locale].dayNames[D + 7],
//     m: m + 1,
//     mm: pad(m + 1),
//     mmm: dateI18n[locale].monthNames[m],
//     mmmm: dateI18n[locale].monthNames[m + 12],
//     yy: String(y).slice(2),
//     yyyy: y,
//     h: H % 12 || 12,
//     hh: pad(H % 12 || 12),
//     H,
//     HH: pad(H),
//     M,
//     MM: pad(M),
//     s,
//     ss: pad(s),
//     l: pad(L, 3),
//     L: pad(L > 99 ? Math.round(L / 10) : L),
//     t: H < 12 ? 'a' : 'p',
//     tt: H < 12 ? 'am' : 'pm',
//     T: H < 12 ? 'A' : 'P',
//     TT: H < 12 ? 'AM' : 'PM',
//     Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
//     o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
//     S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
//   };
//   return flags;
// };
// export default {
//   /**
//    * 时间格式化
//    * @param  {Date} date 待格式化的时间
//    * @param  {string} mask 格式化字符串
//    * @param  {Object} options 高级选项，可以指定locale，utc
//    * @return {string} 格式化后的字符串
//    *
//    * 支持的格式化选项包括:
//    * 年：yy(97), yyyy(1997)
//    * 月：m(1), mm(01), mmm(1月), mmmm(一月)
//    * 日：d(5), dd(05), ddd(周五)，dddd(星期五)
//    * 小时：h(2), hh(02), H(14), HH(14)，小写是12小时制，大写是24小时制
//    * 分：M(3), MM(03),
//    * 秒：s(8), ss(08)
//    * 毫秒：l(056), L(56), l三位，L两位
//    *
//    * 其他：
//    * t, tt, T, TT: a/p, am/pm, A/P, AM/PM
//    * Z: 时区, UTC, CST等
//    * o: 时区offset: +0800
//    * S: 英语中的序数：st, nd, rd或th，一般和d一起使用
//    */
//   formatDate(date, mask, options) {
//     options = options || {};
//     let utc = options.utc || false;
//     let locale = options.locale || 'zh';

//     // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
//     // eslint-disable-next-line
//     if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
//       mask = date;
//       date = undefined;
//     }

//     mask = dateMasks[mask] || mask || dateMasks.default;

//     // Passing date through Date applies Date.parse, if necessary
//     date = date ? new Date(date) : new Date();
//     // Boolean(NaN) return false, so the check of isNaN(date) is useless.
//     // new Date(NaN) will throw a SyntaxError in Browser
//     // if (isNaN(date)) throw new SyntaxError('invalid date');

//     // Allow setting the utc argument via the mask
//     if (mask.slice(0, 4) === 'UTC:') {
//       mask = mask.slice(4);
//       utc = true;
//     }
//     const flags = getFlags(date, utc, locale);
//     return mask.replace(token, ($0) => {
//       return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
//     });
//   },

//   parseDate(date, mask) {
//     mask = dateMasks[mask] || mask || dateMasks.default;

//     if (typeof date === 'number') return new Date(date);
//     if (date instanceof Date) return date;
//     let arr = [];
//     mask.replace(token, $0 => {
//       arr.push($0);
//     });
//     let regArr = arr.map(item => {
//       return `(\\d{${item.length}})`;
//     });
//     let regStr = regArr.join('[^\\d]?');
//     let dateArr = String(date).match(new RegExp(regStr));
//     if (!dateArr || dateArr.length !== arr.length + 1) {
//       return;
//     }
//     dateArr = dateArr.splice(1);
//     const tmp = new Date(...dateArr);
//     tmp.setMonth(tmp.getMonth() - 1);
//     return tmp;
//   }
// };
