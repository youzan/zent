import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Card extends (PureComponent || Component) {
  static defaultProps = {
    style: {},
    bodyStyle: {},
    className: ''
  };
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
    className: PropTypes.string
  };
  render() {
    const { title, action, style, children, className, bodyStyle } = this.props;
    this.isValidTitle = typeof title === 'string' || typeof title === 'number';
    this.isValidAction = action !== undefined;

    return (
      <div className={`zent-card ${className}`} style={style}>
        {(this.isValidTitle || this.isValidAction) &&
          <div className="zent-card-header">
            {this.isValidTitle &&
              <h3 className="zent-card-header__title">
                {title}
              </h3>}
            {this.isValidAction &&
              <div className="zent-card-header__action">
                {action}
              </div>}
          </div>}
        <div className="zent-card-body" style={bodyStyle}>
          {children}
        </div>
      </div>
    );
  }
}
