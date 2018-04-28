import React from 'react';

export const TimelineDot = ({ color = '', prefix = 'zent' }) => (
  <div className={`${prefix}-timeline-dot`} style={{ borderColor: color }} />
);

export const TimelineSample = ({ color, children, prefix = 'zent' }) => (
  <div className={`${prefix}-timeline-sample`}>
    <div
      className={`${prefix}-timeline-sample-line`}
      style={{ backgroundColor: color }}
    >
      <TimelineDot color={color} prefix={prefix} />
    </div>
    <label className={`${prefix}-timeline-sample-label`}>{children}</label>
  </div>
);

export default TimelineDot;
