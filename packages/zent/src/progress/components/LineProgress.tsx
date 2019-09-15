import * as React from 'react';
import { DEFAULT_WIDTH } from '../constants';
import ProgressInfo from './ProgressInfo';
import { IProgressInstanceProps } from '../types';

const LineProgress: React.FC<IProgressInstanceProps> = props => {
  const {
    format,
    width,
    percent,
    showInfo,
    strokeWidth,
    bgColor,
    color,
    state,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.LINE;

  const progressInfo = showInfo && (
    <div className="zent-progress-info" style={{ color }}>
      <ProgressInfo
        type="line"
        percent={percent}
        format={format}
        state={state}
      />
    </div>
  );

  return (
    <div className="zent-progress-container">
      <div
        className="zent-progress-wrapper"
        style={{
          background: bgColor,
          width: progressWidth,
          height: strokeWidth,
        }}
      >
        <div
          className="zent-progress-inner"
          style={{
            background: color,
            width: `${percent}%`,
            height: strokeWidth,
          }}
        />
      </div>
      {progressInfo}
    </div>
  );
};

export default LineProgress;
