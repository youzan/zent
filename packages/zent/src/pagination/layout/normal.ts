import { getPageRange } from './getPageRange';
import { PaginationLayout } from './type';
import { IPaginationLayoutOptions } from '../impl/BasePagination';

const MAX_PAGES_TO_EXPAND = 5;

export default function normalLayout(
  options: IPaginationLayoutOptions
): PaginationLayout[] {
  const { pageSize, total, current } = options;
  const totalPages = Math.ceil(total / pageSize);

  // 展开所有页码
  if (totalPages <= MAX_PAGES_TO_EXPAND) {
    const buttonCount = 2 + totalPages;
    const layout = new Array(buttonCount);

    layout[0] = {
      type: 'left-arrow',
      disabled: current <= 1 || total <= 0,
    };
    layout[buttonCount - 1] = {
      type: 'right-arrow',
      disabled: current >= totalPages || total <= 0,
    };

    for (let i = 1; i <= totalPages; i++) {
      layout[i] = {
        type: 'number',
        page: i,
        selected: current === i,
      };
    }

    return layout;
  }

  // 页码需要折叠起来，第一页和最后一页一直显示
  const layout: PaginationLayout[] = [
    {
      type: 'left-arrow',
      disabled: current <= 1 || total <= 0,
    },
    {
      type: 'number',
      page: 1,
      selected: current === 1 || total <= 0,
    },
  ];

  // 1 2 3 4 5 6 ... n
  if (current > 4) {
    layout.push({
      type: 'double-left-arrow',
    });
  }

  const { min, max } = getPageRange({
    ...options,
    startDelta: 1,
    endDelta: -1,
  });
  for (let i = min; i <= max; i++) {
    layout.push({
      type: 'number',
      page: i,
      selected: current === i,
    });
  }

  if (current < totalPages - 3) {
    layout.push({
      type: 'double-right-arrow',
    });
  }

  layout.push(
    {
      type: 'number',
      page: totalPages,
      selected: current === totalPages,
    },
    {
      type: 'right-arrow',
      disabled: current >= totalPages || total <= 0,
    }
  );

  return layout;
}
