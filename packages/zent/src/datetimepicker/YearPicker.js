import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import Input from 'input';
import Popover from 'popover';
import formatDate from 'zan-utils/date/formatDate';
import parseDate from 'zan-utils/date/parseDate';
import getWidth from 'utils/getWidth';

import YearPanel from './year/YearPanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT } from './utils/';
import { dayStart } from './utils/date';
import {
  noop,
  popPositionMap,
  commonProps,
  commonPropTypes
} from './constants/';

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
  static PropTypes = {
    ...commonPropTypes
  };

  static defaultProps = {
    ...commonProps,
    placeholder: '请选择年',
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
    const { props: { needConfirm, onChange }, state: { actived } } = this;
    const acp = new Date(actived);
    acp.setFullYear(val);

    if (!needConfirm) {
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
    this.props.onChange('');
  };

  onConfirm = () => {
    const { props, state } = this;

    let value = '';
    if (state.selected) {
      value = formatDate(state.selected, props.format);
    }

    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    this.props.onChange(value);
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
        <div className="year-picker" ref={ref => (this.picker = ref)}>
          <YearPanel
            actived={state.actived}
            selected={state.selected}
            onChange={this.onChangeYear}
            onSelect={this.onSelectYear}
            disabledDate={this.isDisabled}
          />
          {props.needConfirm && (
            <PanelFooter
              buttonText={props.confirmText}
              linkText="今年"
              linkCls="link--current"
              onClickLink={() => this.onSelectYear(CURRENT)}
              onClickButton={this.onConfirm}
            />
          )}
        </div>
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
    const { props, state } = this;
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });
    const widthStyle = getWidth(props.width);

    return (
      <div style={widthStyle} className={wrapperCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={popPositionMap[props.popPosition.toLowerCase()]}
        >
          <Popover.Trigger.Click>
            <div style={widthStyle} className={inputCls}>
              <Input
                name={props.name}
                value={state.showPlaceholder ? props.placeholder : state.value}
                onChange={noop}
                disabled={props.disabled}
              />

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
