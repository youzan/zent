import * as React from 'react';
import { Component } from 'react';

import Button from '../button';
import isPromise from '../utils/isPromise';

export type ActionButtonClickHandler = (
  e?: () => void
) => Promise<any> | boolean | void;

export interface IActionButtonProps {
  type: 'default' | 'primary' | 'success' | 'danger' | 'secondary';
  text: string;
  className: string;
  getClose: () => () => void;
  onClick?: ActionButtonClickHandler;
}

export default class ActionButton extends Component<IActionButtonProps> {
  state = {
    loading: false,
  };

  onClick = () => {
    const { onClick: callback, getClose } = this.props;
    const close = getClose();

    // callback没传，直接关闭
    if (!callback) {
      return close();
    }

    const callbackHasArgs = callback.length > 0;
    const value = callbackHasArgs ? callback(close) : callback();

    // 返回值是个Promise，resolve后自动关闭
    if (isPromise(value)) {
      this.setState({
        loading: true,
      });
      value.then(
        () => {
          // 马上就关闭了，没必要setState({loading: false})
          close();
        },
        () => {
          this.setState({
            loading: false,
          });
        }
      );
      return;
    }

    // callback 无参数并且返回值不是 false 的时候自动关闭
    if (!callbackHasArgs && value !== false) {
      close();
    }
  };

  render() {
    const { className, type, text } = this.props;
    const { loading } = this.state;

    return (
      <Button
        type={type}
        className={className}
        loading={loading}
        onClick={this.onClick}
      >
        {text}
      </Button>
    );
  }
}
