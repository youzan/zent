import * as React from 'react';
import cx from 'classnames';
import { I18nReceiver as Receiver, II18nLocaleTimePicker } from '../../i18n';
import I18nLocaleContext from '../context/I18nLocaleContext';
import useRangeDisabledDate from '../hooks/useRangeDisabledDate';
import useRangeMergedProps from '../hooks/useRangeMergedProps';
import useHoverRange from '../hooks/useHoverRange';
import { CombinedInputTrigger } from './PickerTrigger';
import PickerPopover from './PickerPopover';
import { getRangeValuesWithValueType } from '../utils/getValue';
import { useCallbackRef } from '../../utils/hooks/useCallbackRef';
import SinglePanelMap from '../panels';

import {
  IDatePickerCommonProps,
  IPickerType,
  IRangeTriggerProps,
} from '../types';
import { generateDateConfig } from '../utils/dateUtils';

type ICombinedPickerProps = IDatePickerCommonProps &
  Pick<IRangeTriggerProps, 'placeholder'>;
const I18nLocaleContextProvider = I18nLocaleContext.Provider;
const COMBINED_PREFIXCLS = 'zent-date-picker-combined-trigger';

export default function WithCombinedPicker<P>(
  ContentComponent: React.ComponentType<any>,
  defaultProps: any,
  type: IPickerType
) {
  const CombinedPicker: React.FC<P & ICombinedPickerProps> = props => {
    const {
      value,
      onChange,
      disabledDate: disabledDateProps,
      defaultPanelValue,
      format,
      placeholder,
      className,
      openPanel,
      disabled,
      canClear = true,
      valueType,
      ...resetProps
    } = props;
    // props onChangeRef
    const onChangeRef = useCallbackRef(onChange);

    // popover visible
    const [panelVisible, setPanelVisible] = React.useState<boolean>(
      openPanel ?? false
    );
    // merged from props value
    const {
      selected,
      setSelected,
      disabledDate,
      defaultPanelDate,
      setDefaultPanelDate,
    } = useRangeMergedProps({
      value,
      format,
      disabledDate: disabledDateProps,
      defaultPanelValue,
    });
    // rangeDisabledDate
    const disabledPanelDate = useRangeDisabledDate({
      values: selected,
      disabledDate,
      type,
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

    /* *************** change panel start  *************** */
    // 当前面板类型
    const [panelType, setPanelType] = React.useState<IPickerType>();
    // 当前面板组件
    const PanelComponent = React.useMemo(
      () => (panelType ? SinglePanelMap[panelType] : null),
      [panelType]
    );
    // 面板切换
    const onChangePanel = type => {
      setPanelType(type);
    };
    /* *************** change panel end  *************** */

    /**
     * onSelected 选择日期 触发onChange回调
     * @param finish {boolean} 标识是否完成全部选择，处理清空、日期时间等特殊清空
     *
     */
    const onSelected = React.useCallback(
      (val, finish = false) => {
        // 当前面板为非最小单元选择面板
        if (panelType) {
          const { set, get } = generateDateConfig[panelType];
          setDefaultPanelDate([
            set(defaultPanelDate[0], get(val)),
            set(defaultPanelDate[1], get(val)),
          ]);
          setPanelType(null);
          return;
        }

        setSelected([val[0], val[1]]);
        // 日期范围选择结束、手动触发清空操作
        if (finish && val[0] && val[1]) {
          onChangeRef?.current(
            getRangeValuesWithValueType(val, valueType, format)
          );
          // 关闭弹窗
          setPanelVisible(false);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [panelType]
    );

    // popover visible onChange
    const onVisibleChange = React.useCallback(() => {
      if (openPanel !== undefined || disabled) return;
      setPanelVisible(!panelVisible);
      // 只选中一个值时，关闭弹窗，清空选中日期
      if (!selected[1]) {
        setSelected([null, null]);
      }
    }, [openPanel, disabled, selected, setSelected, panelVisible]);

    // onClear
    const onClearInput = evt => {
      evt.stopPropagation();
      onSelected([null, null]);
    };

    // 切换单面板
    const renderContent = () => {
      const ContentNode = PanelComponent || ContentComponent;
      return (
        <div
          className={
            panelType
              ? 'zent-date-picker-panel'
              : 'zent-date-picker-combined-panel'
          }
        >
          <ContentNode
            {...resetProps}
            selected={panelType ? selected[0] : selected}
            defaultPanelDate={
              panelType ? defaultPanelDate[0] : defaultPanelDate
            }
            onSelected={onSelected}
            disabledPanelDate={
              panelType ? disabledPanelDate[0] : disabledPanelDate
            }
            hoverDate={hoverDate}
            hoverRangeDate={hoverRangeDate}
            rangeDate={rangeDate}
            onChangePanel={onChangePanel}
          />
        </div>
      );
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
                    className={cx(COMBINED_PREFIXCLS, {
                      'zent-date-picker-can-clear': !disabled && canClear,
                      'zent-date-picker-disabled': disabled,
                      [`${COMBINED_PREFIXCLS}-focus`]: panelVisible,
                    })}
                  >
                    <CombinedInputTrigger
                      value={value}
                      selected={selected}
                      format={format}
                      placeholder={placeholder || [i18n.start, i18n.end]}
                      seperator={i18n.to}
                      onClearInput={onClearInput}
                    />
                  </div>
                }
                content={
                  renderContent()
                  // <ContentComponent
                  //   {...resetProps}
                  //   selected={selected}
                  //   defaultPanelDate={defaultPanelDate}
                  //   onSelected={onSelected}
                  //   disabledPanelDate={disabledPanelDate}
                  //   hoverDate={hoverDate}
                  //   hoverRangeDate={hoverRangeDate}
                  //   rangeDate={rangeDate}
                  //   onChangePanel={onChangePanel}
                  // />
                }
              />
            </I18nLocaleContextProvider>
          )}
        </Receiver>
      </div>
    );
  };

  CombinedPicker.defaultProps = defaultProps;
  return CombinedPicker;
}
