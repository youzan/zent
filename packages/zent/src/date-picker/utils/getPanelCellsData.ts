import { isAfter, isBefore } from 'date-fns';
import { IDateCellBase, IGenerateDateConfig, DateTuple } from '../types';

interface ICellDateParams {
  selected: Date | null;
  rangeDate?: DateTuple | null;
  hoverRangeDate?: DateTuple | null;
  disabledPanelDate: (date: Date) => boolean;
  defaultPanelDate: Date;
  row: number;
  col: number;
  dateConfig: IGenerateDateConfig;
  texts?: Array<number | string>;
  offset?: number;
  inView?: (val1: Date, val2: Date) => boolean;
}
/**
 * 根据当前组件的selected等值 获得最小单元格的属性集合
 *
 */
export default function getPanelCellsData({
  selected,
  rangeDate,
  hoverRangeDate,
  disabledPanelDate,
  defaultPanelDate,
  row,
  col,
  dateConfig,
  texts,
  offset = 0,
  inView,
}: ICellDateParams) {
  const { isSame, startDate, offsetDate } = dateConfig;

  let index = 0;
  const cells: IDateCellBase[] = [];
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < col; colIndex++) {
      // offset
      const currentDate = startDate(
        offsetDate(defaultPanelDate, index - offset)
      );
      // constants text or fetch text
      const text = texts ? texts[index] : currentDate.getDate();

      /* *************** week-picker & combined-picker start  *************** */
      let isInHoverRange = false;
      let isRangeEndpoint = false;
      let isInRange = false;
      //  hover-range
      if (hoverRangeDate) {
        isInHoverRange =
          isAfter(currentDate, offsetDate(hoverRangeDate[0], -1)) &&
          isBefore(currentDate, hoverRangeDate[1]);
      }
      // selected range
      if (rangeDate) {
        isInRange =
          isAfter(currentDate, rangeDate[0]) &&
          isBefore(currentDate, rangeDate[1]);
        isRangeEndpoint =
          isSame(currentDate, rangeDate[0]) ||
          isSame(currentDate, rangeDate[1]);
      }
      /* *************** week-picker & combined-picker end  *************** */

      // isSelected
      const isSelected =
        !!selected && (isSame(selected, currentDate) || isRangeEndpoint);

      // isCurrent
      const isCurrent = isSame(new Date(), currentDate);

      // isInView
      const isInView = inView ? inView(currentDate, defaultPanelDate) : true;

      // isDisabled
      const isDisabled = disabledPanelDate(currentDate);

      cells[index] = {
        value: currentDate,
        text,
        isCurrent,
        isSelected,
        isInView,
        isDisabled,
        isInHoverRange,
        isInRange,
      };
      index++;
    }
  }
  return cells;
}
