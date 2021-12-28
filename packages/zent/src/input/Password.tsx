import Input from './Input';
import { useState, useCallback } from 'react';
import { IInputCoreProps } from './types';

export const Password = (props: IInputCoreProps) => {
  const [visible, setVisible] = useState(false);
  const { icon, type, onIconClick, ...restProps } = props;
  const { disabled } = props;
  const onVisibleChange = useCallback(() => {
    if (disabled) {
      return;
    }
    setVisible(!visible);
  }, [visible, disabled]);

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
