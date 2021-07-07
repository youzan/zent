/**
The MIT License (MIT)

Copyright (c) 2015 Taylor Hakes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

/**
 * This is fork of https://github.com/taylorhakes/fecha
 *
 * Why?
 * The TypeScript definition in the official repo is broken again and again
 * between releases, and I'm tired of it. So here's a TypeScript version.
 */

/**
 * Parse or format dates
 */
export type FechaDays = [
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type FechaMonths = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export interface IFechaI18nSettings {
  amPm: [string, string];
  dayNames: FechaDays;
  dayNamesShort: FechaDays;
  monthNames: FechaMonths;
  monthNamesShort: FechaMonths;
  DoFn(D: number): string;
}

export interface IFechaMasks {
  default: string;
  fullDate: string;
  longDate: string;
  longTime: string;
  mediumDate: string;
  mediumTime: string;
  shortDate: string;
  shortTime: string;
  [myMask: string]: string;
}

interface IFechaDateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  isPm: boolean;
  timezoneOffset: number;
}

type FechaParseFlagHandler = [
  string /* pattern */,
  (d: IFechaDateInfo, v: string, i18n: IFechaI18nSettings) => void
];

type FechaFormatFlagHandler = (
  dateObj: Date,
  i18n: IFechaI18nSettings
) => string;

type FechaFormatToken =
  | 'D'
  | 'DD'
  | 'Do'
  | 'd'
  | 'dd'
  | 'ddd'
  | 'dddd'
  | 'M'
  | 'MM'
  | 'MMM'
  | 'MMMM'
  | 'YY'
  | 'YYYY'
  | 'h'
  | 'hh'
  | 'H'
  | 'HH'
  | 'm'
  | 'mm'
  | 's'
  | 'ss'
  | 'S'
  | 'SS'
  | 'SSS'
  | 'a'
  | 'A'
  | 'ZZ';

const token =
  /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const twoDigits = '\\d\\d?';
const threeDigits = '\\d{3}';
const fourDigits = '\\d{4}';
const word = '[^\\s]+';
const literal = /\[([^]*?)\]/gm;
const noop = () => {};

const dayNames: FechaDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthNames: FechaMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthNamesShort = shorten(monthNames, 3) as FechaMonths;
const dayNamesShort = shorten(dayNames, 3) as FechaDays;

export const i18n: IFechaI18nSettings = {
  dayNamesShort,
  dayNames,
  monthNamesShort,
  monthNames,
  amPm: ['am', 'pm'],
  DoFn: function DoFn(D) {
    return (
      D +
      ['th', 'st', 'nd', 'rd'][
        D % 10 > 3 ? 0 : ((D - (D % 10) !== 10 ? 1 : 0) * D) % 10
      ]
    );
  },
};

// Some common format strings
export const masks: IFechaMasks = {
  default: 'ddd MMM DD YYYY HH:mm:ss',
  shortDate: 'M/D/YY',
  mediumDate: 'MMM D, YYYY',
  longDate: 'MMMM D, YYYY',
  fullDate: 'dddd, MMMM D, YYYY',
  shortTime: 'HH:mm',
  mediumTime: 'HH:mm:ss',
  longTime: 'HH:mm:ss.SSS',
};

const formatFlags: Record<FechaFormatToken, FechaFormatFlagHandler> = {
  D(dateObj) {
    return String(dateObj.getDate());
  },
  DD(dateObj) {
    return pad(dateObj.getDate());
  },
  Do(dateObj, i18n) {
    return i18n.DoFn(dateObj.getDate());
  },
  d(dateObj) {
    return String(dateObj.getDay());
  },
  dd(dateObj) {
    return pad(dateObj.getDay());
  },
  ddd(dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd(dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  M(dateObj) {
    return String(dateObj.getMonth() + 1);
  },
  MM(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM(dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM(dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  YY(dateObj) {
    return pad(String(dateObj.getFullYear()), 4).substr(2);
  },
  YYYY(dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  h(dateObj) {
    return String(dateObj.getHours() % 12 || 12);
  },
  hh(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H(dateObj) {
    return String(dateObj.getHours());
  },
  HH(dateObj) {
    return pad(dateObj.getHours());
  },
  m(dateObj) {
    return String(dateObj.getMinutes());
  },
  mm(dateObj) {
    return pad(dateObj.getMinutes());
  },
  s(dateObj) {
    return String(dateObj.getSeconds());
  },
  ss(dateObj) {
    return pad(dateObj.getSeconds());
  },
  S(dateObj) {
    return String(Math.round(dateObj.getMilliseconds() / 100));
  },
  SS(dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS(dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  a(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A(dateObj, i18n) {
    return dateObj.getHours() < 12
      ? i18n.amPm[0].toUpperCase()
      : i18n.amPm[1].toUpperCase();
  },
  ZZ(dateObj) {
    const o = dateObj.getTimezoneOffset();
    return (
      (o > 0 ? '-' : '+') +
      pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4)
    );
  },
};

const parseFlags: Record<FechaFormatToken, FechaParseFlagHandler> = {
  D: [twoDigits, setDay],
  DD: [twoDigits, setDay],
  Do: [twoDigits + word, setDay],
  M: [twoDigits, setMonth],
  MM: [twoDigits, setMonth],
  YY: [
    twoDigits,
    (d, v: string) => {
      const y = parseInt(v, 10);
      const da = new Date();
      const cent = parseInt(String(da.getFullYear()).substr(0, 2), 10);
      const year = String(y > 68 ? cent - 1 : cent) + v;
      d.year = parseInt(year, 10);
    },
  ],
  h: [twoDigits, setHour],
  hh: [twoDigits, setHour],
  H: [twoDigits, setHour],
  HH: [twoDigits, setHour],
  m: [twoDigits, setMinute],
  mm: [twoDigits, setMinute],
  s: [twoDigits, setSecond],
  ss: [twoDigits, setSecond],
  YYYY: [
    fourDigits,
    (d, v) => {
      d.year = parseInt(v, 10);
    },
  ],
  S: [
    '\\d',
    (d, v) => {
      d.millisecond = parseInt(v, 10) * 100;
    },
  ],
  SS: [
    '\\d{2}',
    (d, v) => {
      d.millisecond = parseInt(v, 10) * 10;
    },
  ],
  SSS: [
    threeDigits,
    (d, v) => {
      d.millisecond = parseInt(v, 10);
    },
  ],
  d: [twoDigits, noop],
  dd: [twoDigits, noop],
  ddd: [word, noop],
  dddd: [word, noop],
  MMM: [word, monthUpdate('monthNamesShort')],
  MMMM: [word, monthUpdate('monthNames')],
  a: [word, setPm],
  A: [word, setPm],
  ZZ: [
    '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z',
    (d, v) => {
      const parts = (v + '').match(/([+-]|\d\d)/gi);
      let minutes: number;

      if (parts) {
        minutes = parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    },
  ],
};

/***
 * Format a date
 * @method format
 * @param dateObj
 * @param mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 */
export function format(
  dateObj: Date | number,
  mask: string,
  i18nSettings = i18n
) {
  if (typeof dateObj === 'number') {
    dateObj = new Date(dateObj);
  }

  if (
    Object.prototype.toString.call(dateObj) !== '[object Date]' ||
    isNaN(dateObj.getTime())
  ) {
    throw new Error('Invalid Date in fecha.format');
  }

  mask = masks[mask] || mask || masks['default'];

  const literals = [];

  // Make literals inactive by replacing them with ??
  mask = mask.replace(literal, ($0, $1) => {
    literals.push($1);
    return '@@@';
  });
  // Apply formatting rules
  mask = mask.replace(token, $0 => {
    return $0 in formatFlags
      ? formatFlags[$0](dateObj, i18nSettings)
      : $0.slice(1, $0.length - 1);
  });
  // Inline literal values back into the formatted value
  return mask.replace(/@@@/g, () => {
    return literals.shift();
  });
}

/**
 * Parse a date string into an object, changes - into /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 */
export function parse(dateStr: string, format: string, i18nSettings = i18n) {
  if (typeof format !== 'string') {
    throw new Error('Invalid format in fecha.parse');
  }

  format = masks[format] || format;

  // Avoid regular expression denial of service, fail early for really long strings
  // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
  if (dateStr.length > 1000) {
    return null;
  }

  const dateInfo = {} as IFechaDateInfo;
  const parseInfo = [];
  const literals = [];
  format = format.replace(literal, ($0, $1) => {
    literals.push($1);
    return '@@@';
  });
  let newFormat = regexEscape(format).replace(token, $0 => {
    if (parseFlags[$0]) {
      const info = parseFlags[$0];
      parseInfo.push(info[1]);
      return '(' + info[0] + ')';
    }

    return $0;
  });
  newFormat = newFormat.replace(/@@@/g, () => {
    return literals.shift();
  });
  const matches = new RegExp(newFormat, 'i').exec(dateStr);
  if (!matches) {
    return null;
  }

  for (let i = 1; i < matches.length; i++) {
    parseInfo[i - 1](dateInfo, matches[i], i18nSettings);
  }

  const today = new Date();
  if (
    dateInfo.isPm === true &&
    dateInfo.hour != null &&
    +dateInfo.hour !== 12
  ) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  let date: Date;
  if (dateInfo.timezoneOffset != null) {
    dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
    date = new Date(
      Date.UTC(
        dateInfo.year || today.getFullYear(),
        dateInfo.month || 0,
        dateInfo.day || 1,
        dateInfo.hour || 0,
        dateInfo.minute || 0,
        dateInfo.second || 0,
        dateInfo.millisecond || 0
      )
    );
  } else {
    date = new Date(
      dateInfo.year || today.getFullYear(),
      dateInfo.month || 0,
      dateInfo.day || 1,
      dateInfo.hour || 0,
      dateInfo.minute || 0,
      dateInfo.second || 0,
      dateInfo.millisecond || 0
    );
  }
  return date;
}

function regexEscape(str: string): string {
  return str.replace(/[|\\{()[^$+*?.-]/g, '\\$&');
}

function shorten(arr: string[], sLen: number): string[] {
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}

function monthUpdate(arrName: string) {
  return (d: IFechaDateInfo, v: string, i18n: IFechaI18nSettings) => {
    const index = i18n[arrName].indexOf(
      v.charAt(0).toUpperCase() + v.substr(1).toLowerCase()
    );
    if (~index) {
      d.month = index;
    }
  };
}

function setMonth(d: IFechaDateInfo, v: string) {
  const m = parseInt(v, 10);
  d.month = m - 1;
}

function setDay(d: IFechaDateInfo, v: string) {
  d.day = parseInt(v, 10);
}

function setHour(d: IFechaDateInfo, v: string) {
  d.hour = parseInt(v, 10);
}

function setMinute(d: IFechaDateInfo, v: string) {
  d.minute = parseInt(v, 10);
}

function setSecond(d: IFechaDateInfo, v: string) {
  d.second = parseInt(v, 10);
}

function setPm(d: IFechaDateInfo, v: string, i18n: IFechaI18nSettings) {
  const val = v.toLowerCase();
  if (val === i18n.amPm[0]) {
    d.isPm = false;
  } else if (val === i18n.amPm[1]) {
    d.isPm = true;
  }
}

function pad(val: string | number, len = 2): string {
  val = String(val);
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}
