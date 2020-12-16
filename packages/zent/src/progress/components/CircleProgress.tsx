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
          width: progressWidth,
          height: progressWidth,
        }}
      />
      <svg
        className="zent-progress-inner"
        viewBox={`0 0 ${progressWidth} ${progressWidth}`}
        width={progressWidth}
        height={progressWidth}
      >
        {/*
          This g element fixes https://github.com/youzan/zent/issues/1209

          With Safari:
          1. We can't rotate on the circle, it breaks when zoom in/out
          2. transform-origin with a value of `center` or `50%` won't work

          So we rotate on the g with absolute origin values
         */}
        <g transform={`rotate(-90 ${mid} ${mid})`}>
          <circle
            className="zent-progress-inner-path"
            cx={mid}
            cy={mid}
            r={radius}
            style={{ stroke: color, strokeWidth }}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </g>

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
