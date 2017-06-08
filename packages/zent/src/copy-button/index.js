import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Notify from 'notify';

import CopyToClipboard from './ReactCopyToClipboard';

export default class Copy extends (PureComponent || Component) {
  onCopyCallback = (type, callback) => {
    if (typeof callback === 'string') {
      Notify[type](callback);
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

    const elem = React.Children.only(children);

    return (
      <CopyToClipboard text={text} onCopy={this.onCopy}>
        {elem}
      </CopyToClipboard>
    );
  }
}

Copy.propTypes = {
  text: PropTypes.string.isRequired,
  onCopySuccess: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onCopyError: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

Copy.defaultProps = {
  onCopySuccess: '复制成功',
  onCopyError: '复制失败',
  children: <Button>复制</Button>
};
