import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
// import isFunction from 'lodash-es/isFunction';
// import omit from 'lodash-es/omit';
import isNumber from 'lodash-es/isNumber';
import * as keycode from 'keycode';
import getWidth from '../utils/getWidth';
import { IInputProps, IInputCoreProps, IInputClearEvent } from './types';
import { InputCore } from './InputCore';
import { TextArea } from './TextArea';

export interface IInputState {
  hasFocus: boolean;
}

export class Input extends Component<IInputProps, IInputState> {
  static displayName = 'ZentInput';

  static defaultProps = {
    type: 'text',
    size: 'normal',
  };

  elementRef = React.createRef<HTMLInputElement & HTMLTextAreaElement>();

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
    const el = this.elementRef.current;
    if (autoFocus) {
      el && el.focus();
    }
    if (autoSelect) {
      this.select(initSelectionStart, initSelectionEnd);
    }
  }

  focus() {
    const el = this.elementRef.current;
    el && el.focus();
  }

  select(selectionStart?: number, selectionEnd?: number) {
    const el = this.elementRef.current;
    if (!el) {
      return;
    }
    if (isNumber(selectionStart) && isNumber(selectionEnd)) {
      el.setSelectionRange(selectionStart, selectionEnd);
    } else {
      el.select();
    }
  }

  onKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const { onKeyDown, onPressEnter } = this.props;
    if (onPressEnter && keycode(e.nativeEvent) === 'enter') {
      onPressEnter(e as any);
    }

    onKeyDown && onKeyDown(e as any);
  };

  handleOnFocus: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = evt => {
    this.setState({
      hasFocus: true,
    });

    const { onFocus } = this.props;
    onFocus && onFocus(evt as any);
  };

  handleOnBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = evt => {
    this.setState({
      hasFocus: false,
    });

    const { onBlur } = this.props;
    onBlur && onBlur(evt as any);
  };

  clearInput: React.MouseEventHandler<HTMLElement> = evt => {
    const { onChange } = this.props;
    const e: IInputClearEvent = Object.create(evt);
    e.target = {
      ...(this.props as IInputCoreProps),
      value: '',
    };
    e.fromClearButton = true;
    onChange && onChange(e as any);
  };

  retainInputFocus: React.MouseEventHandler<HTMLElement> = e => {
    e.preventDefault();
  };

  render() {
    const props = this.props as IInputProps;
    const { type, className, width, size } = props;
    const { hasFocus } = this.state;
    const widthStyle = getWidth(width);
    const isTextarea = type.toLowerCase() === 'textarea';
    const editable = !(this.props.disabled || this.props.readOnly);

    const wrapClass = classNames(
      'zent-input-wrapper',
      `zent-input--size-${size}`,
      {
        'zent-input-wrapper__not-editable': !editable,
        'zent-textarea-wrapper': isTextarea,
        'zent-input-addons':
          !isTextarea &&
          ((props as IInputCoreProps).addonAfter ||
            (props as IInputCoreProps).addonBefore),
        'zent-input--has-focus': hasFocus,
      },
      className
    );

    let children: React.ReactNode;
    if (props.type === 'textarea') {
      children = <TextArea ref={this.elementRef} {...props} />;
    } else {
      children = (
        <InputCore ref={this.elementRef} {...props} onClear={this.clearInput} />
      );
    }

    return (
      <div className={wrapClass} style={widthStyle}>
        {children}
      </div>
    );
  }
}

export default Input;
