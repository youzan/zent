import { FC } from 'react';
import { IAlertProps, Alert } from '../alert';

export type TaskStatusBarType = 'info' | 'waiting' | 'success' | 'error';

export interface ITaskStatusBarProps extends Omit<IAlertProps, 'type'> {
  type?: TaskStatusBarType;
}

const TypePropsMap: Record<TaskStatusBarType, Partial<IAlertProps>> = {
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

export const TaskStatusBar: FC<ITaskStatusBarProps> = ({
  type = 'info',
  progress,
  ...rest
}) => {
  const typeProps = TypePropsMap[type];
  const taskProgress = type === 'waiting' ? progress : 0;

  return <Alert {...typeProps} {...rest} progress={taskProgress} />;
};
export default TaskStatusBar;
