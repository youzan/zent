import PropTypes from 'prop-types';
import Popover from 'popover';
import noop from 'lodash/noop';

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

export const commonProps = {
  prefix: 'zent',
  confirmText: '确定',
  format: 'YYYY-MM-DD',
  popPosition: 'left',
  openPanel: false,
  disabledDate: noop,
  onChange: noop,
  isFooterVisble: false
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
  onClose: PropTypes.func
};
