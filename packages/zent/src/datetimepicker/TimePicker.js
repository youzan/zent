import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';
import { TimePicker as I18nDefault } from 'i18n/default';

import { formatDate } from './utils';
import TimePanel from './time/TimePanel';
import PanelFooter from './common/PanelFooter';
import clickOutside from './utils/clickOutside';
import { TIME_PROPS } from './constants';

class TimePicker extends (PureComponent || Component) {
  static defaultProps = TIME_PROPS;

  constructor(props) {
    super(props);
    let showPlaceholder;
    let selected;
    if (props.value) {
      showPlaceholder = false;
      selected = new Date(props.value);
    } else {
      showPlaceholder = true;
      selected = new Date();
    }
    this.state = {
      value: formatDate(selected, props.format),
      actived: selected,
      selected,
      openPanel: false,
      showPlaceholder
    };
  }

  clickOutside = e => {
    if (!this.picker.contains(e.target)) {
      this.setState({
        openPanel: false
      });
    }
  };

  onChangeTime = val => {
    this.setState({
      actived: val
    });
  };

  onSelectCurrent = () => {
    this.setState({
      actived: new Date()
    });
  };

  onClickInput = () => {
    this.setState({
      openPanel: !this.state.openPanel
    });
  };

  onConfirm = () => {
    const value = formatDate(this.state.actived, this.props.format);
    this.setState({
      value,
      openPanel: false,
      showPlaceholder: false
    });
    this.props.onChange(value);
  };

  render() {
    const {
      props: { className, disabledTime, format, placeholder, prefix },
      state: { actived, openPanel, showPlaceholder, value }
    } = this;
    const prefixCls = `${prefix}-datetime-picker ${className}`;
    const inputCls = classNames({
      'picker-input': true,
      'picker-input--empty': showPlaceholder
    });
    let timePicker;
    if (openPanel) {
      timePicker = (
        <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
          {i18n => (
            <div className="time-picker">
              <TimePanel
                actived={actived}
                format={format}
                disabledTime={disabledTime()}
                onChange={this.onChangeTime}
                i18n={i18n}
              />
              <PanelFooter
                linkText={i18n.current.time}
                linkCls="link--current"
                onClickLink={this.onSelectCurrent}
                onClickButton={this.onConfirm(i18n)}
              />
            </div>
          )}
        </Receiver>
      );
    }
    return (
      <div className={prefixCls} ref={ref => (this.picker = ref)}>
        <div className="picker-wrapper">
          <div className={inputCls} onClick={this.onClickInput}>
            {showPlaceholder ? placeholder : value}
          </div>
          {openPanel ? timePicker : ''}
        </div>
      </div>
    );
  }
}

export default clickOutside(TimePicker);
