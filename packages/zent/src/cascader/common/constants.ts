import { ICascaderItem } from '../types';
import memoize from '../../utils/memorize-one';

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
  renderValue: memoize((selectedOptions: ICascaderItem[]): string =>
    selectedOptions.map(it => it.label).join(' / ')
  ),
  clearable: false,
};
