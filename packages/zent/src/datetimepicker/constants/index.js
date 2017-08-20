import Popover from 'popover';

export { default as noop } from 'lodash/noop';

export const TIME_FORMAT = 'HH:mm:ss';

export const timeFnMap = {
  hour: 'setHours',
  minute: 'setMinutes',
  second: 'setSeconds'
};

export const popPositionMap = {
  left: Popover.Position.AutoBottomLeft,
  right: Popover.Position.AutoBottomRight
};
