import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import YearPanelBody from './YearPanelBody';
import { goYears } from '../utils';

function noop() { }

export default class YearPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activedYear: props.actived
    };
  }
  prevYears = () => {
    let prev = goYears(this.state.activedYear, -12);
    this.setState({
      activedYear: prev
    });
  }
  nextYears = () => {
    let next = goYears(this.state.activedYear, 12);
    this.setState({
      activedYear: next
    });
  }
  onSelectYear = (val) => {
    this.props.onSelect(val);
  }
  render() {
    const state = this.state;
    const props = this.props;
    const currentYear = parseInt(state.activedYear.getFullYear(), 10);
    const title = `${currentYear - 4}~${currentYear + 7}`;
    return (
      <div className="year-panel">
        <PanelHeader
          title={title}
          onClick={noop}
          prev={this.prevYears}
          next={this.nextYears}
          />
        <YearPanelBody
          actived={state.activedYear}
          selected={props.selected}
          max={props.max}
          min={props.min}
          onSelect={this.onSelectYear}
          />
      </div>
    );
  }
}
