import * as React from 'react';
import cx from 'classnames';

import { CombinedInputTrigger } from './PickerTrigger';
import PickerPopover from './PickerPopover';

import PanelContext from '../context/PanelContext';
import PickerContext from '../context/PickerContext';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useHoverRange from '../hooks/useHoverRange';
import usePanelVisible from '../hooks/usePanelVisible';
import useNormalizeDisabledDate from '../hooks/useNormalizeDisabledDate';
import { getRangeValuesWithValueType } from '../utils/getValueInRangePicker';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';
import { triggerCommonProps } from '../constants';
import {
  IRangeProps,
  IRangePanelProps,
  IGenerateDateConfig,
  IRangeTriggerProps,
  RangeTypeMap,
} from '../types';

interface ICombinedPickerProps
  extends IRangeProps,
    Pick<IRangeTriggerProps, 'placeholder' | 'name' | 'seperator'> {
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
    generateDate,
    PanelComponent,
  } = restPropsRef.current;
  const { getInputText } = React.useContext(PickerContext);
  // props onChangeRef
  const onChangeRef = useEventCallbackRef(onChange);
  const onOpenRef = useEventCallbackRef(onOpen);
  const onCloseRef = useEventCallbackRef(onClose);

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
  });
  // popover visible
  const { panelVisible, setPanelVisible } = usePanelVisible(openPanel);

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

  // panelVisible didUpdate
  const mounted = React.useRef<boolean>();
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (panelVisible) {
        setHoverDate(null);
        onOpenRef.current?.();
      } else {
        setSelected(parseValue);
        onCloseRef.current?.();
      }
    }
  }, [panelVisible, parseValue, onOpenRef, onCloseRef, setSelected]);

  // popover visible onChange
  const onVisibleChange = React.useCallback(() => {
    const { openPanel, disabled } = restPropsRef.current;
    if (openPanel !== undefined || disabled) return;
    setPanelVisible(!panelVisible);
  }, [restPropsRef, panelVisible, setPanelVisible]);

  // onClear
  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected([null, null]);
    },
    [onSelected]
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
          {...restProps}
          selected={selected}
          defaultPanelDate={defaultPanelDate}
          onSelected={onSelected}
          disabledPanelDate={[
            disabledStartDate?.(RangeTypeMap.START),
            disabledEndDate?.(RangeTypeMap.END),
          ]}
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
    restProps,
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
