import { useMemo, FC } from 'react';
import { Icon } from '../icon';
import { IAlertProps, Alert } from '../alert';

export type PromptType = 'warning' | 'strongHint' | 'weakHint';

export type IPromptProps = IAlertProps & {
  type: PromptType;
};

const promptTypePropsMap: Record<PromptType, Partial<IAlertProps>> = {
  warning: {
    type: 'warning',
  },
  strongHint: {
    type: 'warning',
    style: { background: '#f7f7f7' },
  },
  weakHint: {
    icon: <Icon type="help-circle" style={{ color: '#c5c5c5' }} />,
    style: { background: '#f7f7f7' },
  },
};

export const Prompt: FC<IPromptProps> = ({
  title,
  style = {},
  type = 'warning',
  ...resetProps
}) => {
  const alertProps: Partial<IAlertProps> = useMemo(
    () => promptTypePropsMap[type] || {},
    [type]
  );

  const { style: promptStyle = {} } = alertProps;

  return (
    <Alert
      {...alertProps}
      {...resetProps}
      style={{ ...style, ...promptStyle }}
    />
  );
};

export default Prompt;
