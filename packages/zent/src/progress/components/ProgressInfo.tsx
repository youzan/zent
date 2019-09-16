import * as React from 'react';
import { IProgressInfoProps } from '../types';
import { Icon } from '../../icon';

const ProgressInfo: React.FC<IProgressInfoProps> = props => {
  const { type, percent, format, state } = props;

  if (state === 'success') {
    return <Icon type={type === 'circle' ? 'check' : 'check-circle'} />;
  }

  if (state === 'exception') {
    return <Icon type={type === 'circle' ? 'close' : 'close-circle'} />;
  }

  return <>{format(percent)}</>;
};

export default ProgressInfo;
