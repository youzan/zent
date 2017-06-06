import React, { Component, PureComponent } from 'react';
import { YearPanel } from './year/YearPanel';

export default class YearPicker extends (PureComponent || Component) {
  prev() {}
  next() {}
  render() {
    return (
      <div className="year-picker">
        <YearPanel />
      </div>
    );
  }
}
