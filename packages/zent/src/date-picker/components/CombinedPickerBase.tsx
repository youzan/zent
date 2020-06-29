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
import { getRangeValuesWithValueType } from '../utils/getValueInRangePicker';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

import {
  ICombinedDateRangeProps,
  ICombinedDatePanelProps,
  IGenerateDateConfig,
} from '../types';

interface ICombinedPickerProps extends ICombinedDateRangeProps {
  generateDate: IGenerateDateConfig;
  PanelComponent: React.ComponentType<ICombinedDatePanelProps>;
}
const PanelContextProvider = PanelContext.Provider;
const COMBINED_PREFIXCLS = 'zent-datepicker-combined-trigger';

export const CombinedPicker: React.FC<ICombinedPickerProps> = ({
  value,
  onChange,
  disabledDate: disabledDateProps,
  defaultDate,
  format,
  name,
  placeholder,
  className,
  openPanel,
  disabled,
  canClear = true,
  valueType,
  generateDate,
  PanelComponent,
  onClose,
  onOpen,
  ...resetProps
}) => {
  const { i18n } = React.useContext(PickerContext);
  // props onChangeRef
  const onChangeRef = useEventCallbackRef(onChange);
  const onOpenRef = useEventCallbackRef(onOpen);
  const onCloseRef = useEventCallbackRef(onClose);
  const disabledDatePropsRef = useEventCallbackRef(disabledDateProps);

  // merged from props value
  const {
    selected,
    setSelected,
    disabledDate,
    defaultPanelDate,
  } = useRangeMergedProps({
    value,
    format,
    disabledDatePropsRef,
    defaultDate,
  });
  // popover visible
  const { panelVisible, setPanelVisible } = usePanelVisible(openPanel);

  // rangeDisabledDate
  const disabledPanelDate = useRangeDisabledDate({
    values: selected,
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
    (val, finish = false) => {
      setSelected([val[0], val[1]]);
      // 日期范围选择结束、手动触发清空操作
      if (finish && val[0] && val[1]) {
        onChangeRef?.current(
          getRangeValuesWithValueType(val, valueType, format)
        );
        // 关闭弹窗
        setPanelVisible(openPanel ?? false);
      }
    },
    [onChangeRef, valueType, format, openPanel, setSelected, setPanelVisible]
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
    // 只选中一个值时，关闭弹窗，清空选中日期
    if (!selected[1]) {
      setSelected([null, null]);
    }
  }, [
    openPanel,
    disabled,
    selected,
    panelVisible,
    setSelected,
    setPanelVisible,
  ]);

  // onClear
  const onClearInput = React.useCallback(
    evt => {
      evt.stopPropagation();
      onSelected([null, null]);
    },
    [onSelected]
  );

  return (
    <div className={cx('zent-datepicker', className)}>
      <PanelContextProvider value={{ onHover: setHoverDate }}>
        <PickerPopover
          panelVisible={panelVisible}
          onVisibleChange={onVisibleChange}
          trigger={
            <div
              className={cx(COMBINED_PREFIXCLS, {
                'zent-datepicker-can-clear': !disabled && canClear,
                'zent-datepicker-disabled': disabled,
                [`${COMBINED_PREFIXCLS}-focus`]: panelVisible,
              })}
            >
              <CombinedInputTrigger
                name={name}
                value={value}
                selected={selected}
                format={format}
                placeholder={placeholder}
                seperator={i18n.to}
                onClearInput={onClearInput}
              />
            </div>
          }
          content={
            <div className="zent-datepicker-combined-panel">
              <PanelComponent
                {...resetProps}
                selected={selected}
                defaultPanelDate={defaultPanelDate}
                onSelected={onSelected}
                disabledPanelDate={disabledPanelDate}
                hoverDate={hoverDate}
                hoverRangeDate={hoverRangeDate}
                rangeDate={rangeDate}
              />
            </div>
          }
        />
      </PanelContextProvider>
    </div>
  );
};

export default CombinedPicker;
