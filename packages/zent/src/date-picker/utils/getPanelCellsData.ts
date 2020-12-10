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
  disableRangeOverView?: boolean;
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
  disableRangeOverView,
}: ICellDateParams) {
  const { isSame, startDate, offsetDate } = dateConfig;

  let index = 0;
  const cells: IDateCellBase[] = [];
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < col; colIndex++) {
      const currentDate = startDate(
        offsetDate(defaultPanelDate, index - offset)
      );
      const text = texts ? texts[index] : currentDate.getDate();

      const isCurrent = isSame(new Date(), currentDate);

      const isInView = inView ? inView(currentDate, defaultPanelDate) : true;

      const isDisabled = disabledPanelDate(currentDate);

      /* *************** week-picker & combined-picker start  *************** */
      let isInHoverRange = false;
      let isRangeEndpoint = false;
      let isInRange = false;
      //  hover-range
      if (hoverRangeDate) {
        const isInHoverRangeDate =
          isAfter(currentDate, offsetDate(hoverRangeDate[0], -1)) &&
          isBefore(currentDate, hoverRangeDate[1]);

        isInHoverRange = disableRangeOverView
          ? isInHoverRangeDate && isInView
          : isInHoverRangeDate;
      }
      // selected range
      if (rangeDate) {
        const isInRangeDate =
          isAfter(currentDate, rangeDate[0]) &&
          isBefore(currentDate, rangeDate[1]);

        isInRange = disableRangeOverView
          ? isInRangeDate && isInView
          : isInRangeDate;

        const isRangeEndpointDate =
          isSame(currentDate, rangeDate[0]) ||
          isSame(currentDate, rangeDate[1]);

        isRangeEndpoint = disableRangeOverView
          ? isRangeEndpointDate && isInView
          : isRangeEndpointDate;
      }
      /* *************** week-picker & combined-picker end  *************** */

      const isSelected =
        !!selected && (isSame(selected, currentDate) || isRangeEndpoint);

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
