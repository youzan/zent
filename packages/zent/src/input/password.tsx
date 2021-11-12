import Input from './Input';
import { DisabledContext } from '../disabled';
import { useState, useCallback, useRef } from 'react';

const Password = props => {
  const [visible, setVisible] = useState(false);
  const { icon, type, onIconClick, ...restProps } = props;
  const { disabled } = props;
  const inputRef = useRef<any>(undefined);
  const onVisibleChange = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (disabled) {
        return;
      }
      setVisible(!visible);
    },
    [visible, disabled]
  );

  const renderPassword = () => {
    return (
      <Input
        type={visible ? 'text' : 'password'}
        icon={visible ? 'eye-o' : 'closed-eye'}
        onIconClick={onVisibleChange}
        ref={inputRef}
        {...restProps}
      />
    );
  };

  return <DisabledContext.Consumer>{renderPassword}</DisabledContext.Consumer>;
};

Password.displayName = 'ZentPassort';
Password.defaultProps = {
  type: 'text',
  size: 'normal',
};

export default Password;
