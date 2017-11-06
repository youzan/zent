/**
 * @author xuhong <chenxuhong@youzan.com>
 */

export function dayStart(date) {
  const now = date || new Date();
  return setTime(now);
}

export function dayEnd(date) {
  const now = date || new Date();
  return setTime(now, '23:59:59');
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
