/**
 * #####格式化时间
 * **使用方法：`let date = require('zenjs/util/date')`**
 *
 * date.format([time], 'yyyy年mm月dd日 HH:MM:ss') => 2016年11月02日 15:22:06
 *
 * ！！！！不要用下面的！！！！
 *
 * 1、获取格式化后的时间，可选参数[time]，不传则表示格式化当前时间
 * 格式： **2016-07-10**
 *
 * `Date.getCurrentDay([time])`
 *
 * 2、获取格式化后的时间，可选参数[time]，不传则表示格式化当前时间
 *  格式： **2015-07-10 23:20:08**
 *
 * `Date.getFullTime([time])`
 *
 * 3、将格式化后的时间转成对应时间的date对象，必须参数timeStr, 可选传入要设置的时间date对象
 *  传入： **2015-07-10 23:20:08**
 *  输出： **对应时间的date对象**
 *
 * `Date.getDateFromStr(timeStr, [time])`
 *
 */
/* eslint-disable */
export default {
  /**
   * 时间格式化
   * @param  {Date} date 待格式化的时间
   * @param  {string} mask 格式化字符串
   * @param  {Object} options 高级选项，可以指定locale，utc
   * @return {string} 格式化后的字符串
   *
   * 支持的格式化选项包括:
   * 年：yy(97), yyyy(1997)
   * 月：m(1), mm(01), mmm(1月), mmmm(一月)
   * 日：d(5), dd(05), ddd(周五)，dddd(星期五)，小写是日期，大写是星期几
   * 小时：h(2), hh(02), H(14), HH(14)，小写是12小时制，大写是24小时制
   * 分：M(3), MM(03),
   * 秒：s(8), ss(08)
   * 毫秒：l(056), L(56), l三位，L两位
   *
   * 其他：
   * t, tt, T, TT: a/p, am/pm, A/P, AM/PM
   * Z: 时区, UTC, CST等
   * o: 时区offset: +0800
   * S: 英语中的序数：st, nd, rd或th，一般和d一起使用
   */
  format: (function () {
    let dateFormat = (function () {
      let token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
      let timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      let timezoneClip = /[^-+\dA-Z]/g;
      let pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = `0${val}`;
        return val;
      };

      // Regexes and supporting functions are cached through closure
      return function (date, mask, options) {
        let dF = dateFormat;

        options = options || {};
        let utc = options.utc || false;
        let locale = options.locale || 'zh';

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) throw new SyntaxError('invalid date');

        mask = String(dF.masks[mask] || mask || dF.masks['default']);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === 'UTC:') {
          mask = mask.slice(4);
          utc = true;
        }

        let _ = utc ? 'getUTC' : 'get';
        let d = date[_ + 'Date']();
        let D = date[_ + 'Day']();
        let m = date[_ + 'Month']();
        let y = date[_ + 'FullYear']();
        let H = date[_ + 'Hours']();
        let M = date[_ + 'Minutes']();
        let s = date[_ + 'Seconds']();
        let L = date[_ + 'Milliseconds']();
        let o = utc ? 0 : date.getTimezoneOffset();
        let flags = {
          d: d,
          dd: pad(d),
          ddd: dF.i18n[locale].dayNames[D],
          dddd: dF.i18n[locale].dayNames[D + 7],
          m: m + 1,
          mm: pad(m + 1),
          mmm: dF.i18n[locale].monthNames[m],
          mmmm: dF.i18n[locale].monthNames[m + 12],
          yy: String(y).slice(2),
          yyyy: y,
          h: H % 12 || 12,
          hh: pad(H % 12 || 12),
          H: H,
          HH: pad(H),
          M: M,
          MM: pad(M),
          s: s,
          ss: pad(s),
          l: pad(L, 3),
          L: pad(L > 99 ? Math.round(L / 10) : L),
          t: H < 12 ? 'a' : 'p',
          tt: H < 12 ? 'am' : 'pm',
          T: H < 12 ? 'A' : 'P',
          TT: H < 12 ? 'AM' : 'PM',
          Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
        };

        return mask.replace(token, function ($0) {
          return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
      };
    } ());

    // Some common format strings
    dateFormat.masks = {
      'default': 'ddd mmm dd yyyy HH:MM:ss',
      shortDate: 'm/d/yy',
      mediumDate: 'mmm d, yyyy',
      longDate: 'mmmm d, yyyy',
      fullDate: 'dddd, mmmm d, yyyy',
      shortTime: 'h:MM TT',
      mediumTime: 'h:MM:ss TT',
      longTime: 'h:MM:ss TT Z',
      isoDate: 'yyyy-mm-dd',
      isoTime: 'HH:MM:ss',
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
      en: {
        dayNames: [
          'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        monthNames: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
      },

      zh: {
        dayNames: [
          '周日', '周一', '周二', '周三', '周四', '周五', '周六',
          '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
        ],
        monthNames: [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',
          '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
        ]
      }
    };

    return dateFormat;
  } ()),

  getCurrentDay: function (time) {
    time = time || new Date();
    let month = time.getMonth() + 1;
    month = month.toString().length === 1 ? '0' + month : month;
    let day = time.getDate();
    day = day.toString().length === 1 ? '0' + day : day;
    return time.getFullYear() + '-' + month + '-' + day;
  },

  getFullTime: function (time) {
    time = time || new Date();

    function format(str) {
      return str.toString().length === 1 ? '0' + str : str;
    }
    let month = time.getMonth() + 1;
    month = format(month);
    let day = time.getDate();
    day = format(day);
    let hour = time.getHours();
    hour = format(hour);
    let min = time.getMinutes();
    min = format(min);
    let sec = time.getSeconds();
    sec = format(sec);
    return time.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  },

  getDateFromStr: function (timeStr, time) {
    time = time || new Date();

    timeStr.toString().replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, function (match, year, month, day, hour, minute, sec) {
      time.setFullYear(year);
      time.setMonth(parseInt(month, 10) - 1);
      time.setDate(parseInt(day, 10));
      time.setHours(parseInt(hour, 10));
      time.setMinutes(parseInt(minute, 10));
      time.setSeconds(parseInt(sec, 10));

      return match;
    });

    return time;
  }

}
