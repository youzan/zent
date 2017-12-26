import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Notify from 'notify';

import { I18nReceiver as Receiver } from 'i18n';
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
      Notify[type](callback);
    } else {
      callback();
    }
  };

  onCopy = i18n => (text, result) => {
    const { onCopySuccess, onCopyError } = this.props;

    if (result) {
      this.onCopyCallback('success', onCopySuccess || i18n.success);
    } else {
      this.onCopyCallback('error', onCopyError || i18n.error);
    }
  };

  render() {
    const { text, children } = this.props;

    return (
      <Receiver defaultI18n={I18nDefault} componentName="CopyButton">
        {(i18n, { onClick = null }) => (
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
