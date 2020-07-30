import * as React from 'react';
import cx from 'classnames';

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
  RangeDate,
  IRangeProps,
  IRangePanelProps,
  IGenerateDateConfig,
  IRangeTriggerProps,
} from '../types';

interface ICombinedPickerProps
  extends IRangeProps,
    Pick<IRangeTriggerProps, 'seperator'> {
  generateDate: IGenerateDateConfig;
  PanelComponent: React.ComponentType<IRangePanelProps>;
}
const PanelContextProvider = PanelContext.Provider;

export const CombinedPicker: React.FC<ICombinedPickerProps> = ({
  value,
  onChange,
  onOpen,
  onClose,
  disabledDate: disabledDateProps,
  ...restProps
}) => {
  const restPropsRef = React.useRef(restProps);
  restPropsRef.current = restProps;
  const {
    defaultDate,
    format,
    className,
    openPanel,
    disabled,
    generateDate,
    PanelComponent,
  } = restPropsRef.current;
  const { getInputText } = React.useContext(PickerContext);
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
  } = useSinglePopoverVisible<RangeDate>(
    openPanel,
    disabled,
    parseValue,
    setSelected,
    onOpen,
    onClose
  );

  // rangeDisabledDate
  const disabledDate = useNormalizeDisabledDate(disabledDateProps, format);
  const [disabledStartDate, disabledEndDate] = useRangeDisabledDate({
    selected,
    disabledDate,
    generateDate,
    pickerType: 'combined',
  });

  // hover date
  const [hoverDate, setHoverDate] = React.useState<Date>();
  // hover range date
  const hoverRangeDate = useHoverRange(selected, hoverDate);
  // rangeDate
  const rangeDate = React.useMemo(
    () => (selected[0] && selected[1] ? selected : null),
    [selected]
  );

  /**
   * onSelected 选择日期 触发onChange回调
   * @param finish {boolean} 标识是否完成全部选择，处理清空、日期时间等特殊清空
   *
   */
  const onSelected = React.useCallback(
    (val: [Date, Date], finish = false) => {
      setSelected(val);
      // 日期范围选择结束、手动触发清空操作
      if (finish) {
        const { valueType, format, openPanel } = restPropsRef.current;
        onChangeRef.current?.(
          getRangeValuesWithValueType(val, valueType, format)
        );
        setPanelVisible(openPanel ?? false);
      }
    },
    [onChangeRef, restPropsRef, setPanelVisible, setSelected]
  );

  // onClear
  const onClearInput = React.useCallback(
    evt => {
      const { valueType, format } = restPropsRef.current;
      evt.stopPropagation();
      onChangeRef.current?.(
        getRangeValuesWithValueType(null, valueType, format)
      );
    },
    [restPropsRef, onChangeRef]
  );

  // trigger-input text
  const text = React.useMemo(() => getInputText(selected), [
    selected,
    getInputText,
  ]);

  const trigger = React.useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
    return (
      <div>
        <CombinedInputTrigger
          {...triggerProps}
          selected={selected}
          value={value}
          text={text}
          panelVisible={panelVisible}
          onClearInput={onClearInput}
        />
      </div>
    );
  }, [selected, text, value, panelVisible, restPropsRef, onClearInput]);
  const content = React.useMemo(() => {
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
