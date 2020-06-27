import { IDateCellBase, IGenerateDateConfig } from '../types';
import { CommonDateMap } from './dateUtils';

const { isAfter, isBefore } = CommonDateMap;
interface ICellDateParams {
  selected: Date;
  hoverDate: Date;
  rangeDate?: [Date, Date];
  hoverRangeDate?: [Date, Date];
  disabledPanelDate: (Date) => boolean;
  defaultPanelDate: Date;
  row: number;
  col: number;
  generateDateConfig: IGenerateDateConfig;
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
  hoverDate,
  rangeDate,
  hoverRangeDate,
  disabledPanelDate,
  defaultPanelDate,
  row,
  col,
  generateDateConfig,
  texts,
  offset = 0,
  inView = null,
}: ICellDateParams) {
  const { isSame, startDate, offsetDate } = generateDateConfig;

  let index = 0;
  const cells = [] as IDateCellBase[];
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
          hoverDate &&
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
        selected && (isSame(selected, currentDate) || isRangeEndpoint);

      // isCurrent
      const isCurrent = isSame(new Date(), currentDate);

      // isInView
      const isInView = inView ? inView(currentDate, defaultPanelDate) : true;

      // isHover
      const isHover = isSame(hoverDate, currentDate);

      // isDisabled
      const isDisabled = disabledPanelDate?.(currentDate);

      cells[index] = {
        value: currentDate,
        text,
        isCurrent,
        isSelected,
        isInView,
        isHover,
        isDisabled,
        isInHoverRange,
        isInRange,
      };
      index++;
    }
  }
  return cells as IDateCellBase[];
}
