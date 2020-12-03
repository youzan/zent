import { useMemo } from 'react';
import cx from 'classnames';
import {
  IProgressProps,
  IProgressInstanceProps,
  IProgressStatus,
} from './types';
import { defaultFormat, avaliableStatus } from './constants';
import CircleProgress from './components/CircleProgress';
import LineProgress from './components/LineProgress';
import { PartialRequired } from '../utils/types';

export const Progress: React.FC<IProgressProps> = props => {
  const {
    type,
    status,
    percent,
    className,
    normalColor,
    successColor,
    exceptionColor,
    bgColor,
    format,
    showInfo,
    strokeWidth,
    width,
    ...divAttrs
  } = props as PartialRequired<
    React.PropsWithChildren<IProgressProps>,
    'type' | 'percent' | 'showInfo' | 'strokeWidth' | 'format'
  >;

  // 计算 progress 状态
  const state = useMemo<IProgressStatus>(() => {
    if (avaliableStatus.indexOf(status) !== -1) {
      return status;
    }
    return percent >= 100 ? 'success' : 'normal';
  }, [status, percent]);

  // 计算需要显示的颜色
  const currentColor = {
    exception: exceptionColor,
    success: successColor,
    normal: normalColor,
  }[state];

  // 百分比范围
  const percentValue = useMemo<number>(() => {
    if (percent < 0) {
      return 0;
    }
    if (percent > 100) {
      return 100;
    }
    return percent;
  }, [percent]);

  // 判断使用哪种类型的进度条
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

  const containerCls = cx(
    'zent-progress',
    `zent-progress-type__${type}`,
    `zent-progress-state__${state}`,
    className
  );

  return (
    <div className={containerCls} {...divAttrs}>
      <ProgressComponent
        percent={percentValue}
        showInfo={showInfo}
        strokeWidth={strokeWidth}
        width={width}
        bgColor={bgColor}
        format={format}
        color={currentColor}
        state={state}
      />
    </div>
  );
};

Progress.defaultProps = {
  type: 'line',
  percent: 0,
  showInfo: true,
  strokeWidth: 10,
  format: defaultFormat,
};

export default Progress;
