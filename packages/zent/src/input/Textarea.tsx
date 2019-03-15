import * as React from 'react';
import { Component } from 'react';
import omit from 'lodash-es/omit';
import cx from 'classnames';
import * as autosize from 'autosize';

import { Input } from './Input';

export interface ITextAreaProps {
  wrapClass?: string;
  widthStyle?: React.CSSProperties;
  prefix?: string;
  handleKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  inputRef: Input;
  inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  autoSize?: boolean;
  showCount?: boolean;
}

export default class Textarea extends Component<ITextAreaProps> {
  textarea: HTMLTextAreaElement;

  componentDidMount() {
    const { autoSize } = this.props;
    autoSize && autosize(this.textarea);
  }

  componentWillUnmount() {
    const { autoSize } = this.props;
    autoSize && autosize.destroy(this.textarea);
  }

  render() {
    const {
      wrapClass,
      widthStyle,
      prefix,
      handleKeyDown,
      inputRef,
      showCount,
    } = this.props;
    let { inputProps } = this.props;
    const { value = '', maxLength } = inputProps;
    inputProps = omit(inputProps, ['type', 'showCount', 'autoSize']);
    let currentCount = (value as string).length;
    currentCount = currentCount > maxLength ? maxLength : currentCount;

    return (
      <div className={wrapClass} style={widthStyle}>
        <textarea
          ref={ref => {
            inputRef.input = ref;
            this.textarea = ref;
          }}
          className={cx(`${prefix}-textarea`, {
            [`${prefix}-textarea-with-count`]: showCount,
          })}
          {...inputProps}
          onKeyDown={handleKeyDown}
        />
        {showCount && (
          <span className={`${prefix}-textarea-count`}>
            {currentCount}/{maxLength}
          </span>
        )}
      </div>
    );
  }
}
