import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';

export default class ToolTips extends PureComponent<any> {
  render() {
    const { left, content, visibility, prefix } = this.props;
    const cl = classNames({
      'toolTips-content': true,
      'toolTips-content-hide': !visibility,
    });
    return (
      <div className={`${prefix}-slider-toolTips`} style={{ left: `${left}%` }}>
        <div className={cl}>
          <div className="toolTips-inner">{content}</div>
          <i className="toolTips-arrow" />
        </div>
        {this.props.children}
      </div>
    );
  }
}
