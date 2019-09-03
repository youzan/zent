import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import isNumber from 'lodash-es/isNumber';
import { IInputProps, IInputCoreProps, IInputClearEvent } from './types';
import { InputCore } from './InputCore';
import { TextArea } from './TextArea';
import { InputContext, IInputContext } from './context';
import { IDisabledContext, DisabledContext } from '../disabled';

export interface IInputState {
  hasFocus: boolean;
}

export class Input extends Component<IInputProps, IInputState> {
  static contextType = InputContext;
  static displayName = 'ZentInput';

  static defaultProps = {
    type: 'text',
    size: 'normal',
  };

  context!: IInputContext;

  elementRef = React.createRef<HTMLInputElement & HTMLTextAreaElement>();

  /**
   * backward compatibility
   */
  get input() {
    return this.elementRef.current;
  }

  state = {
    hasFocus: false,
  };

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
    if (onPressEnter && e.key === 'Enter') {
      onPressEnter(e as any);
    }

    onKeyDown && onKeyDown(e as any);
  };

  onFocus: React.FocusEventHandler<
    HTMLInputElement & HTMLTextAreaElement
  > = evt => {
    this.setState({
      hasFocus: true,
    });

    const { onFocus } = this.props;
    onFocus && onFocus(evt as any);
  };

  onBlur: React.FocusEventHandler<
    HTMLInputElement & HTMLTextAreaElement
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

  renderImpl(disableCtx: IDisabledContext) {
    const props = this.props;
    const {
      type,
      className,
      width,
      size,
      disabled = disableCtx.value,
      readOnly,
      style,
    } = props;
    const { hasFocus } = this.state;
    const isTextarea = type.toLowerCase() === 'textarea';
    const editable = !(disabled || readOnly);
    const { renderInner } = this.context;

    const wrapperStyle: React.CSSProperties = {
      ...style,
      width,
    };

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
        'zent-input-wrapper-inline': props.inline,
      },
      className
    );

    let children: React.ReactNode;
    if (props.type === 'textarea') {
      children = (
        <TextArea
          {...props}
          ref={this.elementRef}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={disabled}
        />
      );
    } else {
      children = (
        <InputCore
          {...props}
          ref={this.elementRef}
          onClear={this.clearInput}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={disabled}
        />
      );
    }

    return (
      <div className={wrapClass} style={wrapperStyle}>
        {renderInner ? renderInner(children) : children}
      </div>
    );
  }

  renderInput = (disableContext: IDisabledContext) => {
    return this.renderImpl(disableContext);
  };

  render() {
    return (
      <DisabledContext.Consumer>{this.renderInput}</DisabledContext.Consumer>
    );
  }
}

export default Input;
