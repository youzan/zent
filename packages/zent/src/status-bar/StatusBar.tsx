import { FC } from 'react';
import cx from 'classnames';
import { IAlertProps, Alert } from '../alert';

export type StatusBarType = 'info' | 'waiting' | 'success' | 'error';

export interface IStatusBarProps extends Omit<IAlertProps, 'type'> {
  type?: StatusBarType;
}

const TypePropsMap: Record<StatusBarType, Partial<IAlertProps>> = {
  info: {
    type: 'info',
  },
  waiting: {
    type: 'info',
    loading: true,
  },
  success: {
    type: 'success',
  },
  error: {
    type: 'error',
  },
};

export const StatusBar: FC<React.PropsWithChildren<IStatusBarProps>> = ({
  type = 'info',
  progress,
  className,
  closable = true,
  ...rest
}) => {
  const typeProps = TypePropsMap[type];
  const taskProgress = type === 'waiting' ? progress : 0;
  const statusBarClassName = cx('zent-status-bar', className);

  return (
    <Alert
      className={statusBarClassName}
      {...typeProps}
      {...rest}
      closable={closable}
      progress={taskProgress}
    />
  );
};
export default StatusBar;
