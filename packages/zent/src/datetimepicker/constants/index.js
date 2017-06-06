export { default as noop } from 'lodash/noop';

export const TIME_FORMAT = 'HH:mm:ss';

export const timeFnMap = {
  hour: 'setHours',
  minute: 'setMinutes',
  second: 'setSeconds'
};
