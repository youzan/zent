let locale = null;

export function setLocale(map) {
  return (locale = map);
}

export function getLocale() {
  return locale;
}

export const enUS = {
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  monthNames: [
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
  ],
  amPm: ['am', 'pm'],
  DoFn: function DoFn(D) {
    return (
      D +
      ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : ((D - D % 10 !== 10) * D) % 10]
    );
  },
};

export const zhCN = {
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNames: [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ],
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
    '12月',
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
    '十二月',
  ],
  amPm: ['上午', '下午'],
  DoFn: function DoFn(D) {
    return (
      D +
      ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : ((D - D % 10 !== 10) * D) % 10]
    );
  },
};
