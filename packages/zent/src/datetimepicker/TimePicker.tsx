import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Input from '../input';
import Popover from '../popover';
import getWidth from '../utils/getWidth';
import { I18nReceiver as Receiver } from '../i18n';

import HourPanel from './time/HourPanel';
import MinutePanel from './time/MinutePanel';
import SecondPanel from './time/SecondPanel';
import PanelFooter from './common/PanelFooter';
import { formatDate, parseDate, dayStart, padLeft } from './utils';
import { timeFnMap, noop, popPositionMap, commonProps } from './constants';
import { DatePickers } from './common/types';

const DEFAULT_FORMAT = 'HH:mm:ss';
const DEFAULT_FORMAT_WITHOUT_SECOND = 'HH:mm';
enum TIME_KEY {
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}

/**
 * 如果 props.format 有修改，则使用之，否则检查showSecond，判断是否要显示秒
 * @param props
 * @returns {string}
 */
function getFormat(props) {
  const { format, showSecond } = props;

  const defaultFormat = showSecond
    ? DEFAULT_FORMAT
    : DEFAULT_FORMAT_WITHOUT_SECOND;
  return format === DEFAULT_FORMAT ? defaultFormat : format;
}

const disabledMap = {
  hour: 'disabledHour',
  minute: 'disabledMinute',
  second: 'disabledSecond',
};

function extractStateFromProps(props: ITimePickerProps): ITimePickerState {
  const { value } = props;
  let parsedDate;

  if (value) {
    parsedDate = parseDate(value, getFormat(props));
    if (!parsedDate) {
      console.warn('time and format mismatch'); // eslint-disable-line
    }
  } else {
    // 利用传入的format解析value，失败则返回默认值
    parsedDate = dayStart();
  }

  return {
    value: parsedDate,
    isPanelOpen: false,
    prevProps: props,
  };
}

export interface ITimePickerProps extends DatePickers.ICommonProps {
  isFooterVisble?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onBeforeConfirm?: () => boolean;
  onBeforeClear?: () => boolean;
  disabledTime?: () => DatePickers.IDisabledTime;
}

export interface ITimePickerState {
  value: Date;
  tabKey?: TIME_KEY | null;
  isPanelOpen: boolean;
  prevProps: ITimePickerProps;
}

export class TimePicker extends PureComponent<
  ITimePickerProps,
  ITimePickerState
> {
  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'HH:mm:ss',
    isFooterVisble: true,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    disabledTime: () => {},
  };

  retType = 'string';
  disabledTime: Partial<DatePickers.IDisabledTime>;

  static getDerivedStateFromProps(
    props: ITimePickerProps,
    state: ITimePickerState
  ): Partial<ITimePickerState> | null {
    if (props !== state.prevProps) {
      return extractStateFromProps(props);
    }
    return null;
  }

  constructor(props: ITimePickerProps) {
    super(props);
    const { value, valueType } = props;
    /**
     * 如果没有有明确指定 valueType，则返回和 value 一致的值，数字或日期或字符串
     */
    if (valueType) {
      this.retType = valueType.toLowerCase();
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }
    const state = extractStateFromProps(props);
    state.tabKey = TIME_KEY.HOUR;
    this.state = state;
    this.disabledTime = (props.disabledTime && props.disabledTime()) || {};
  }

  onChangeTime = (val, type) => {
    const fn = timeFnMap[type];
    const tmp = new Date(this.state.value);
    tmp[fn](val);

    let nextTabKey = this.state.tabKey;
    switch (type) {
      case TIME_KEY.HOUR:
        nextTabKey = TIME_KEY.MINUTE;
        break;
      case TIME_KEY.MINUTE: {
        if (this.props.showSecond) {
          nextTabKey = TIME_KEY.SECOND;
        }
        break;
      }
      default:
    }

    this.setState({
      value: tmp,
      tabKey: nextTabKey,
    });
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { onChange, onBeforeClear, canClear } = this.props;
    if (onBeforeClear && !onBeforeClear()) return; // 用户可以通过这个函数返回 false 来阻止清空

    if (!canClear) return;

    onChange('');
  };

  /**
   * 如果传入为数字，返回值也为数字
   * 如果传入为 Date 的实例，返回值也为 Date 的实例
   * 默认返回 format 格式的字符串
   */
  getReturnValue = date => {
    const format = getFormat(this.props);

    if (this.retType === 'number') {
      return date.getTime();
    }

    if (this.retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  };

  onConfirm = () => {
    const { value } = this.state;
    const { min, onClose, onChange, onBeforeConfirm } = this.props;

    if (onBeforeConfirm && !onBeforeConfirm()) return; //
    // 如果没有选择日期则默认选中当前日期
    let tmp = value || dayStart();

    tmp = new Date(
      tmp.getFullYear(),
      tmp.getMonth(),
      tmp.getDate(),
      value.getHours(),
      value.getMinutes(),
      value.getSeconds()
    );

    if (min) {
      const minDate = parseDate(min, getFormat(this.props));
      minDate.setFullYear(tmp.getFullYear());
      minDate.setMonth(tmp.getMonth());
      minDate.setDate(tmp.getDate());
      if (tmp < minDate) {
        tmp = new Date(minDate);
      }
    }

    this.setState({
      value: tmp,
      isPanelOpen: false,
    });

    const ret = this.getReturnValue(tmp);
    onChange(ret);
    onClose && onClose();
  };

  isCellDisabled = type => {
    const { min, max } = this.props;
    const { value } = this.state;
    const format = getFormat(this.props);
    let minDate = null;
    let minHour = 0;
    let minMinute = 0;
    let minSecond = 0;
    let maxDate = null;
    let maxHour = 23;
    let maxMinute = 59;
    let maxSecond = 59;

    if (min) {
      minDate = parseDate(min, format);
      minHour = minDate.getHours();
      minMinute = minDate.getMinutes();
      minSecond = minDate.getSeconds();
    }
    if (max) {
      maxDate = parseDate(max, format);
      maxHour = maxDate.getHours();
      maxMinute = maxDate.getMinutes();
      maxSecond = maxDate.getSeconds();
    }

    const defaultHandlers = {
      [TIME_KEY.HOUR]: h => h < minHour || h > maxHour,
      [TIME_KEY.MINUTE]: m =>
        (value.getHours() === minHour && m < minMinute) ||
        (value.getHours() === maxHour && m > maxMinute),
      [TIME_KEY.SECOND]: s =>
        (value.getHours() === minHour &&
          value.getMinutes() === minMinute &&
          s < minSecond) ||
        (value.getHours() === maxHour &&
          value.getMinutes() === maxMinute &&
          s > maxSecond),
    };

    return this.disabledTime[disabledMap[type]] || defaultHandlers[type];
  };

  togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const isPanelOpen = !this.state.isPanelOpen;
    if (disabled) return;

    isPanelOpen ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      isPanelOpen,
      tabKey: isPanelOpen ? TIME_KEY.HOUR : null,
    });
  };

  switchTab = tabKey => {
    this.setState({
      tabKey,
    });
  };

  resetTime = () => {
    this.setState({
      value: extractStateFromProps(this.props).value,
    });
  };

  renderPanelContent = i18n => {
    const { value, tabKey } = this.state;

    switch (tabKey) {
      case TIME_KEY.HOUR:
        return (
          <HourPanel
            step={this.props.hourStep}
            selected={value}
            isDisabled={this.isCellDisabled(TIME_KEY.HOUR)}
            onSelect={v => this.onChangeTime(v, 'hour')}
            i18n={i18n}
            hideHeader
          />
        );
      case TIME_KEY.MINUTE:
        return (
          <MinutePanel
            step={this.props.minuteStep}
            selected={value}
            isDisabled={this.isCellDisabled(TIME_KEY.MINUTE)}
            onSelect={v => this.onChangeTime(v, 'minute')}
            i18n={i18n}
            hideHeader
          />
        );
      case TIME_KEY.SECOND:
        return (
          <SecondPanel
            step={this.props.secondStep}
            selected={value}
            isDisabled={this.isCellDisabled(TIME_KEY.SECOND)}
            onSelect={v => this.onChangeTime(v, 'second')}
            i18n={i18n}
            hideHeader
          />
        );
      default:
        return null;
    }
  };

  renderPicker = i18n => {
    const {
      props: { confirmText, showSecond },
      state: { value, isPanelOpen },
    } = this;

    // 打开面板的时候才渲染
    if (isPanelOpen) {
      const linkCls = cx({
        'link--current': true,
      });

      const radioButtonGroup = [
        {
          value: TIME_KEY.HOUR,
          content: `${padLeft(value.getHours())}${i18n.panel.hour}`,
        },
        {
          value: TIME_KEY.MINUTE,
          content: `${padLeft(value.getMinutes())}${i18n.panel.minute}`,
        },
      ]
        .concat(
          showSecond
            ? [
                {
                  value: TIME_KEY.SECOND,
                  content: `${padLeft(value.getSeconds())}${i18n.panel.second}`,
                },
              ]
            : []
        )
        .map(({ value: tabKey, content }) => {
          return (
            <span
              key={tabKey}
              className={cx('time__number', {
                checked: this.state.tabKey === tabKey,
              })}
              onClick={() => this.switchTab(tabKey)}
            >
              {content}
            </span>
          );
        });

      return (
        <div className="time-picker time-panel time-picker-panel">
          <div className="panel__header time-picker-panel__header">
            <div
              className={cx('time-picker-panel__tab-group', {
                'show-second': showSecond,
              })}
            >
              {radioButtonGroup}
            </div>
          </div>
          <div className="time-picker-panel__content">
            {this.renderPanelContent(i18n)}
          </div>
          {this.props.isFooterVisble ? (
            <div className="time-picker-panel__footer">
              <PanelFooter
                buttonText={confirmText || i18n.confirm}
                onClickButton={this.onConfirm}
                linkText={i18n.reset}
                linkCls={linkCls}
                showLink
                onClickLink={this.resetTime}
              />
            </div>
          ) : null}
        </div>
      );
    }

    return null;
  };

  render() {
    const {
      props: {
        prefix,
        className,
        disabled,
        width,
        popPosition,
        name,
        placeholder,
        value,
        canClear,
        autoComplete,
      },
      state: { isPanelOpen },
    } = this;

    const format = getFormat(this.props);
    const formattedValue =
      (value && formatDate(parseDate(value, format), format)) || '';

    const wrapperCls = cx(
      `${prefix}-datetime-picker`,
      `${prefix}-time-picker`,
      className
    );
    const inputCls = cx({
      'picker-input': true,
      'picker-input--show-clear-icon': canClear && !!formattedValue,
      'picker-input--disabled': disabled,
      'time-picker-input': true,
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker">
          {i18n => (
            <Popover
              cushion={5}
              visible={isPanelOpen}
              onVisibleChange={this.togglePicker}
              className={`${prefix}-datetime-picker-popover ${className}-popover`}
              position={popPositionMap[popPosition.toLowerCase()]}
            >
              <Popover.Trigger.Click>
                <div
                  style={widthStyle}
                  className={inputCls}
                  onClick={evt => evt.preventDefault()}
                >
                  <Input
                    name={name}
                    value={formattedValue}
                    placeholder={placeholder || i18n.time}
                    onChange={noop}
                    disabled={disabled}
                    autoComplete={autoComplete}
                  />
                  <span className="zenticon zenticon-clock-o" />
                  {canClear && (
                    <span
                      onClick={this.onClearInput}
                      className="zenticon zenticon-close-circle"
                    />
                  )}
                </div>
              </Popover.Trigger.Click>
              <Popover.Content>{this.renderPicker(i18n)}</Popover.Content>
            </Popover>
          )}
        </Receiver>
      </div>
    );
  }
}

export default TimePicker;
