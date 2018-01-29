import React, { Component, PureComponent } from 'react';
import cx from 'classnames';

import Input from 'input';
import Popover from 'popover';
import getWidth from 'utils/getWidth';
import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import YearPanel from './year/YearPanel';
import PanelFooter from './common/PanelFooter';
import { formatDate, parseDate, dayStart } from './utils';
import {
  CURRENT,
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
    const tmp = parseDate(`${value}`, format);
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
      actived = parseDate(`${defaultValue}`, format);
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

class YearPicker extends (PureComponent || Component) {
  static propTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '',
    format: 'YYYY',
    needConfirm: false
  };

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  onChangeYear = val => {
    const { actived } = this.state;
    const acp = new Date(actived);
    acp.setFullYear(val);

    this.setState({
      actived: acp
    });
  };

  onSelectYear = val => {
    if (this.isDisabled(val)) return;
    const { props: { isFooterVisble, onChange }, state: { actived } } = this;
    const acp = new Date(actived);
    acp.setFullYear(val);

    if (!isFooterVisble) {
      this.setState({
        value: acp,
        selected: acp,
        openPanel: false,
        showPlaceholder: false
      });
      onChange(`${val}`);
    }
  };

  onClearInput = evt => {
    evt.stopPropagation();
    const { canClear, onChange } = this.props;
    if (!canClear) return;

    onChange('');
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
    const { disabledDate, min, max } = this.props;

    if (disabledDate && disabledDate(val)) return true;
    if (min && +val < +min) return true;
    if (max && +val > +max) return true;

    return false;
  };

  renderPicker() {
    const { state, props } = this;

    let yearPicker;
    if (state.openPanel) {
      yearPicker = (
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <div className="year-picker" ref={ref => (this.picker = ref)}>
              <YearPanel
                actived={state.actived}
                selected={state.selected}
                onChange={this.onChangeYear}
                onSelect={this.onSelectYear}
                disabledDate={this.isDisabled}
                i18n={i18n}
              />
              {props.needConfirm && (
                <PanelFooter
                  buttonText={props.confirmText || i18n.confirm}
                  linkText={i18n.current.year}
                  linkCls="link--current"
                  onClickLink={() => this.onSelectYear(CURRENT)}
                  onClickButton={this.onConfirm}
                />
              )}
            </div>
          )}
        </Receiver>
      );
    }

    return yearPicker;
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

    const wrapperCls = cx(`${prefix}-datetime-picker`, className);
    const inputCls = cx({
      'picker-input': true,
      'picker-input--filled': !showPlaceholder,
      'picker-input--disabled': disabled
    });
    const widthStyle = getWidth(width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Popover
          cushion={5}
          visible={openPanel}
          onVisibleChange={this.togglePicker}
          className={`${prefix}-datetime-picker-popover ${className}-popover`}
          position={popPositionMap[popPosition.toLowerCase()]}
        >
          <Popover.Trigger.Click>
            <div style={widthStyle} className={inputCls}>
              <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
                {i18n => (
                  <Input
                    name={name}
                    value={showPlaceholder ? placeholder || i18n.year : value}
                    onChange={noop}
                    disabled={disabled}
                  />
                )}
              </Receiver>

              <span className="zenticon zenticon-calendar-o" />
              <span
                onClick={this.onClearInput}
                className="zenticon zenticon-close-circle"
              />
            </div>
          </Popover.Trigger.Click>
          <Popover.Content>{this.renderPicker()}</Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default YearPicker;
