import * as React from 'react';

import Icon from '../icon';
import { IInputCoreProps } from './types';

function preventDefault(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();
}

export const InputCore = React.forwardRef<
  HTMLInputElement,
  IInputCoreProps & { onClear: React.MouseEventHandler<HTMLElement> }
>((props, ref) => {
  const {
    addonBefore,
    addonAfter,
    showClear,
    value,
    onClear,
    width,
    size,
    onPressEnter,
    autoFocus,
    autoSelect,
    initSelectionStart,
    initSelectionEnd,
    icon,
    inline,
    onIconClick,
    ...otherProps
  } = props;
  return (
    <>
      {addonBefore && (
        <div className="zent-input-addon-before">{addonBefore}</div>
      )}
      <input {...otherProps} ref={ref} className="zent-input" value={value} />
      {showClear && value && (
        <Icon
          className="zent-input-close"
          type="close-circle"
          onClick={onClear}
          onMouseDown={preventDefault}
        />
      )}
      {icon ? (
        <Icon className="zent-input-icon" type={icon} onClick={onIconClick} />
      ) : null}
      {addonAfter && <div className="zent-input-addon-after">{addonAfter}</div>}
    </>
  );
});

InputCore.displayName = 'Input';
