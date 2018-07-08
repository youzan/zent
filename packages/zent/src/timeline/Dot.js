import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const TimelineDot = ({ color = '', prefix = 'zent', ...props }) => (
  <div
    {...props}
    className={`${prefix}-timeline-dot`}
    style={{ borderColor: color }}
  />
);

export class TimelineLegend extends Component {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
    prefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
  };

  render() {
    const { color, children, prefix, style, className } = this.props;

    return (
      <div className={`${prefix}-timeline-legend ${className}`} style={style}>
        <div
          className={`${prefix}-timeline-legend-line`}
          style={{ backgroundColor: color }}
        >
          <TimelineDot color={color} prefix={prefix} />
        </div>
        <label className={`${prefix}-timeline-legend-label`}>{children}</label>
      </div>
    );
  }
}
