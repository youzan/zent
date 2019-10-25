import * as React from 'react';

import Icon from '../icon';
import { IInputCoreProps } from './types';
import { createUseIMEComposition } from '../ime-composition';

function preventDefault(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();
}

const useIMEComposition = createUseIMEComposition();

export const InputCore = React.forwardRef<
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
    inline,
    onIconClick,
    ...otherProps
  } = props;

  const {
    value,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  } = useIMEComposition(
    valueProp,
    onChangeProp,
    onCompositionStartProp,
    onCompositionEndProp
  );

  return (
    <>
      {addonBefore && (
        <div className="zent-input-addon-before">{addonBefore}</div>
      )}
      <input
        {...otherProps}
        ref={ref}
        className="zent-input"
        value={value}
        onChange={onChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
      {showClear && valueProp && (
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
