import React, { Component } from 'react';
import classNames from 'classnames';
import Input from 'zent-input';
import Popover from 'zent-popover';

import MonthPanel from './month/MonthPanel';
import PanelFooter from './common/PanelFooter';
import { CURRENT } from './utils/';
import { formatDate, parseDate, maybeFormatDate } from './utils/date';
import PropTypes from 'prop-types';
import { noop } from './constants/';

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
      console.warn('date and format don\'t match.'); // eslint-disable-line
      showPlaceholder = true;
      selected = actived = new Date();
    }
  } else {
    showPlaceholder = true;
    if (defaultValue) {
      actived = defaultValue;
    } else {
      actived = new Date();
    }
    selected = actived = maybeFormatDate(actived, format);
  }

  return {
    value: formatDate(selected, format),
    actived,
    selected,
    openPanel: false,
    showPlaceholder
  };
}

class MonthPicker extends Component {
  static PropTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    format: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    prefix: 'zent',
    className: '',
    placeholder: '请选择月份',
    confirmText: '确认',
    format: 'YYYY-MM',
    onChange: noop
  }

  constructor(props) {
    super(props);
    this.state = extractStateFromProps(props);
  }

  componentWillReceiveProps(next) {
    const state = extractStateFromProps(next);
    this.setState(state);
  }

  clickOutside = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  }

  onChangeMonth = (val) => {
    this.setState({
      actived: val
    });
  }

  onSelectMonth = (val) => {
    const { onClick } = this.props;
    this.setState({
      selected: val,
      actived: val
    });

    onClick && onClick(val);
  }

  onClickInput = () => {
    if (this.props.disabled) return;
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  onClearInput = (evt) => {
    evt.stopPropagation();
    this.props.onChange('');
  }

  onConfirm = () => {
    const { format } = this.props;
    const { selected } = this.state;
    const value = formatDate(selected, format);

    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    this.props.onChange(value);
  }

  renderPicker() {
    const state = this.state;
    const props = this.props;

    let monthPicker;
    if (state.openPanel) {
      monthPicker = (
        <div className="month-picker" ref={ref => this.picker = ref}>
          <MonthPanel
            actived={state.actived}
            selected={state.selected}
            onChange={this.onChangeMonth}
            onSelect={this.onSelectMonth}
          />
          <PanelFooter
            buttonText={props.confirmText}
            linkText="当前月"
            linkCls="link--current"
            onClickLink={() => this.onSelectMonth(CURRENT)}
            onClickButton={this.onConfirm}
          />
        </div>
      );
    }

    return monthPicker;
  }

  togglePicker = () => {
    const { onOpen, onClose } = this.props;
    const openPanel = !this.state.openPanel;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
      openPanel: !this.state.openPanel
    });
  }

  render() {
    const state = this.state;
    const props = this.props;
    const wrapperCls = `${props.prefix}-datetime-picker ${props.className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--filled': !state.showPlaceholder,
      'picker-input--disabled': props.disabled
    });

    return (
      <div className={wrapperCls}>
        <Popover
          cushion={5}
          visible={state.openPanel}
          onVisibleChange={this.togglePicker}
          className={`${props.prefix}-datetime-picker-popover ${props.className}-popover`}
          position={Popover.Position.AutoBottomLeft}
        >
          <Popover.Trigger.Click>
            <div className={inputCls} onClick={this.onClickInput}>
              <Input
                value={state.showPlaceholder ? props.placeholder : state.value}
                onChange={noop}
                disabled={props.disabled}
              />

              <span className="zenticon zenticon-calendar-o"></span>
              <span onClick={this.onClearInput} className="zenticon zenticon-close-circle"></span>
            </div>
          </Popover.Trigger.Click>
          <Popover.Content>
            {this.renderPicker()}
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default MonthPicker;
