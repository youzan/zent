import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import I18nLocaleContext from '../context/I18nLocaleContext';
import useMergedProps from '../hooks/useMergedProps';
import useWeekRange from '../hooks/useWeekRange';
import { SingleInputTrigger } from './PickerTrigger';
import PickerPopover from './PickerPopover';
import { useCallbackRef } from '../../utils/hooks/useCallbackRef';
import SinglePanelMap from '../panels';
import { generateDateConfig } from '../utils/dateUtils';

import {
  IDatePickerCommonProps,
  IPickerType,
  ISingleTriggerProps,
} from '../types';
import {
  getValueFromSinglePickerDate,
  getValueWithValueType,
  getRangeValuesWithValueType,
} from '../utils/getValue';

const I18nLocaleContextProvider = I18nLocaleContext.Provider;

type ISinglePickerProps = IDatePickerCommonProps &
  Pick<ISingleTriggerProps, 'placeholder'>;

export default function WithSinglePicker<P = {}>(
  ContentComponent: React.ComponentType<any>,
  defaultProps: any,
  type: IPickerType
) {
  const SinglePicker: React.FC<P & ISinglePickerProps> = props => {
    // props
    const {
      value,
      onChange,
      defaultPanelValue,
      disabledDate,
      format,
      width = 240,
      placeholder,
      className,
      valueType = 'string',
      // TODO <Disabled />
      disabled = false,
      canClear = true,
      openPanel,
      onOpen,
      onClose,
      ...resetProps
    } = props;

    const onChangeRef = useCallbackRef(onChange);

    // popover visible
    const [panelVisible, setPanelVisible] = React.useState<boolean>(
      openPanel ?? false
    );

    // merged from props value
    const {
      selected,
      setSelected,
      defaultPanelDate,
      setDefaultPanelDate,
      disabledPanelDate,
    } = useMergedProps({
      value: Array.isArray(value) ? value[0] : value,
      format,
      disabledDate,
      defaultPanelValue,
    });

    // hover date
    const [hoverDate, setHoverDate] = React.useState<Date>();
    // special handler on week-picker
    const hoverRangeDate = useWeekRange(hoverDate, type, resetProps);
    const rangeDate = useWeekRange(selected, type, resetProps);

    // 当前面板类型
    const [panelType, setPanelType] = React.useState<IPickerType>(type);
    // 当前面板组件
    const PanelComponent = React.useMemo(() => SinglePanelMap[panelType], [
      panelType,
    ]);
    // 面板切换
    const onChangePanel = type => {
      setPanelType(type);
    };
    // onSelected 选择日期
    // finish: 标识是否完成全部选择，处理清空、日期时间等特殊清空
    const onSelected = React.useCallback(
      (val: Date, finish = true) => {
        const { set, get } = generateDateConfig[panelType];
        const selectedValue = getValueFromSinglePickerDate(
          val,
          type,
          resetProps
        );

        // 当前面板不为最小单元面板
        if (panelType !== type) {
          setDefaultPanelDate(set(defaultPanelDate, get(val)));
          setPanelType(type);
          return;
        } else {
          // 周、月、年组件的value为数组
          setSelected(
            Array.isArray(selectedValue) ? selectedValue[0] : selectedValue
          );
        }

        if (finish) {
          // 计算回调的返回值
          const result = Array.isArray(selectedValue)
            ? getRangeValuesWithValueType(selectedValue, valueType, format)
            : getValueWithValueType(selectedValue, valueType, format);
          onChangeRef?.current(result);
          // 关闭弹窗
          setPanelVisible(false);
          setHoverDate(null);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [panelType]
    );

    // popover visible onChange
    const onVisibleChange = () => {
      if (openPanel !== undefined || disabled) return;
      setPanelVisible(!panelVisible);
      if (!panelVisible) {
        setHoverDate(null);
      }
    };

    // onClear
    const onClearInput = evt => {
      evt.stopPropagation();
      onSelected(null);
    };

    return (
      <div className={cx('zent-date-picker', className)}>
        <Receiver componentName="TimePicker">
          {(i18n: II18nLocaleTimePicker) => (
            <I18nLocaleContextProvider value={{ i18n, onHover: setHoverDate }}>
              <PickerPopover
                panelVisible={panelVisible}
                onVisibleChange={onVisibleChange}
                trigger={
                  <div
                    className={cx({
                      'zent-date-picker-can-clear': !disabled && canClear,
                      'zent-date-picker-disabled': disabled,
                    })}
                  >
                    <SingleInputTrigger
                      format={format}
                      i18n={i18n}
                      options={resetProps}
                      type={type}
                      selected={selected}
                      disabled={disabled}
                      canClear={canClear}
                      value={value}
                      width={width}
                      placeholder={placeholder || i18n[type]}
                      onClearInput={onClearInput}
                    />
                  </div>
                }
                content={
                  <div className="zent-date-picker-panel">
                    <PanelComponent
                      {...resetProps}
                      selected={selected}
                      hoverDate={hoverDate}
                      rangeDate={rangeDate}
                      hoverRangeDate={hoverRangeDate}
                      defaultPanelDate={defaultPanelDate}
                      onSelected={onSelected}
                      onChangePanel={onChangePanel}
                      disabledPanelDate={disabledPanelDate}
                    />
                  </div>
                }
              />
            </I18nLocaleContextProvider>
          )}
        </Receiver>
      </div>
    );
  };

  SinglePicker.defaultProps = defaultProps;
  return SinglePicker;
}
