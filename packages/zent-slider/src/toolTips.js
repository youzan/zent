import React, { Component } from 'react';
import calssNames from 'zent-utils/classnames';
export default class ToolTips extends Component {
  render() {
    const { left, content, visibility } = this.props;
    const cl = calssNames({ 'toolTips-content': true, 'toolTips-content-hide': !visibility });
    return (<div className="zent-slider-toolTips" style={{ left: `${left}%` }}>
      <div className={cl}>
        <div className="toolTips-inner">{content}</div>
        <i className="toolTips-arrow"></i>
      </div>
      {this.props.children}
    </div>);
  }
}
