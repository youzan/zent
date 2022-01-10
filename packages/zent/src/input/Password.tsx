import Input from './Input';
import { useState, useCallback } from 'react';
import { IInputCoreProps } from './types';

export type IPasswordProps = Omit<IInputCoreProps, 'icon' | 'type'>;

export const Password = (props: IPasswordProps) => {
  const [visible, setVisible] = useState(false);
  const { onIconClick, ...restProps } = props;
  const { disabled } = props;
  const onVisibleChange = useCallback(
    e => {
      if (disabled) {
        return;
      }
      setVisible(!visible);
      onIconClick?.(e);
    },
    [visible, disabled, onIconClick]
  );

  return (
    <Input
      type={visible ? 'text' : 'password'}
      icon={visible ? 'eye' : 'closed-eye'}
      onIconClick={onVisibleChange}
      {...restProps}
    />
  );
};

Password.displayName = 'ZentPassword';

export default Password;
