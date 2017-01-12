import React, { Component } from 'react';

export default class TimeSelect extends Component {
  componentDidMount() {
    this.selectElm.scrollTop = this.props.scrollTop;
  }
  componentWillReceiveProps(next) {
    this.selectElm.scrollTop = next.scrollTop;
  }
  onClickCell = (cell) => {
    const { value, isDisabled } = cell;
    if (isDisabled) return;
    this.selectElm.scrollTop = value * 20;
    this.props.onSelect(value);
  }
  render() {
    const { cells } = this.props;
    let lis = cells.map(cell => {
      return (
        <li key={cell.value} className={cell.className} onClick={() => this.onClickCell(cell)}>{cell.text}</li>
      );
    });
    return (
      <div ref={(elm) => this.selectElm = elm} className="time-select-wrapper">
        <ul>
          {lis}
        </ul>
      </div>
    );
  }
}
