import { IPaginationLayoutOptions } from '../impl/BasePagination';

interface IPaginationLayoutPageRangeOptions extends IPaginationLayoutOptions {
  startDelta?: number;
  endDelta?: number;
}

export function getPageRange(options: IPaginationLayoutPageRangeOptions) {
  const { pageSize, total, current, startDelta, endDelta } = options;
  const totalPages = Math.ceil(total / pageSize);
  const start = 1 + (startDelta || 0);
  const end = totalPages + (endDelta || 0);
  let min = Math.max(start, current - 2);
  let max = Math.min(current + 2, end);
  const len = max - min + 1;

  // 不足 5 项的，尝试往一边加满 5 项
  if (len < 5) {
    const delta = 5 - len;

    if (min > start) {
      min = Math.max(start, min - delta);
    }

    if (max < end) {
      max = Math.min(max + delta, end);
    }
  }

  return {
    min,
    max,
  };
}
