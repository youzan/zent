import { eachDayOfInterval, isAfter, isBefore, isSameDay } from 'date-fns';
import { IDateCellBase, IGenerateDateConfig, DateTuple } from '../types';
import { Lunar } from 'lunar-typescript';

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
  fullCellRender?: any;
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
  fullCellRender = null,
}: ICellDateParams) {
  const { isSame, startDate, endDate, offsetDate } = dateConfig;

  let index = 0;
  const cells: IDateCellBase[] = [];
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < col; colIndex++) {
      const currentDate = offsetDate(defaultPanelDate, index - offset);
      const text = texts ? texts[index] : currentDate.getDate();

      let lunarText = '';

      if (fullCellRender) {
        const date = currentDate as any;

        const d = Lunar.fromDate(date);
        const lunarDay = d.getDayInChinese();
        const solarTerm = d.getJieQi();

        if (1 === d.getDay()) {
          lunarText = d.getMonthInChinese() + '月';
        } else {
          lunarText = solarTerm || lunarDay;
        }
      }

      const isCurrent = isSame(new Date(), currentDate);

      const isInView = inView ? inView(currentDate, defaultPanelDate) : true;

      const isDisabled = eachDayOfInterval({
        start: startDate(currentDate),
        end: endDate(currentDate),
      }).every(date => disabledPanelDate(date));

      /* *************** week-picker & combined-picker start  *************** */
      let isInHoverRange = false;
      let isRangeEndpoint = false;
      let isInRange = false;
      //  hover-range
      if (hoverRangeDate) {
        const isInHoverRangeDate = isDateInRangeInclusive(
          currentDate,
          hoverRangeDate
        );

        isInHoverRange = disableRangeOverView
          ? isInHoverRangeDate && isInView
          : isInHoverRangeDate;
      }
      // selected range
      if (rangeDate) {
        const isInRangeDate = isDateInRangeInclusive(currentDate, rangeDate);

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
        !!selected &&
        (rangeDate ? isRangeEndpoint : isSame(selected, currentDate));

      cells[index] = {
        value: currentDate,
        text,
        lunarText,
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

function isDateInRangeInclusive(date: Date, range: DateTuple): boolean {
  return (
    isSameDay(date, range[0]) ||
    isSameDay(date, range[1]) ||
    (isAfter(date, range[0]) && isBefore(date, range[1]))
  );
}
