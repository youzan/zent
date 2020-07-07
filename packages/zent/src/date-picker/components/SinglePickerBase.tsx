import * as React from 'react';
import cx from 'classnames';

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
import { ISingleProps, ISingleTriggerProps, ISinglePanelProps } from '../types';

const PanelContextProvider = PanelContext.Provider;

interface ISinglePickerProps
  extends ISingleProps,
    Pick<ISingleTriggerProps, 'placeholder' | 'name' | 'seperator'> {
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
  const restPropsRef = React.useRef(restProps);
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
  const { getSelectedValue, getCallbackValue, getInputText } = React.useContext(
    PickerContext
  );
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
  } = useSinglePopoverVisible(
    openPanel,
    disabled,
    parseValue,
    setSelected,
    onOpen,
    onClose
  );

  const disabledPanelDate = useNormalizeDisabledDate(disabledDate, format);

  // hover date
  const [hoverDate, setHoverDate] = React.useState<Date>();

  /**
   * onSelected 选择日期 触发onChange回调
   * @param finish {boolean} 标识是否完成全部选择，处理清空、日期时间等特殊清空
   *
   */
  const onSelected = React.useCallback(
    (val: Date, finish = true) => {
      setSelected(getSelectedValue(val));

      if (finish) {
        // 计算回调的返回值
        const result = getCallbackValue(val);
        onChangeRef.current?.(result);
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
  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected(null);
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
        <SingleInputTrigger
          {...triggerProps}
          value={value}
          text={text}
          panelVisible={panelVisible}
          onClearInput={onClearInput}
        />
      </div>
    );
  }, [text, value, panelVisible, restPropsRef, onClearInput]);

  const content = React.useMemo(() => {
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
  disabled: false,
  canClear: true,
  width: INPUT_WIDTH,
};

export default SinglePicker;
