import cx from 'classnames';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';

import PickerPopover from './PickerPopover';
import { SingleInputTrigger } from './PickerTrigger';
import PickerContext from '../context/PickerContext';
import PanelContext from '../context/PanelContext';
import useMergedProps from '../hooks/useMergedProps';
import useNormalizeDisabledDate from '../hooks/useNormalizeDisabledDate';
import useSinglePopoverVisible from '../hooks/useSinglePopoverVisible';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import pick from '../../utils/pick';
import { triggerCommonProps, INPUT_WIDTH } from '../constants';
import {
  ISinglePropsWithDefault,
  ISingleTriggerProps,
  ISinglePanelProps,
} from '../types';

const PanelContextProvider = PanelContext.Provider;

interface ISinglePickerProps
  extends ISinglePropsWithDefault,
    Pick<ISingleTriggerProps, 'seperator'> {
  PanelComponent: React.ComponentType<ISinglePanelProps>;
}

export function SinglePicker({
  value,
  onChange,
  onOpen,
  onClose,
  disabledDate,
  ...restProps
}: ISinglePickerProps) {
  const restPropsRef = useRef(restProps);
  restPropsRef.current = restProps;
  const {
    defaultDate,
    format,
    name,
    width,
    placeholder,
    className,
    valueType,
    disabled,
    canClear,
    openPanel,
    PanelComponent,
    ...restPanelProps
  } = restPropsRef.current;
  const { getSelectedValue, getCallbackValue, getInputText } = useContext(
    PickerContext
  );
  // props onChangeRef
  const onChangeRef = useEventCallbackRef(onChange);

  // merged from props value
  const {
    selected,
    parseValue,
    setSelected,
    defaultPanelDate,
  } = useMergedProps({
    value,
    format,
    defaultDate,
  });

  // popover visible
  const {
    panelVisible,
    setPanelVisible,
    onVisibleChange,
  } = useSinglePopoverVisible<Date | null>(
    parseValue,
    setSelected,
    onOpen,
    onClose,
    disabled,
    openPanel
  );

  const disabledPanelDate = useNormalizeDisabledDate(format, disabledDate);

  // hover date
  const [hoverDate, setHoverDate] = useState<Date>();

  /**
   * onSelected 选择日期 触发onChange回调
   * finish默认true表示选中日期即触发回调，支持时间选择等特殊情况时不直接触发回调
   *
   */
  const onSelected = useCallback(
    (val: Date, finish = true) => {
      setSelected(getSelectedValue?.(val) || null);

      if (finish) {
        // 计算回调的返回值
        onChangeRef.current?.(getCallbackValue?.(val) || null);
        // 关闭弹窗
        setPanelVisible(openPanel ?? false);
      }
    },
    [
      getSelectedValue,
      getCallbackValue,
      onChangeRef,
      openPanel,
      setSelected,
      setPanelVisible,
    ]
  );

  // onClear
  const onClearInput = useCallback(
    evt => {
      evt.stopPropagation();
      onChangeRef.current?.(null);
    },
    [onChangeRef]
  );

  // trigger-input text
  const text = useMemo(() => getInputText?.(selected), [
    selected,
    getInputText,
  ]);

  const trigger = useMemo(() => {
    const triggerProps = pick(restPropsRef.current, triggerCommonProps);
    return (
      <div>
        <SingleInputTrigger
          {...triggerProps}
          value={value}
          disabled={disabled}
          text={text}
          panelVisible={panelVisible}
          onClearInput={onClearInput}
        />
      </div>
    );
  }, [text, value, panelVisible, restPropsRef, disabled, onClearInput]);

  const content = useMemo(() => {
    return (
      <div className="zent-datepicker-panel">
        <PanelComponent
          {...restPanelProps}
          selected={selected}
          hoverDate={hoverDate}
          defaultPanelDate={defaultPanelDate}
          onSelected={onSelected}
          disabledPanelDate={disabledPanelDate}
        />
      </div>
    );
  }, [
    selected,
    hoverDate,
    defaultPanelDate,
    restPanelProps,
    disabledPanelDate,
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
}
SinglePicker.defaultProps = {
  canClear: true,
  width: INPUT_WIDTH,
};

export default SinglePicker;
