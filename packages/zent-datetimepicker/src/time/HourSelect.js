import React, { Component } from 'react';
import classNames from 'classnames';
import TimeSelect from './TimeSelect';
import { CURRENT, padLeft } from '../utils';

export default class HourSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({
      scrollTop: this.props.selected.getHours() * 20
    });
  }
  componentWillReceiveProps(next) {
    if ('selected' in next) {
      this.setState({
        scrollTop: next.selected.getHours() * 20
      });
    }
  }
  isDisabled(val) {
    const { disabledHour } = this.props;
    if (typeof disabledHour === 'function') {
      return disabledHour(val);
    }
  }
  isSelected(val) {
    const { selected } = this.props;
    return selected.getHours() === val;
  }
  isCurrent(val) {
    return CURRENT.getHours() === val;
  }
  getHours() {
    let cells = [];
    for (let i = 0; i < 24; i++) {
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
    const hours = this.getHours();
    return (
      <div className="hour-select time-select">
        <TimeSelect scrollTop={scrollTop} onSelect={onSelect} cells={hours} />
      </div>
    );
  }
}
