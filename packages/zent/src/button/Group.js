import React, { PureComponent } from 'react';
import setClass from 'classnames';
import PropTypes from 'prop-types';

export default class Group extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    style: null,
    className: '',
    prefix: 'zent',
  };

  render() {
    const { prefix, className, style, children, ...other } = this.props;
    const classNames = setClass(`${prefix}-btn-group`, className);

    return (
      <div className={classNames} style={style} {...other}>
        {children}
      </div>
    );
  }
}
