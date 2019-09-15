import * as React from 'react';
import { IProgressInstanceProps } from '../types';
import { DEFAULT_WIDTH } from '../constants';
import AnimatedArc from './AnimatedArc';
import ProgressInfo from './ProgressInfo';

const CircleProgress: React.FC<IProgressInstanceProps> = props => {
  const {
    percent,
    showInfo,
    format,
    strokeWidth,
    width,
    bgColor,
    color,
    state,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.CIRCLE;
  const mid = progressWidth / 2;
  const diameter = progressWidth - strokeWidth;
  const radius = diameter / 2;
  const circumference = diameter * Math.PI;
  const offset = (circumference * (100 - percent)) / 100;

  return (
    <div
      className="zent-progress-container"
      style={{
        width: progressWidth,
        height: progressWidth,
      }}
    >
      <div
        className="zent-progress-wrapper"
        style={{
          borderWidth: strokeWidth,
          borderColor: bgColor,
        }}
      />
      <svg className="zent-progress-inner">
        <circle
          className="zent-progress-inner-path"
          cx={mid}
          cy={mid}
          r={radius}
          style={{
            stroke: color,
            strokeWidth,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
        {state === 'normal' && (
          <AnimatedArc
            className="zent-progress-path-mask"
            radius={radius}
            arcLength={circumference - offset}
            strokeWidth={strokeWidth}
          />
        )}
      </svg>
      {showInfo && (
        <div
          className="zent-progress-info"
          style={{
            lineHeight: `${progressWidth}px`,
            color,
          }}
        >
          <ProgressInfo
            type="circle"
            percent={percent}
            format={format}
            state={state}
          />
        </div>
      )}
    </div>
  );
};

export default CircleProgress;
