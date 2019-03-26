import React, { PureComponent } from 'react';
import omit from 'lodash/omit';
import cx from 'classnames';
import autosize from 'autosize';

export default class Textarea extends PureComponent {
  componentDidMount() {
    const { autoSize } = this.props.inputProps;
    autoSize && autosize(this.textarea);
  }

  componentWillUnmount() {
    const { autoSize } = this.props.inputProps;
    autoSize && autosize.destroy(this.textarea);
  }

  render() {
    const {
      wrapClass,
      widthStyle,
      prefix,
      handleKeyDown,
      inputRef,
    } = this.props;
    let { inputProps } = this.props;
    const { showCount, value = '', maxLength } = inputProps;
    inputProps = omit(inputProps, ['type', 'showCount', 'autoSize']);
    let currentCount = value.length;
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
