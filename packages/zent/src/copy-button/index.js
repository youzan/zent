import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Notify from 'notify';
import CopyToClipboard from './ReactCopyToClipboard';

export default class Copy extends (PureComponent || Component) {
  onCopyError = () => {
    const { onCopyError } = this.props;
    if (typeof onCopySuccess === 'string') {
      Notify.error(onCopyError);
    } else {
      onCopyError();
    }
  };

  render() {
    const { text, onCopySuccess, children } = this.props;

    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      return (
        <CopyToClipboard
          text={text}
          onCopy={(t, result) => {
            if (result) {
              if (typeof onCopySuccess === 'string') {
                Notify.success(onCopySuccess);
              } else {
                onCopySuccess();
              }
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
  text: PropTypes.string.isRequired,
  onCopySuccess: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onCopyError: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.element
};

Copy.defaultProps = {
  onCopySuccess: '复制成功',
  onCopyError: '复制失败，请手动复制链接',
  children: <Button>复制</Button>
};
