import React, { Component, PureComponent } from 'react';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Placeholder from 'placeholder';

export default class Card extends (PureComponent || Component) {
  static propTypes = {
    title: PropTypes.node,
    action: PropTypes.node,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['nested', 'normal']),
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    type: 'normal',
    style: {},
    bodyStyle: {},
    loading: false,
    className: '',
    prefix: 'zent'
  };

  render() {
    const {
      title,
      action,
      type,
      loading,
      style,
      children,
      className,
      bodyStyle,
      prefix
    } = this.props;

    const isValidTitle = !isNil(title);
    const isValidAction = !isNil(action);

    return (
      <div
        className={cx(`${prefix}-card`, className, {
          [`${prefix}-card--normal`]: type === 'normal',
          [`${prefix}-card--nested`]: type === 'nested'
        })}
        style={style}
      >
        {(isValidTitle || isValidAction) && (
            <div className={`${prefix}-card-header`}>
              {isValidTitle && (
                <h3 className={`${prefix}-card-header__title`}>{title}</h3>
              )}
              {isValidAction && (
                <div className={`${prefix}-card-header__action`}>{action}</div>
              )}
            </div>
          )}
        <div className={`${prefix}-card-body`} style={bodyStyle}>
          {loading ? <Placeholder.TextBlock rows={5} /> : children}
        </div>
      </div>
    );
  }
}
