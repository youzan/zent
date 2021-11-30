import Input from './Input';
import { useState, useCallback } from 'react';

export const Password = props => {
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
      icon={visible ? 'eye-o' : 'closed-eye'}
      onIconClick={onVisibleChange}
      {...restProps}
    />
  );
};

Password.displayName = 'ZentPassword';

export default Password;
