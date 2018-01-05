import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';

import Input from 'input';
import Popover from 'popover';
import getWidth from 'utils/getWidth';
import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT, formatDate, parseDate, dayStart } from './utils';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants';

function extractStateFromProps(props) {
  let showPlaceholder;
  let selected;
  let actived;
  const { format, value, defaultValue } = props;

  if (value) {
    const tmp = parseDate(value, format);
    if (tmp) {
      showPlaceholder = false;
      selected = actived = tmp;
    } else {
      console.warn("date and format don't match."); // eslint-disable-line
      showPlaceholder = true;
      actived = dayStart();
    }
  } else {
    showPlaceholder = true;
    if (defaultValue) {
      actived = parseDate(defaultValue, format);
    } else {
      actived = dayStart();
    }
  }

  return {
    value: selected && formatDate(selected, format),
    actived,
    selected,
    openPanel: false,
    showPlaceholder
  };
}

class MonthPicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY-MM'
  };

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeMonth = val => {
    this.setState({
      actived: val
    });
  };

  onSelectMonth = (val, isYear = false) => {
    const { onClick, isFooterVisble } = this.props;
    const month = val.getMonth();

    if (!isYear && this.isDisabled(month)) return;

    this.setState(
      {
        selected: val,
        actived: val
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
    this.props.onChange('');
  };

  onConfirm = () => {
    const { props: { format, onChange }, state: { selected } } = this;

    let value = '';
    if (selected) {
      value = formatDate(selected, format);
    }

    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    onChange(value);
  };

  isDisabled = val => {
    const year = this.state.actived.getFullYear();
    const dateStr = `${year}-${val + 1}`;
    const ret = parseDate(dateStr, 'YYYY-MM');
    const { disabledDate, min, max, format } = this.props;

    if (disabledDate && disabledDate(ret)) return true;
    if (min && ret < parseDate(min, format)) return true;
    if (max && ret > parseDate(max, format)) return true;

    return false;
  };

  renderPicker(i18n) {
    const {
      props: { confirmText, isFooterVisble },
      state: { actived, openPanel, selected }
    } = this;
    let monthPicker;
    if (openPanel) {
      const monthPickerCls = classNames({
        'month-picker': true,
        small: isFooterVisble
      });
      monthPicker = (
        <div className={monthPickerCls} ref={ref => (this.picker = ref)}>
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
      openPanel: !this.state.openPanel
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
        width
      },
      state: { openPanel, showPlaceholder, value }
    } = this;
    const wrapperCls = `${prefix}-datetime-picker ${className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !showPlaceholder,
      'picker-input--disabled': disabled
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <Popover
              cushion={5}
              visible={openPanel}
              onVisibleChange={this.togglePicker}
              className={`${prefix}-datetime-picker-popover ${className}    -popover`}
              position={popPositionMap[popPosition.toLowerCase()]}
            >
              <Popover.Trigger.Click>
                <div style={widthStyle} className={inputCls}>
                  <Input
                    name={name}
                    value={showPlaceholder ? placeholder || i18n.month : value}
                    onChange={noop}
                    disabled={disabled}
                  />
                  <span className="zenticon zenticon-calendar-o" />
                  <span
                    onClick={this.onClearInput}
                    className="zenticon zenticon-close-circle"
                  />
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
