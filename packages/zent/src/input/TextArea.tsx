import * as React from 'react';
import cx from 'classnames';
const autosize = require('autosize');
import noop from 'lodash-es/noop';
import { ITextAreaProps } from './types';

export interface ITextAreaState {
  hasFocus: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    const {
      value,
      autoSize,
      showCount,
      maxLength,
      width,
      size,
      onPressEnter,
      autoFocus,
      autoSelect,
      initSelectionStart,
      initSelectionEnd,
      inline,
      ...otherProps
    } = props;
    React.useLayoutEffect(() => {
      if (!autoSize) {
        return noop;
      }
      const el = (ref as React.RefObject<HTMLTextAreaElement>).current;
      if (!el) {
        return noop;
      }
      autosize(el);
      return () => {
        autosize.destroy(el);
      };
    }, [autoSize, ref]);
    return (
      <>
        <textarea
          {...otherProps}
          ref={ref}
          className={cx('zent-textarea', {
            'zent-textarea-with-count': showCount,
          })}
          value={value}
          maxLength={maxLength}
        />
        {showCount && (
          <span className="zent-textarea-count">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </>
    );
  }
);

TextArea.displayName = 'TextArea';
