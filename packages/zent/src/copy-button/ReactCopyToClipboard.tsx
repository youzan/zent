import * as React from 'react';
import { Component } from 'react';
import copy from './CopyToClipboard';

export interface ICopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  onCopy?: (text: string, result: boolean) => void;
}

export interface ICopyToClipboardChildProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export class CopyToClipboard extends Component<ICopyToClipboardProps> {
  onClick = event => {
    const { text, onCopy, children } = this.props;

    const elem = React.Children.only<any>(children);

    const result = copy(text);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }
  };

  render() {
    const { text: _text, onCopy: _onCopy, children, ...props } = this.props;
    const elem = React.Children.only<any>(children);

    return React.cloneElement(elem, { ...props, onClick: this.onClick });
  }
}

export default CopyToClipboard;
