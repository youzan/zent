import * as React from 'react';
import { Component } from 'react';

export interface ITimelineLegendProps {
  color?: string;
  children?: React.ReactNode;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TimelineDot = ({ color = '', prefix = 'zent', ...props }) => (
  <div
    {...props}
    className={`${prefix}-timeline-dot`}
    style={{ borderColor: color }}
  />
);

export class TimelineLegend extends Component<ITimelineLegendProps> {
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
