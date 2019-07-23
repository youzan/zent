import Popover from '../../popover';

export function noop(..._: any[]): void {}

export const CURRENT = new Date();
export const CURRENT_DAY = new Date(
  CURRENT.getFullYear(),
  CURRENT.getMonth(),
  CURRENT.getDate()
);
export const CURRENT_YEAR = CURRENT.getFullYear();
export const CURRENT_MONTH = CURRENT.getMonth();
export const CURRENT_DATE = CURRENT.getDate();
export const ONEDAY = 24 * 60 * 60 * 1000;

export const TIME_BEGIN = '00:00:00';
export const TIME_END = '23:59:59';
export const TIME_FORMAT = 'HH:mm:ss';

export const timeFnMap = {
  hour: 'setHours',
  minute: 'setMinutes',
  second: 'setSeconds',
};

export const popPositionMap = {
  left: Popover.Position.AutoBottomLeft,
  right: Popover.Position.AutoBottomRight,
};

export const commonProps = {
  prefix: 'zent',
  confirmText: '',
  format: 'YYYY-MM-DD',
  popPosition: 'left',
  openPanel: false,
  onChange: noop,
  isFooterVisble: false,
  canClear: true,
  autoComplete: 'off',
};
