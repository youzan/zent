import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Notify from 'notify';
import CopyToClipboard from './ReactCopyToClipboard';

export default class Copy extends (PureComponent || Component) {
  onCopyError = () => {
    const { errorNotify, onCopyError } = this.props;

    errorNotify && Notify.error(errorNotify);
    onCopyError && onCopyError();
  };

  render() {
    const { text, onCopySuccess, successNotify, children } = this.props;

    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      return (
        <CopyToClipboard
          text={text}
          onCopy={(t, result) => {
            if (result) {
              successNotify && Notify.success(successNotify);
              onCopySuccess && onCopySuccess();
            } else {
              this.onCopyError();
            }
          }}
        >
          {children}
        </CopyToClipboard>
      );
    }

    return React.cloneElement(children, {
      onClick: () => {
        this.onCopyError();
      }
    });
  }
}

Copy.propTypes = {
  text: PropTypes.string,
  onCopySuccess: PropTypes.func,
  onCopyError: PropTypes.func
};

Copy.defaultProps = {
  successNotify: '复制成功',
  errorNotify: '复制失败，请手动复制链接',
  children: <Button>复制</Button>
};
