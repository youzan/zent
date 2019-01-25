import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import copy from './CopyToClipboard';

export interface CopyToClipboardProps {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
}

export class CopyToClipboard extends Component<CopyToClipboardProps> {
  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onCopy: PropTypes.func,
  };

  onClick = event => {
    const { text, onCopy, children } = this.props;

    const elem = React.Children.only(children);

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
    const elem = React.Children.only(children);

    return React.cloneElement(elem, { ...props, onClick: this.onClick });
  }
}

export default CopyToClipboard;
