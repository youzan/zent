import React, { Component, PureComponent } from 'react';
import omit from 'lodash/omit';
import cx from 'classnames';

export default class Textarea extends (PureComponent || Component) {
  state = {
    textareaStyle: {}
  };

  onChange = e => {
    const { autoSize, onChange } = this.props.inputProps;
    const { scrollHeight, offsetHeight } = this.textarea;
    if (autoSize) {
      if (this.originalHeight === undefined) {
        this.originalHeight = offsetHeight;
      }
      this.setState({
        textareaStyle: {
          height: scrollHeight,
          minHeight: this.originalHeight
        }
      });
    }
    onChange && onChange(e);
  };

  render() {
    const {
      wrapClass,
      widthStyle,
      prefix,
      handleKeyDown,
      inputRef
    } = this.props;
    let { inputProps } = this.props;
    const { textareaStyle } = this.state;
    const { showCount, value = '', maxLength } = inputProps;
    inputProps = omit(inputProps, [
      'type',
      'showCount',
      'autoSize',
      'onChange'
    ]);
    let currentCount = value.length;
    currentCount = currentCount > maxLength ? maxLength : currentCount;

    return (
      <div className={wrapClass} style={widthStyle}>
        <textarea
          style={textareaStyle}
          ref={ref => {
            inputRef.input = ref;
            this.textarea = ref;
          }}
          className={cx(`${prefix}-textarea`, {
            [`${prefix}-textarea-with-count`]: showCount
          })}
          {...inputProps}
          onChange={this.onChange}
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
