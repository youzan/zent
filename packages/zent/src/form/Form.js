/**
 * The design of this component is broken. Data flow becomes more and more complex
 * when supporting advanced features like FieldArray.
 * It will eventually become unmaintainable.
 *
 * A real-life case for 'premature optimization is the root of all evil'.
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

class Form extends PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    inline: PropTypes.bool,
    vertical: PropTypes.bool,
    onSubmit: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.object,
    disableEnterSubmit: PropTypes.bool,
  };

  static defaultProps = {
    prefix: 'zent',
    onSubmit: noop,
    disableEnterSubmit: true,
  };

  onKeyDown = event => {
    // 默认禁止输入框回车触发表单提交事件
    const isFromInput = event.target.tagName === 'INPUT';

    if (isFromInput && this.props.disableEnterSubmit && event.keyCode === 13) {
      event.preventDefault();
    }
  };

  render() {
    const {
      prefix,
      className,
      style,
      horizontal,
      inline,
      onSubmit,
    } = this.props;
    const formClassName = classNames({
      [`${prefix}-form`]: true,
      [`${prefix}-form--horizontal`]: horizontal,
      [`${prefix}-form--inline`]: inline,
      [`${prefix}-form--vertical`]: !horizontal && !inline,
      [className]: !!className,
    });
    return (
      <form
        className={formClassName}
        style={style}
        onSubmit={onSubmit}
        onKeyDown={this.onKeyDown}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
