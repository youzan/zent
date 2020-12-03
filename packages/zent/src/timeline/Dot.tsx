import { Component } from 'react';
import cx from 'classnames';

export interface ITimelineLegendProps {
  color?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TimelineDot = ({ color = '', ...props }) => (
  <div
    {...props}
    className="zent-timeline-dot"
    style={{ borderColor: color }}
  />
);

export class TimelineLegend extends Component<ITimelineLegendProps> {
  static defaultProps = {
    className: '',
  };

  render() {
    const { color, children, style, className } = this.props;

    return (
      <div className={cx('zent-timeline-legend', className)} style={style}>
        <div
          className="zent-timeline-legend-line"
          style={{ backgroundColor: color }}
        >
          <TimelineDot color={color} />
        </div>
        <label className="zent-timeline-legend-label">{children}</label>
      </div>
    );
  }
}
