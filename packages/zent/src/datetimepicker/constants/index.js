import PropTypes from 'prop-types';
import Popover from 'popover';
import noop from 'lodash/noop';

export { default as noop } from 'lodash/noop';

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
  second: 'setSeconds'
};

export const popPositionMap = {
  left: Popover.Position.AutoBottomLeft,
  right: Popover.Position.AutoBottomRight
};

export const commonProps = {
  prefix: 'zent',
  confirmText: '',
  format: 'YYYY-MM-DD',
  popPosition: 'left',
  openPanel: false,
  onChange: noop,
  isFooterVisble: false,
  canClear: true
};

export const commonPropTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  confirmText: PropTypes.string,
  format: PropTypes.string,
  defaultTime: PropTypes.string,
  // onChange 返回值类型, date | number | string， 默认 string
  valueType: PropTypes.oneOf(['date', 'number', 'string']),
  popPosition: PropTypes.string,
  // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  disabledDate: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  canClear: PropTypes.bool
};
