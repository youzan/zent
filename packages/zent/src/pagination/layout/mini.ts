import { PaginationLayout } from "./type";

export default function miniLayout(options): PaginationLayout[] {
  const { current, pageSize, total } = options;
  const totalPages = Math.ceil(total / pageSize);

  return [
    {
      type: 'left-arrow',
      disabled: current === 1,
    },
    {
      type: 'mini-jumper',
      totalPages,
    },
    {
      type: 'right-arrow',
      disabled: current === totalPages,
    },
  ];
}
