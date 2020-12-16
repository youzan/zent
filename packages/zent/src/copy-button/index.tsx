import { Component, Children } from 'react';
import Button from '../button';
import Notify from '../notify';

import { I18nReceiver as Receiver, II18nLocaleCopyButton } from '../i18n';

import CopyToClipboard from './ReactCopyToClipboard';
export interface ICopyButtonProps {
  text: (() => string) | string;
  onClick?: React.MouseEventHandler;
  onCopySuccess?: string | (() => void);
  onCopyError?: string | (() => void);
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

  onCopy = (i18n: II18nLocaleCopyButton) => (text: string, result: boolean) => {
    const { onCopySuccess, onCopyError } = this.props;

    if (result) {
      this.onCopyCallback('success', onCopySuccess || i18n.success);
    } else {
      this.onCopyCallback('error', onCopyError || i18n.error);
    }
  };

  render() {
    const { text, children, onClick } = this.props;
    const txt = typeof text === 'function' ? text() : text;

    return (
      <Receiver componentName="CopyButton">
        {(i18n: II18nLocaleCopyButton) => (
          <CopyToClipboard text={txt} onCopy={this.onCopy(i18n)}>
            {children ? (
              Children.only(children)
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
