import { ICascaderItem } from '../types';

/**
 * 通用的 defaultProps
 */
export const commonProps = {
  value: [],
  options: [],
  changeOnSelect: false,
  placeholder: '',
  className: '',
  popupClassName: 'zent-cascader__popup',
  displayRender: (selectedOptions: ICascaderItem[]) =>
    selectedOptions.map(it => it.label).join(' / '),
  disabled: false,
  clearable: false,
};
