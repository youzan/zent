import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

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
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'zent',
    type: 'text',
    autoFocus: false
  };

  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) {
      this.input.focus();
    }
  }

  focus() {
    this.input.focus();
  }

  handleKeyDown = evt => {
    const { onKeyDown, onPressEnter } = this.props;
    if (onPressEnter && evt.keyCode === 13) {
      onPressEnter(evt);
    }

    if (onKeyDown) onKeyDown(evt);
  };

  render() {
    const {
      addonBefore,
      addonAfter,
      prefix,
      className,
      type,
      extra
    } = this.props;
    const isTextarea = type.toLowerCase() === 'textarea';

    const wrapClass = classNames(
      {
        [`${prefix}-input-wrapper`]: true,
        [`${prefix}-textarea-wrapper`]: isTextarea,
        [`${prefix}-input-addons`]: !isTextarea && (addonAfter || addonBefore)
      },
      className
    );

    // 黑名单，下面这些props不应该带入到Input上
    let inputProps = omit(this.props, [
      'className',
      'prefix',
      'addonBefore',
      'addonAfter',
      'onPressEnter',
      'extra'
    ]);

    if (isTextarea) {
      inputProps = omit(inputProps, ['type']);
      return (
        <div className={wrapClass}>
          <textarea
            ref={input => {
              this.input = input;
            }}
            className={`${prefix}-textarea`}
            {...inputProps}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      );
    }

    return (
      <div className={wrapClass}>
        {addonBefore &&
          <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>}
        <input
          ref={input => {
            this.input = input;
          }}
          className={`${prefix}-input`}
          {...inputProps}
          onKeyDown={this.handleKeyDown}
        />
        {addonAfter &&
          <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>}
        {extra && <div className={`${prefix}-input-extra`}>{extra}</div>}
      </div>
    );
  }
}
