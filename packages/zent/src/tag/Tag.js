import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

// 支持的color style
const colorTypes = ['red', 'green', 'yellow', 'blue', 'darkgreen'];

export default class Tag extends Component {
  static propTypes = {
    color: PropTypes.string,
    outline: PropTypes.bool,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    color: 'red',
    outline: false,
    closable: false,
    className: '',
    prefix: 'zent'
  };

  state = {
    closed: false
  };

  onClose = e => {
    e.persist();
    this.setState(
      {
        closed: true
      },
      () => {
        // onClose是在*关闭以后*被调用的
        const { onClose } = this.props;
        if (isFunction(onClose)) {
          onClose(e);
        }
      }
    );
  };

  render() {
    const { closed } = this.state;
    if (closed) {
      return null;
    }

    const {
      color,
      outline,
      closable,
      children,
      className,
      prefix
    } = this.props;
    const containerCls = cx(
      `${prefix}-tag`,
      `${prefix}-tag-style${colorTypes.indexOf(color) >= 0 ? `-${color}` : ''}${outline ? '-outline' : ''}`,
      {
        [className]: !!className,
        [`${prefix}-tag-closable`]: closable
      }
    );

    let styles = {};
    if (colorTypes.indexOf(color) < 0) {
      styles = outline
        ? { color, borderColor: color }
        : { background: color, borderColor: color };
    }

    return (
      <div className={containerCls} style={styles}>
        <div className={`${prefix}-tag-content`}>{children}</div>
        {closable &&
          <span className={`${prefix}-tag-close-btn`} onClick={this.onClose}>
            ×
          </span>}
      </div>
    );
  }
}
