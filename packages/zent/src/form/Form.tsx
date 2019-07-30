/**
 * The design of this component is broken. Data flow becomes more and more complex
 * when supporting advanced features like FieldArray.
 * It will eventually become unmaintainable.
 *
 * A real-life case for 'premature optimization is the root of all evil'.
 */

import { PureComponent } from 'react';
import * as React from 'react';
import classNames from 'classnames';
import noop from 'lodash-es/noop';

export interface IFormProps {
  className?: string;
  prefix?: string;
  vertical?: boolean;
  horizontal?: boolean;
  inline?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  style?: React.CSSProperties;
  disableEnterSubmit?: boolean;
}

class Form extends PureComponent<IFormProps> {
  static defaultProps = {
    prefix: 'zent',
    onSubmit: noop,
    disableEnterSubmit: true,
  };

  onKeyDown = event => {
    // 默认禁止输入框回车触发表单提交事件
    const isFromInput = event.target.tagName === 'INPUT';

    if (isFromInput && this.props.disableEnterSubmit && event.key === 'Enter') {
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
