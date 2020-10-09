import * as React from 'react';
import cx from 'classnames';
import { autosize, destroy, update } from '../utils/dom/autosize';
import noop from '../utils/noop';
import { ITextAreaProps } from './types';
import { createUseIMEComposition } from '../ime-composition';

export interface ITextAreaState {
  hasFocus: boolean;
}

const useIMEComposition = createUseIMEComposition();

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    const {
      value: valueProp,
      onChange: onChangeProp,
      onCompositionStart: onCompositionStartProp,
      onCompositionEnd: onCompositionEndProp,
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
      maxCharacterCount,
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

    const textareaRef = ref as React.RefObject<HTMLTextAreaElement>;

    React.useLayoutEffect(() => {
      if (!autoSize) {
        return noop;
      }
      const el = textareaRef.current;
      if (!el) {
        return noop;
      }
      autosize(el);
      return () => {
        destroy(el);
      };
    }, [autoSize, textareaRef]);

    React.useLayoutEffect(() => {
      const el = textareaRef.current;
      if (autoSize && el) {
        update(el);
      }
    }, [value, autoSize, textareaRef]);

    const isOutOfRange =
      !!maxCharacterCount && !!value ? value.length > maxCharacterCount : false;
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
          onChange={onChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
        {showCount && (
          <span
            className={cx('zent-textarea-count', {
              'zent-textarea-out-of-range-text': isOutOfRange,
            })}
          >
            {(value || '').length}/{maxLength ?? maxCharacterCount}
          </span>
        )}
      </>
    );
  }
);

TextArea.displayName = 'TextArea';
