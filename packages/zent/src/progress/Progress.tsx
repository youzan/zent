import * as React from 'react';
import cx from 'classnames';
import { IProgressProps, IProgressInstanceProps } from './types';
import { PROGRESS_STATE } from './constants';
import CircleProgress from './components/CircleProgress';
import LineProgress from './components/LineProgress';
import { ParticalRequired } from '../utils/types';

export const Progress: React.FC<IProgressProps> = (
  props: ParticalRequired<
    IProgressProps,
    'type' | 'percent' | 'showInfo' | 'strokeWidth'
  >
) => {
  const {
    type,
    status,
    percent,
    className,
    normalColor,
    exceptionColor,
    successColor,
    format,
    showInfo,
    strokeWidth,
    width,
    bgColor,
    ...divAttrs
  } = props;

  const state = React.useMemo(() => {
    if (percent < 100 && status === 'exception') {
      return PROGRESS_STATE.EXCEPTION;
    }
    if (percent >= 100) {
      return PROGRESS_STATE.SUCCESS;
    }

    return PROGRESS_STATE.ING;
  }, [status, percent]);

  const currentColor = React.useMemo(() => {
    if (state === PROGRESS_STATE.EXCEPTION) {
      return exceptionColor || normalColor;
    }
    if (state === PROGRESS_STATE.SUCCESS) {
      return successColor;
    }
    return normalColor;
  }, [state]);

  const containerCls = cx(`zent-progress`, `zent-progress-${type}`, className);

  const stateCls = cx({
    ['zent-progress-inprogress']: state === PROGRESS_STATE.ING,
    ['zent-progress-exception']: state === PROGRESS_STATE.EXCEPTION,
    ['zent-progress-success']: state === PROGRESS_STATE.SUCCESS,
  });

  let ProgressComponent: React.ComponentType<IProgressInstanceProps>;

  switch (type) {
    case 'circle':
      ProgressComponent = CircleProgress;
      break;

    case 'line': /* fall through */
    default:
      ProgressComponent = LineProgress;
      break;
  }

  return (
    <div className={containerCls} {...divAttrs}>
      <ProgressComponent
        percent={percent}
        showInfo={showInfo}
        strokeWidth={strokeWidth}
        width={width}
        bgColor={bgColor}
        format={format}
        color={currentColor}
        state={state}
        stateCls={stateCls}
      />
    </div>
  );
};

Progress.defaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  strokeWidth: 10,
};

export default Progress;
