import { PaginationLayout } from './type';
import { IPaginationLayoutOptions } from '../impl/BasePagination';

export default function miniLayout(
  options: IPaginationLayoutOptions
): PaginationLayout[] {
  const { current, pageSize, total } = options;
  const totalPages = Math.ceil(total / pageSize);

  return [
    {
      type: 'left-arrow',
      disabled: current <= 1 || total <= 0,
    },
    {
      type: 'mini-jumper',
      totalPages,
    },
    {
      type: 'right-arrow',
      disabled: current >= totalPages || total <= 0,
    },
  ];
}
