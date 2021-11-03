import Input from './Input';
import { DisabledContext } from '../disabled';
import { useState, useCallback, useRef, useEffect } from 'react';

const Password = props => {
  const [visible, setVisible] = useState(false);
  const firstMount = useRef(true);
  const { icon, type, onIconClick, ...restProps } = props;
  const { disabled } = props;
  const inputRef = useRef<any>(undefined);
  const onVisibleChange = useCallback(() => {
    if (disabled) {
      return;
    }
    setVisible(!visible);
  }, [visible, disabled]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      inputRef.current.focus();
    }
  }, [visible]);

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
