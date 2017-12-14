import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Notify from 'notify';

import { I18nReciever as Reciever } from 'i18n';
import { CopyButton as I18nDefault } from 'i18n/default';

import CopyToClipboard from './ReactCopyToClipboard';

export default class Copy extends (PureComponent || Component) {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onCopySuccess: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    onCopyError: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  };

  static defaultProps = {
    onCopySuccess: '',
    onCopyError: ''
  };

  onCopyCallback = (type, callback) => {
    if (typeof callback === 'string') {
      Notify[type](
        <Reciever defaultI18n={I18nDefault} componentName="CopyButton">
          {(notifyType => i18n => <span>{callback || i18n[notifyType]}</span>)(
            type
          )}
        </Reciever>
      );
    } else {
      callback();
    }
  };

  onCopy = (text, result) => {
    const { onCopySuccess, onCopyError } = this.props;

    if (result) {
      this.onCopyCallback('success', onCopySuccess);
    } else {
      this.onCopyCallback('error', onCopyError);
    }
  };

  render() {
    const { text, children } = this.props;

    return (
      <CopyToClipboard text={text} onCopy={this.onCopy}>
        {children ? (
          React.Children.only(children)
        ) : (
          <Reciever defaultI18n={I18nDefault} componentName="CopyButton">
            {(i18n, { onClick = null }) => (
              <Button onClick={onClick} type="primary">
                {i18n.copy}
              </Button>
            )}
          </Reciever>
        )}
      </CopyToClipboard>
    );
  }
}
