import React, { PureComponent, Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class Badge extends (PureComponent || Component) {
  static propTypes = {
    count: PropTypes.number,
    maxCount: PropTypes.number,
    dot: PropTypes.bool,
    showZero: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    count: 0,
    maxCount: 99,
    dot: false,
    showZero: false,
    className: '',
    prefix: 'zent'
  };

  render() {
    const {
      count,
      maxCount,
      dot,
      showZero,
      className,
      prefix,
      children
    } = this.props;
    const containerCls = cx({
      [`${prefix}-badge`]: true,
      [`${prefix}-badge-none-cont`]: !children,
      [className]: !!className
    });

    const renderCount = () => {
      let countEle = null;
      if (dot) {
        countEle = (
          <span className={`${prefix}-badge-count ${prefix}-badge-dot`} />
        );
      } else if (count > 0 || (count === 0 && showZero)) {
        countEle = (
          <span className={`${prefix}-badge-count`}>
            {count > maxCount ? `${maxCount}+` : count}
          </span>
        );
      }
      return countEle;
    };

    return (
      <div className={containerCls}>
        {children ? (
          <div className={`${prefix}-badge-content`}>{children}</div>
        ) : null}
        {renderCount()}
      </div>
    );
  }
}
