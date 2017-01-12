import React, { Component } from 'react';
import classNames from 'classnames';
import TimeSelect from './TimeSelect';
import { CURRENT, padLeft } from '../utils';

export default class SecondsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({
      scrollTop: this.props.selected.getSeconds() * 20
    });
  }
  componentWillReceiveProps(next) {
    if ('selected' in next) {
      this.setState({
        scrollTop: next.selected.getSeconds() * 20
      });
    }
  }
  isDisabled(val) {
    const { disabledSecond } = this.props;
    if (typeof disabledSecond === 'function') {
      return disabledSecond(val);
    }
  }
  isSelected(val) {
    const selected = this.props.selected;
    return selected.getSeconds() === val;
  }
  isCurrent(val) {
    return CURRENT.getSeconds() === val;
  }
  getSeconds() {
    let cells = [];
    for (let i = 0; i < 60; i++) {
      const isDisabled = this.isDisabled(i);
      const isSelected = this.isSelected(i);
      const isCurrent = this.isCurrent(i);
      let className = classNames({
        'time-panel__cell': true,
        'time-panel__cell--disabled': isDisabled,
        'time-panel__cell--selected': isSelected,
        'time-panel__cell--current': isCurrent
      });
      cells.push({
        text: padLeft(i),
        value: i,
        isDisabled,
        className
      });
    }
    return cells;
  }
  render() {
    const { onSelect } = this.props;
    const { scrollTop } = this.state;
    const seconds = this.getSeconds();
    return (
      <div className="second-select time-select">
        <TimeSelect scrollTop={scrollTop} onSelect={onSelect} cells={seconds} />
      </div>
    );
  }
}
