import * as React from 'react';
import { IProgressInfoProps } from '../types';
import { Icon } from '../../icon';
import { PROGRESS_STATE } from '../constants';

const ProgressInfo: React.FC<IProgressInfoProps> = props => {
  const { type, percent, format, state } = props;

  if (format) {
    return <>{format(percent)}</>;
  }

  if (state === PROGRESS_STATE.SUCCESS) {
    return <Icon type={type === 'circle' ? 'check' : 'check-circle'} />;
  }

  if (state === PROGRESS_STATE.EXCEPTION) {
    return <Icon type={type === 'circle' ? 'close' : 'close-circle'} />;
  }

  return <>{percent}%</>;
};

export default ProgressInfo;
