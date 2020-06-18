import { IDateCellBase, IPickerType } from '../types';
import { generateDateConfig, CommonDateMap } from '../utils/dateUtils';

const { getDate, isAfter, isBefore } = CommonDateMap;
interface ICellDateParams {
  selected: Date;
  hoverDate: Date;
  rangeDate?: [Date, Date];
  hoverRangeDate?: [Date, Date];
  disabledPanelDate: (Date) => boolean;
  defaultPanelDate: Date;
  ROW_COUNT: number;
  COL_COUNT: number;
  type: IPickerType;
  texts?: Array<number | string>;
  offset?: number;
}
/**
 * 根据当前组件的selected等值 获得最小单元格的属性集合
 *
 */
export default function useCellsData({
  selected,
  hoverDate,
  rangeDate,
  hoverRangeDate,
  disabledPanelDate,
  defaultPanelDate,
  ROW_COUNT,
  COL_COUNT,
  type,
  texts,
  offset = 0,
}: ICellDateParams) {
  const { isSame, startDate, offsetDate } = generateDateConfig[type];
  let index = 0;
  const cells = [] as IDateCellBase[];
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      // offset
      const currentDate = startDate(
        offsetDate(defaultPanelDate, index - offset)
      );
      // constants text or fetch text
      const text = texts ? texts[index] : getDate(currentDate);

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
      const isInView =
        type !== 'date' ||
        generateDateConfig.month.isSame(currentDate, defaultPanelDate);

      // isHover
      const isHover = isSame(hoverDate, currentDate);

      // isDisabled
      const isDisabled = disabledPanelDate && disabledPanelDate(currentDate);

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
