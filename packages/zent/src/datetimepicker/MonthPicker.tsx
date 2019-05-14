import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Input from '../input';
import Popover from '../popover';
import getWidth from '../utils/getWidth';
import { I18nReceiver as Receiver } from '../i18n';

import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import { formatDate, parseDate, dayStart, dayEnd, monthStart } from './utils';
import { CURRENT, noop, popPositionMap, commonProps } from './constants';
import { DatePickers } from './common/types';

export interface IMonthPickerProps extends DatePickers.ICommonProps {
  disabled?: boolean;
  isFooterVisble?: boolean;
  onBeforeClear?: () => unknown;
}

function extractStateFromProps(props: IMonthPickerProps) {
  let showPlaceholder;
  let selected;
  let actived;
  const { format, value, defaultValue } = props;

  if (value) {
    const tmp = parseDate(value, format);
    if (tmp) {
      showPlaceholder = false;
      selected = actived = monthStart(tmp);
    } else {
      console.warn("date and format don't match."); // eslint-disable-line
      showPlaceholder = true;
      actived = monthStart();
    }
  } else {
    showPlaceholder = true;
    if (defaultValue) {
      actived = monthStart(parseDate(defaultValue, format));
    } else {
      actived = monthStart();
    }
  }

  return {
    value: selected && formatDate(selected, format),
    actived,
    selected,
    openPanel: false,
    showPlaceholder,
    prevProps: props,
  };
}

export class MonthPicker extends PureComponent<IMonthPickerProps, any> {
  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY-MM',
  };

  retType = 'string';
  picker?: HTMLDivElement | null = null;

  static getDerivedStateFromProps(props: IMonthPickerProps, state: any) {
    if (props !== state.prevProps) {
      return extractStateFromProps(props);
    }
    return null;
  }

  constructor(props: IMonthPickerProps) {
    super(props);
    this.state = extractStateFromProps(props);
    const { value, valueType } = props;

    if (valueType) {
      this.retType = valueType.toLowerCase();
    } else if (value) {
      if (typeof value === 'number') this.retType = 'number';
      if (value instanceof Date) this.retType = 'date';
    }
  }

  getReturnValue = date => {
    const { format } = this.props;
    if (this.retType === 'number') {
      return date.getTime();
    }

    if (this.retType === 'date') {
      return date;
    }

    return formatDate(date, format);
  };

  onChangeMonth = val => {
    this.setState({
      actived: val,
    });
  };

  onSelectMonth = (val, isYear = false) => {
    const { onClick, isFooterVisble } = this.props;
    const month = val.getMonth();

    if (!isYear && this.isDisabled(month)) return;

    this.setState(
      {
        selected: val,
        actived: val,
      },
      () => {
        if (!isFooterVisble) {
          this.onConfirm();
        }
      }
    );

    onClick && onClick(val);
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { onChange, onBeforeClear, canClear } = this.props;
    if (onBeforeClear && !onBeforeClear()) return; // 用户可以通过这个函数返回 false 来阻止清空

    if (!canClear) return;

    onChange('');
  };

  onConfirm = () => {
    const {
      props: { format, onChange },
      state: { selected },
    } = this;

    let value = '';
    if (selected) {
      value = formatDate(selected, format);
    }

    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false,
    });
    onChange(this.getReturnValue(selected));
  };

  isDisabled = val => {
    const year = this.state.actived.getFullYear();
    const dateStr = `${year}-${val + 1}`;
    const ret = parseDate(dateStr, 'YYYY-MM');
    const { disabledDate, min, max, format } = this.props;

    if (disabledDate && disabledDate(ret)) return true;
    if (min && dayEnd(ret) < parseDate(min, format)) return true;
    if (max && dayStart(ret) > parseDate(max, format)) return true;

    return false;
  };

  renderPicker(i18n) {
    const {
      props: { confirmText, isFooterVisble },
      state: { actived, openPanel, selected },
    } = this;
    let monthPicker;
    if (openPanel) {
      const monthPickerCls = cx({
        'month-picker': true,
        small: isFooterVisble,
      });
      monthPicker = (
        <div className={monthPickerCls}>
          <MonthPanel
            actived={actived}
            selected={selected}
            onChange={this.onChangeMonth}
            onSelect={this.onSelectMonth}
            disabledDate={this.isDisabled}
            i18n={i18n}
          />
          {isFooterVisble ? (
            <PanelFooter
              buttonText={confirmText || i18n.confirm}
              linkText={i18n.current.month}
              linkCls="link--current"
              onClickLink={() => this.onSelectMonth(CURRENT)}
              onClickButton={this.onConfirm}
            />
          ) : null}
        </div>
      );
    }

    return monthPicker;
  }

  togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const openPanel = !this.state.openPanel;

    if (disabled) return;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      openPanel: !this.state.openPanel,
    });
  };

  render() {
    const {
      props: {
        className,
        disabled,
        name,
        placeholder,
        popPosition,
        prefix,
        width,
        canClear,
        autoComplete,
      },
      state: { openPanel, showPlaceholder, value },
    } = this;
    const wrapperCls = cx(
      `${prefix}-datetime-picker`,
      `${prefix}-month-picker`,
      className
    );
    const inputCls = cx({
      'picker-input': true,
      'picker-input--show-clear-icon': canClear && !showPlaceholder,
      'picker-input--disabled': disabled,
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker">
          {i18n => (
            <Popover
              cushion={5}
              visible={openPanel}
              onVisibleChange={this.togglePicker}
              className={cx(`${prefix}-datetime-picker-popover`, className)}
              position={popPositionMap[popPosition.toLowerCase()]}
            >
              <Popover.Trigger.Click>
                <div style={widthStyle} className={inputCls}>
                  <Input
                    name={name}
                    placeholder={placeholder || i18n.month}
                    value={value || ''}
                    onChange={noop}
                    disabled={disabled}
                    autoComplete={autoComplete}
                  />
                  <span className="zenticon zenticon-calendar-o" />
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

export default MonthPicker;
