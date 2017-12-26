import React, { Component, PureComponent } from 'react';
import omit from 'lodash/omit';
import cx from 'classnames';

export default class Textarea extends (PureComponent || Component) {
  state = {};

  onChange = e => {
    const { autoSize, onChange } = this.props.inputProps;
    if (autoSize) {
      const { scrollHeight } = this.textarea;
      this.setState({
        height: scrollHeight
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
    const { height } = this.state;
    const { showCount, value = '', maxLength } = inputProps;
    inputProps = omit(inputProps, [
      'type',
      'showCount',
      'autoSize',
      'onChange'
    ]);
    let currentCount = value.length;
    currentCount = currentCount > maxLength ? maxLength : currentCount;
    const textareaStyle = {};

    height && (textareaStyle.height = height);

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
