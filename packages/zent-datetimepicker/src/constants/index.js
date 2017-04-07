import Popover from 'zent-popover';

export function noop() { }

export const TIME_FORMAT = 'HH:mm:ss';

export const timeFnMap = {
  hour: 'setHours',
  minute: 'setMinutes',
  second: 'setSeconds'
};

export const positionMap = {
  'bottom-left': Popover.Position.BottomLeft,
  'bottom-right': Popover.Position.BottomRight,
};
