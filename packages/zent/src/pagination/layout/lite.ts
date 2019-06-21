import { getPageRange } from './getPageRange';
import { PaginationLayout } from './type';
import { IPaginationLayoutOptions } from '../impl/BasePagination';

/**
 * Show at most 5 pages
 * @param {object} options
 */
export default function liteLayout(
  options: IPaginationLayoutOptions
): PaginationLayout[] {
  const { current, total } = options;
  const { min, max } = getPageRange(options);

  // 总个数，算上箭头
  const len = max - min + 1 + 2;
  const layout = new Array(len);

  layout[0] = {
    type: 'left-arrow',
    disabled: current <= 1 || total <= 0,
  };

  for (let i = min; i <= max; i++) {
    layout[i - min + 1] = {
      type: 'number',
      page: i,
      selected: current === i,
    };
  }

  layout[len - 1] = {
    type: 'right-arrow',
    disabled: current >= max || total <= 0,
  };

  return layout;
}
