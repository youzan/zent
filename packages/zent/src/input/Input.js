import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'icon';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import isNumber from 'lodash/isNumber';
import getWidth from 'utils/getWidth';
import Textarea from './Textarea';

export default class Input extends (PureComponent || Component) {
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
    showCount: PropTypes.bool,
    showClear: PropTypes.bool,
    autoSize: PropTypes.bool,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    initSelectionStart: PropTypes.number,
    initSelectionEnd: PropTypes.number,
    autoSelect: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'zent',
    type: 'text',
    autoFocus: false,
    autoSelect: false,
    showClear: false
  };

  componentDidMount() {
    const {
      autoFocus,
      autoSelect,
      initSelectionStart,
      initSelectionEnd
    } = this.props;

    if (autoFocus) {
      this.input.focus();
    }
    if (autoSelect) {
      this.select(initSelectionStart, initSelectionEnd);
    }
  }

  focus() {
    this.input.focus();
  }

  select(selectioinStart, selectionEnd) {
    if (isNumber(selectioinStart) && isNumber(selectionEnd)) {
      this.input.setSelectionRange(selectioinStart, selectionEnd);
    } else {
      this.input.select();
    }
  }

  handleKeyDown = evt => {
    const { onKeyDown, onPressEnter } = this.props;
    if (onPressEnter && evt.keyCode === 13) {
      onPressEnter(evt);
    }

    if (onKeyDown) onKeyDown(evt);
  };

  clearInput = evt => {
    const { onChange } = this.props;

    isFunction(onChange) &&
      onChange({
        target: {
          ...this.props,
          value: ''
        },
        preventDefault: () => evt.preventDefault(),
        stopPropagation: () => evt.stopPropagation()
      });
  };

  retainInputFocus = evt => {
    evt.preventDefault();
  };

  render() {
    const {
      addonBefore,
      addonAfter,
      prefix,
      className,
      type,
      onChange,
      value,
      showClear,
      width,
      disabled,
      readOnly
    } = this.props;
    const widthStyle = getWidth(width);
    const isTextarea = type.toLowerCase() === 'textarea';
    const editable = !(disabled || readOnly);

    const wrapClass = classNames(
      {
        [`${prefix}-input-wrapper`]: true,
        [`${prefix}-input-wrapper__not-editable`]: !editable,
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
      'width',
      'showClear',
      'autoSelect',
      'initSelectionStart',
      'initSelectionEnd'
    ]);

    if (isTextarea) {
      return (
        <Textarea
          wrapClass={wrapClass}
          widthStyle={widthStyle}
          prefix={prefix}
          handleKeyDown={this.handleKeyDown}
          inputProps={inputProps}
          inputRef={this}
        />
      );
    }

    return (
      <div className={wrapClass} style={widthStyle}>
        {addonBefore && (
          <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>
        )}
        <input
          ref={input => {
            this.input = input;
          }}
          className={`${prefix}-input`}
          {...inputProps}
          value={value}
          onKeyDown={this.handleKeyDown}
        />
        {isFunction(onChange) &&
          showClear &&
          value && (
            <Icon
              type="close-circle"
              onClick={this.clearInput}
              onMouseDown={this.retainInputFocus}
            />
          )}
        {addonAfter && (
          <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>
        )}
      </div>
    );
  }
}
