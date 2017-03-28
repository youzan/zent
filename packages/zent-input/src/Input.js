import React, { Component, PropTypes } from 'react';
import classNames from 'zent-utils/classnames';
import omit from 'zent-utils/lodash/omit';

export default class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    onPressEnter: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'zent',
    type: 'text'
  }

  handleKeyDown = evt => {
    const { onKeyDown, onPressEnter } = this.props;
    if (onPressEnter && evt.keyCode === 13) {
      onPressEnter(evt);
    }

    if (onKeyDown) onKeyDown(evt);
  }

  render() {
    const { addonBefore, addonAfter, prefix, className, type } = this.props;
    const isTextarea = type.toLowerCase() === 'textarea';

    const wrapClass = classNames({
      [`${prefix}-input-wrapper`]: true,
      [`${prefix}-textarea-wrapper`]: isTextarea,
      [`${prefix}-input-addons`]: !isTextarea && (addonAfter || addonBefore)
    }, className);

    // 黑名单，下面这些props不应该带入到Input上
    let inputProps = omit(this.props, ['className', 'prefix', 'addonBefore', 'addonAfter', 'onPressEnter']);

    if (isTextarea) {
      inputProps = omit(inputProps, ['type']);
      return (
        <div className={wrapClass} >
          <textarea className={`${prefix}-textarea`} {...inputProps} onKeyDown={this.handleKeyDown}></textarea>
        </div>
      );
    }

    return (
      <div className={wrapClass} >
        {addonBefore && <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>}
        <input className={`${prefix}-input`} {...inputProps} onKeyDown={this.handleKeyDown} />
        {addonAfter && <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>}
      </div>
    );
  }
}
