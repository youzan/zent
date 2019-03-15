import * as React from 'react';
import { PureComponent } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash-es/isFunction';
import omit from 'lodash-es/omit';
import isNumber from 'lodash-es/isNumber';
import { Omit } from 'utility-types';
import Icon from '../icon';
import getWidth from '../utils/getWidth';
import Textarea from './Textarea';

export type InputType = 'text' | 'number' | 'password' | 'textarea';

export interface IInputChangeEvent {
  target: IInputProps;
  preventDefault(): void;
  stopPropagation(): void;
  fromClearButton: boolean;
}

export interface IInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
  className?: string;
  prefix?: string;
  width?: number | string;
  type?: InputType;
  size?: 'large' | 'normal' | 'small';
  defaultValue?: string;
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showClear?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  autoFocus?: boolean;
  autoSelect?: boolean;
  initSelectionStart?: number;
  initSelectionEnd?: number;
  onChange?: (
    e: IInputChangeEvent | React.ChangeEvent<HTMLInputElement>
  ) => void;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;

  // textarea
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean;
}

export class Input extends PureComponent<IInputProps> {
  static defaultProps = {
    disabled: false,
    readOnly: false,
    prefix: 'zent',
    type: 'text',
    size: 'normal',
    autoFocus: false,
    autoSelect: false,
    showClear: false,
  };

  input: HTMLInputElement | HTMLTextAreaElement;

  state = {
    hasFocus: false,
  };

  componentDidMount() {
    const {
      autoFocus,
      autoSelect,
      initSelectionStart,
      initSelectionEnd,
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

  handleOnFocus = evt => {
    this.setState({
      hasFocus: true,
    });

    const { onFocus } = this.props;
    onFocus && onFocus(evt);
  };

  handleOnBlur = evt => {
    this.setState({
      hasFocus: false,
    });

    const { onBlur } = this.props;
    onBlur && onBlur(evt);
  };

  clearInput = evt => {
    const { onChange } = this.props;

    isFunction(onChange) &&
      onChange({
        target: {
          ...this.props,
          value: '',
        },
        preventDefault: () => evt.preventDefault(),
        stopPropagation: () => evt.stopPropagation(),

        // 标记这个事件来自清空按钮
        fromClearButton: true,
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
      size,
      onChange,
      value,
      showClear,
      width,
      disabled,
      readOnly,
      showCount,
      autoSize,
    } = this.props;
    const { hasFocus } = this.state;
    const widthStyle = getWidth(width);
    const isTextarea = type.toLowerCase() === 'textarea';
    const editable = !(disabled || readOnly);

    const wrapClass = classNames(
      {
        [`${prefix}-input-wrapper`]: true,
        [`${prefix}-input-wrapper__not-editable`]: !editable,
        [`${prefix}-textarea-wrapper`]: isTextarea,
        [`${prefix}-input-addons`]: !isTextarea && (addonAfter || addonBefore),
        [`${prefix}-input--size-${size}`]: true,
        [`${prefix}-input--has-focus`]: hasFocus,
      },
      className
    );

    // 黑名单，下面这些props不应该带入到Input上
    const inputProps: any = omit(this.props, [
      'className',
      'prefix',
      'addonBefore',
      'addonAfter',
      'onPressEnter',
      'width',
      'showClear',
      'autoSelect',
      'initSelectionStart',
      'initSelectionEnd',
    ]);

    if (isTextarea) {
      inputProps.onBlur = this.handleOnBlur;
      inputProps.onFocus = this.handleOnFocus;

      return (
        <Textarea
          wrapClass={wrapClass}
          widthStyle={widthStyle}
          prefix={prefix}
          handleKeyDown={this.handleKeyDown}
          inputProps={inputProps}
          inputRef={this}
          showCount={showCount}
          autoSize={autoSize}
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
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
        />
        {isFunction(onChange) && showClear && value && (
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

export default Input;
