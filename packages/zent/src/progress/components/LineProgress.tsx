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
    stateCls,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.LINE;

  return (
    <div className={stateCls}>
      <div
        className={`zent-progress-wrapper`}
        style={{
          background: bgColor,
          width: progressWidth,
          height: strokeWidth,
          borderRadius: strokeWidth,
        }}
      >
        <div
          className={`zent-progress-inner`}
          style={{
            background: color,
            width: `${percent}%`,
            height: strokeWidth,
            borderRadius: strokeWidth,
          }}
        />
      </div>
      {showInfo && (
        <div className={`zent-progress-info`} style={{ color }}>
          <ProgressInfo
            type="line"
            percent={percent}
            format={format}
            state={state}
          />
        </div>
      )}
    </div>
  );
};

export default LineProgress;
