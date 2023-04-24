import { FC, useCallback, useMemo, useState } from 'react';

import PanelContext from './context/PanelContext';
import useCombinedDisabledDate from './hooks/useCombinedDisabledDate';
import useRangeMergedProps from './hooks/useRangeMergedProps';
import useHoverRange from './hooks/useHoverRange';
import useNormalizeDisabledDate from './hooks/useNormalizeDisabledDate';
import { getRangeValuesWithValueType } from './utils/getValueInRangePicker';

import { DATE_FORMAT } from './constants';
import CombinedDatePanel, {
  ICombinedDateRangePanelProps,
} from './panels/combined-date-range-panel';
import {
  DateNullTuple,
  DateTuple,
  RangeTypeMap,
  IValueType,
  RangeDate,
  IRangeDisabledDateFunc,
  IDisabledDateSimple,
  IRangeRelatedType,
  IValueTypeRangeMap,
} from './types';
import { dateConfig } from './utils/dateUtils';

const { START, END } = RangeTypeMap;
const PanelContextProvider = PanelContext.Provider;

interface IProps<T extends IValueType = 'string'>
  extends Pick<
      ICombinedDateRangePanelProps,
      | 'showTime'
      | 'disabledTime'
      | 'leftClassName'
      | 'rightClassName'
      | 'footerClassName'
      | 'hideConfirm'
    >,
    IRangeRelatedType<T> {
  value: RangeDate | null;
  format?: string;
  disabledDate?: IRangeDisabledDateFunc | IDisabledDateSimple;
  defaultDate?: RangeDate | null;
  className?: string;
  dateSpan?: number;
}

export const CombinedPanelRangePicker: FC<IProps> = <
  T extends IValueType = 'string'
>({
  value,
  onChange,
  disabledDate: disabledDateProps,
  valueType,
  defaultDate,
  format,
  className,
  rightClassName,
  leftClassName,
  footerClassName,
  dateSpan,
  hideConfirm,
  showTime,
  disabledTime,
}) => {
  // merged from props value
  const { selected, setSelected, defaultPanelDate } = useRangeMergedProps({
    value,
    format,
    defaultDate,
    addMonthNum: 1,
  });

  // rangeDisabledDate
  const disabledDate = useNormalizeDisabledDate(format, disabledDateProps);
  const disabledCombinedDate = useCombinedDisabledDate(
    selected,
    disabledDate,
    dateConfig.date,
    dateSpan
  );

  // hover date
  const [hoverDate, setHoverDate] = useState<Date>();
  // hover range date
  const hoverRangeDate = useHoverRange(selected, hoverDate);
  // rangeDate
  const rangeDate = useMemo<DateTuple | null>(() => {
    const [startRangeDate, endRangeDate] = selected;
    return startRangeDate && endRangeDate
      ? [startRangeDate, endRangeDate]
      : null;
  }, [selected]);

  /**
   * onSelected 选择日期 触发onChange回调
   * @param finish {boolean} 标识是否完成全部选择
   *
   */
  const onSelected = useCallback(
    (val: DateNullTuple, finish = false) => {
      setSelected(val);
      if (hideConfirm || finish) {
        //onChange接受的参数根据valueType确定，而getRangeValuesWithValueType的返回值没有区分valueType，所以这里做一层转换
        onChange(
          getRangeValuesWithValueType(valueType, format, val) as
            | IValueTypeRangeMap[T]
            | null
        );
      }
    },
    [format, hideConfirm, onChange, setSelected, valueType]
  );

  return (
    <div className={className}>
      <PanelContextProvider value={{ onHover: setHoverDate }}>
        <CombinedDatePanel
          selected={selected}
          defaultPanelDate={defaultPanelDate}
          onSelected={onSelected}
          disabledStartDate={disabledCombinedDate(START)}
          disabledEndDate={disabledCombinedDate(END)}
          hoverDate={hoverDate}
          hoverRangeDate={hoverRangeDate}
          rangeDate={rangeDate}
          rightClassName={rightClassName}
          leftClassName={leftClassName}
          footerClassName={footerClassName}
          showTime={showTime}
          hideConfirm={hideConfirm}
          disabledTime={disabledTime}
        />
      </PanelContextProvider>
    </div>
  );
};

CombinedPanelRangePicker.defaultProps = {
  format: DATE_FORMAT,
  dateSpan: 0,
  hideConfirm: false,
  valueType: 'string',
};

export default CombinedPanelRangePicker;
