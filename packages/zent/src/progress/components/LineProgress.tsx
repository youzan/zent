import cx from 'classnames';
import { DEFAULT_WIDTH } from '../constants';
import ProgressInfo from './ProgressInfo';
import { IProgressInstanceProps } from '../types';
import { FC, PropsWithChildren } from 'react';

const LineProgress: FC<PropsWithChildren<IProgressInstanceProps>> = props => {
  const {
    format,
    width,
    percent,
    showInfo,
    strokeWidth,
    bgColor,
    color,
    state,
    strokeLinecap,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.LINE;

  const progressInfo = showInfo && (
    <div className="zent-progress-info">
      <ProgressInfo
        type="line"
        percent={percent}
        format={format}
        state={state}
        color={color}
      />
    </div>
  );

  return (
    <div className="zent-progress-container">
      <div
        className={cx(
          'zent-progress-wrapper',
          `zent-progress-wrapper--${strokeLinecap}`,
          {
            'zent-progress-wrapper--finished': percent === 100,
          }
        )}
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
