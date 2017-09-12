/**
 * @author xuhong <chenxuhong@youzan.com>
 */

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
