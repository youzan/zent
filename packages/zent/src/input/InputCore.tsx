import { forwardRef } from 'react';

import Icon from '../icon';
import { IInputCoreProps } from './types';
import { createUseIMEComposition } from '../ime-composition';
import cx from 'classnames';

function preventDefault(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();
}

const useIMEComposition = createUseIMEComposition();

export const InputCore = forwardRef<
  HTMLInputElement,
  IInputCoreProps & { onClear: React.MouseEventHandler<HTMLElement> }
>((props, ref) => {
  const {
    addonBefore,
    addonAfter,
    showClear,
    value: valueProp,
    onChange: onChangeProp,
    onCompositionStart: onCompositionStartProp,
    onCompositionEnd: onCompositionEndProp,
    onClear,
    width,
    size,
    onPressEnter,
    autoFocus,
    autoSelect,
    initSelectionStart,
    initSelectionEnd,
    icon,
    iconPosition = 'end',
    inline,
    onIconClick,
    ...otherProps
  } = props;

  const { value, onChange, onCompositionStart, onCompositionEnd } =
    useIMEComposition(
      valueProp,
      onChangeProp,
      onCompositionStartProp,
      onCompositionEndProp
    );

  // No clear button when input is disabled or readonly
  const showClearIcon =
    showClear && valueProp && !otherProps.disabled && !otherProps.readOnly;

  const iconClass = cx('zent-input-icon', {
    'zent-input-icon-click': !!onIconClick,
  });

  return (
    <>
      {addonBefore && (
        <div className="zent-input-addon-before">{addonBefore}</div>
      )}
      {icon && iconPosition === 'front' ? (
        <Icon
          className={iconClass}
          type={icon}
          onMouseUp={preventDefault}
          onMouseDown={preventDefault}
          onClick={onIconClick}
        />
      ) : null}
      <input
        {...otherProps}
        ref={ref}
        className="zent-input"
        value={value}
        onChange={onChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
      {showClearIcon && (
        <Icon
          className="zent-input-icon"
          type="close-circle"
          onClick={onClear}
          onMouseDown={preventDefault}
        />
      )}
      {icon && iconPosition === 'end' ? (
        <Icon
          className={iconClass}
          type={icon}
          onMouseUp={preventDefault}
          onMouseDown={preventDefault}
          onClick={onIconClick}
        />
      ) : null}
      {addonAfter && <div className="zent-input-addon-after">{addonAfter}</div>}
    </>
  );
});

InputCore.displayName = 'Input';
