import * as React from 'react';
import { Component } from 'react';
import Button from '../button';
import Notify from '../notify';

import { I18nReceiver as Receiver } from '../i18n';

import CopyToClipboard from './ReactCopyToClipboard';

export interface ICopyButtonProps {
  text: string;
  onClick?: React.MouseEventHandler;
  onCopySuccess?: () => void | string;
  onCopyError?: () => void | string;
}

export class CopyButton extends Component<ICopyButtonProps> {
  static defaultProps = {
    onCopySuccess: '',
    onCopyError: '',
  };

  onCopyCallback = (
    type: keyof typeof Notify,
    callback: string | (() => void)
  ) => {
    if (typeof callback === 'string') {
      Notify[type](callback);
    } else {
      callback();
    }
  };

  onCopy = (i18n: any) => (text: string, result: boolean) => {
    const { onCopySuccess, onCopyError } = this.props;

    if (result) {
      this.onCopyCallback('success', onCopySuccess || i18n.success);
    } else {
      this.onCopyCallback('error', onCopyError || i18n.error);
    }
  };

  render() {
    const { text, children, onClick } = this.props;

    return (
      <Receiver componentName="CopyButton">
        {i18n => (
          <CopyToClipboard text={text} onCopy={this.onCopy(i18n)}>
            {children ? (
              React.Children.only(children)
            ) : (
              <Button onClick={onClick} type="primary">
                {i18n.copy}
              </Button>
            )}
          </CopyToClipboard>
        )}
      </Receiver>
    );
  }
}

export default CopyButton;
