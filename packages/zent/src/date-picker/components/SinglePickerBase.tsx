import * as React from 'react';
import cx from 'classnames';

import PickerPopover from './PickerPopover';
import { SingleInputTrigger } from './PickerTrigger';

import PickerContext from '../context/PickerContext';
import PanelContext from '../context/PanelContext';

import useMergedProps from '../hooks/useMergedProps';
import usePanelVisible from '../hooks/usePanelVisible';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import {
  IDatePickerCommonProps,
  ISingleTriggerProps,
  ISingleDatePanelProps,
} from '../types';

const PanelContextProvider = PanelContext.Provider;

interface ISinglePickerProps
  extends IDatePickerCommonProps,
    Pick<ISingleTriggerProps, 'placeholder' | 'name'> {
  PanelComponent: React.ComponentType<ISingleDatePanelProps>;
}

export const SinglePicker: React.FC<ISinglePickerProps> = ({
  value,
  onChange,
  defaultDate,
  disabledDate,
  format,
  name,
  width = 240,
  placeholder,
  className,
  valueType,
  disabled = false,
  canClear = true,
  openPanel,
  onOpen,
  onClose,
  PanelComponent,
  ...resetProps
}) => {
  const {
    i18n,
    getSelectedValue,
    getCallbackValue,
    getInputText,
  } = React.useContext(PickerContext);
  const onChangeRef = useEventCallbackRef(onChange);
  const onOpenRef = useEventCallbackRef(onOpen);
  const onCloseRef = useEventCallbackRef(onClose);
  const disabledDateRef = useEventCallbackRef(disabledDate);

  // popover visible
  const { panelVisible, setPanelVisible } = usePanelVisible(openPanel);

  // merged from props value
  const {
    selected,
    setSelected,
    defaultPanelDate,
    disabledPanelDate,
  } = useMergedProps({
    value: Array.isArray(value) ? value[0] : value,
    format,
    disabledDateRef,
    defaultDate,
  });

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
        onChangeRef?.current(result);
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

  // didUpdate
  const mounted = React.useRef<boolean>();
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (panelVisible) {
        setHoverDate(null);
        onOpenRef?.current();
      } else {
        onCloseRef?.current();
      }
    }
  }, [panelVisible, onOpenRef, onCloseRef]);

  // popover visible onChange
  const onVisibleChange = React.useCallback(() => {
    if (openPanel !== undefined || disabled) return;
    setPanelVisible(!panelVisible);
  }, [openPanel, disabled, panelVisible, setPanelVisible]);

  // onClear
  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected(null);
    },
    [onSelected]
  );

  // trigger-input text
  const text = React.useMemo(() => getInputText(selected, i18n), [
    selected,
    i18n,
    getInputText,
  ]);

  return (
    <div className={cx('zent-datepicker', className)}>
      <PanelContextProvider value={{ onHover: setHoverDate }}>
        <PickerPopover
          panelVisible={panelVisible}
          onVisibleChange={onVisibleChange}
          trigger={
            <div
              className={cx({
                'zent-datepicker-can-clear': !disabled && canClear,
                'zent-datepicker-disabled': disabled,
              })}
            >
              <SingleInputTrigger
                text={text}
                name={name}
                format={format}
                disabled={disabled}
                canClear={canClear}
                value={value}
                width={width}
                placeholder={placeholder}
                onClearInput={onClearInput}
              />
            </div>
          }
          content={
            <div className="zent-datepicker-panel">
              <PanelComponent
                {...resetProps}
                selected={selected}
                hoverDate={hoverDate}
                defaultPanelDate={defaultPanelDate}
                onSelected={onSelected}
                disabledPanelDate={disabledPanelDate}
              />
            </div>
          }
        />
      </PanelContextProvider>
    </div>
  );
};

export default SinglePicker;
