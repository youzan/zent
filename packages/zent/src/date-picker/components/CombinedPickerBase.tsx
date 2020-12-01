import cx from 'classnames';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';

import { CombinedInputTrigger } from './PickerTrigger';
import PickerPopover from './PickerPopover';

import PanelContext from '../context/PanelContext';
import PickerContext from '../context/PickerContext';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useHoverRange from '../hooks/useHoverRange';
import useSinglePopoverVisible from '../hooks/useSinglePopoverVisible';
import useNormalizeDisabledDate from '../hooks/useNormalizeDisabledDate';
import { getRangeValuesWithValueType } from '../utils/getValueInRangePicker';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';

import { triggerCommonProps } from '../constants';
import {
  IRangePanelProps,
  IGenerateDateConfig,
  DateNullTuple,
  IRangePropsWithDefault,
  DateTuple,
} from '../types';

interface ICombinedPickerProps extends IRangePropsWithDefault {
  seperator?: string;
  generateDate: IGenerateDateConfig;
  PanelComponent: React.ComponentType<IRangePanelProps>;
}
const PanelContextProvider = PanelContext.Provider;

export const CombinedPicker: React.FC<ICombinedPickerProps> = ({
  value,
  onChange,
  onOpen,
  onClose,
  dateSpan,
  disabledDate: disabledDateProps,
  disabled,
  ...restProps
}) => {
  const restPropsRef = useRef(restProps);
  restPropsRef.current = restProps;
  const {
    defaultDate,
    format,
    className,
    openPanel,
    generateDate,
    PanelComponent,
  } = restPropsRef.current;
  const { getInputRangeText } = useContext(PickerContext);
  // props onChangeRef
  const onChangeRef = useEventCallbackRef(onChange);

  // merged from props value
  const {
    selected,
    parseValue,
    setSelected,
    defaultPanelDate,
  } = useRangeMergedProps({
    value,
    format,
    defaultDate,
    addMonthNum: 1,
  });

  // popover visible
  const {
    panelVisible,
    setPanelVisible,
    onVisibleChange,
  } = useSinglePopoverVisible<DateNullTuple>(
    parseValue,
    setSelected,
    onOpen,
    onClose,
    disabled,
    openPanel
  );

  // rangeDisabledDate
  const disabledDate = useNormalizeDisabledDate(format, disabledDateProps);
  const [disabledStartDate, disabledEndDate] = useRangeDisabledDate(
    selected,
    disabledDate,
    generateDate,
    'combined',
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
   * @param finish {boolean} 标识是否完成全部选择，处理清空、日期时间等特殊清空
   *
   */
  const onSelected = useCallback(
    (val: DateNullTuple, finish = false) => {
      setSelected(val);
      // 日期范围选择结束、手动触发清空操作
      if (finish) {
        const { valueType, format, openPanel } = restPropsRef.current;
        onChangeRef.current?.(
          getRangeValuesWithValueType(valueType, format, val)
        );
        setPanelVisible(openPanel ?? false);
      }
    },
    [onChangeRef, restPropsRef, setPanelVisible, setSelected]
  );

  // onClear
  const onClearInput = useCallback(
    evt => {
      evt.stopPropagation();
      onChangeRef.current?.([null, null]);
    },
    [onChangeRef]
  );

  // trigger-input text
  const text = useMemo(() => getInputRangeText?.(selected), [
    selected,
    getInputRangeText,
  ]);

  const trigger = useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
    return (
      <div>
        <CombinedInputTrigger
          {...triggerProps}
          disabled={disabled}
          selected={selected}
          value={value}
          text={text}
          panelVisible={panelVisible}
          onClearInput={onClearInput}
        />
      </div>
    );
  }, [
    selected,
    text,
    value,
    panelVisible,
    restPropsRef,
    disabled,
    onClearInput,
  ]);

  const content = useMemo(() => {
    return (
      <div className="zent-datepicker-combined-panel">
        <PanelComponent
          {...restPropsRef.current}
          selected={selected}
          defaultPanelDate={defaultPanelDate}
          onSelected={onSelected}
          disabledStartDate={disabledStartDate}
          disabledEndDate={disabledEndDate}
          hoverDate={hoverDate}
          hoverRangeDate={hoverRangeDate}
          rangeDate={rangeDate}
        />
      </div>
    );
  }, [
    selected,
    hoverDate,
    rangeDate,
    hoverRangeDate,
    defaultPanelDate,
    restPropsRef,
    disabledStartDate,
    disabledEndDate,
    onSelected,
    PanelComponent,
  ]);

  return (
    <div className={cx('zent-datepicker', className)}>
      <PanelContextProvider value={{ onHover: setHoverDate }}>
        <PickerPopover
          panelVisible={panelVisible}
          onVisibleChange={onVisibleChange}
          trigger={trigger}
          content={content}
        />
      </PanelContextProvider>
    </div>
  );
};
CombinedPicker.defaultProps = {
  disabled: false,
  canClear: true,
};
export default CombinedPicker;
