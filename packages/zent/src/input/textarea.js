import React, { Component, PureComponent } from 'react';
import omit from 'lodash/omit';
import cx from 'classnames';

export default class Textarea extends (PureComponent || Component) {
  state = {
    height: 54
  };

  onChange = e => {
    const { autoSize } = this.props.inputProps;
    if (autoSize) {
      const { scrollHeight } = this.textarea;
      this.setState({
        height: scrollHeight
      });
    }
    const { onChange } = this.props.inputProps;
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
          style={{ height: this.state.height }}
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
