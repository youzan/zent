import React, { Component, PureComponent } from 'react';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';

export default class Card extends (PureComponent || Component) {
  static defaultProps = {
    style: {},
    bodyStyle: {},
    className: '',
    prefix: 'zent'
  };
  static propTypes = {
    title: PropTypes.node,
    action: PropTypes.node,
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string
  };
  render() {
    const {
      title,
      action,
      style,
      children,
      className,
      bodyStyle,
      prefix
    } = this.props;

    this.isValidTitle = !isNil(title);
    this.isValidAction = !isNil(action);

    return (
      <div className={`${prefix}-card ${className}`} style={style}>
        {(this.isValidTitle || this.isValidAction) &&
          <div className={`${prefix}-card-header`}>
            {this.isValidTitle &&
              <h3 className={`${prefix}-card-header__title`}>
                {title}
              </h3>}
            {this.isValidAction &&
              <div className={`${prefix}-card-header__action`}>
                {action}
              </div>}
          </div>}
        <div className={`${prefix}-card-body`} style={bodyStyle}>
          {children}
        </div>
      </div>
    );
  }
}
