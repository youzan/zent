export function noop() { }

export const CELL_PROPS = {
  onHover: noop
};

export const TIME_PROPS = {
  className: '',
  prefix: 'zent',
  value: '',
  format: 'HH:MM:ss',
  placeholder: '请选择时间',
  disabledTime: noop,
  onChange: noop
};

export const DATE_PROPS = {
  className: '',
  prefix: 'zent',
  format: 'yyyy-mm-dd',
  placeholder: '请选择日期',
  showTime: false,
  disabledDate: '',
  min: '',
  max: '',
  onChange: noop
};

export const MONTH_PROPS = {
  className: '',
  prefix: 'zent',
  value: '',
  format: 'yyyy-mm',
  placeholder: '请选择月份',
  disabledDate: noop,
  onChange: noop
};

export const RANGE_PROPS = {
  className: '',
  prefix: 'zent',
  value: '',
  format: 'yyyy-mm-dd',
  placeholder: ['开始日期', '结束日期'],
  showTime: false,
  disabledDate: noop,
  onChange: noop
};
