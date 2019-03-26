import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

const NO_STYLE = {};

export default class Badge extends PureComponent {
  static propTypes = {
    count: PropTypes.number,
    maxCount: PropTypes.number,
    dot: PropTypes.bool,
    showZero: PropTypes.bool,
    offset: PropTypes.array,
    style: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    count: 0,
    maxCount: 99,
    dot: false,
    showZero: false,
    className: '',
    prefix: 'zent',
  };

  render() {
    const {
      count,
      maxCount,
      dot,
      showZero,
      offset,
      style,
      className,
      prefix,
      children,
    } = this.props;
    const containerCls = cx({
      [`${prefix}-badge`]: true,
      [`${prefix}-badge--has-content`]: children,
      [`${prefix}-badge--no-content`]: !children,
      [className]: !!className,

      // For compatibility only
      [`${prefix}-badge-none-cont`]: !children,
    });
    const posStyle =
      isArray(offset) && offset.length === 2
        ? {
            top: offset[0],
            right: offset[1],
          }
        : NO_STYLE;
    const badgeStyle = style ? { ...style, ...posStyle } : posStyle;

    const renderCount = () => {
      let countEle = null;
      if (dot) {
        countEle = (
          <span className={`${prefix}-badge-dot`} style={badgeStyle} />
        );
      } else if (count > 0 || (count === 0 && showZero)) {
        countEle = (
          <span className={`${prefix}-badge-count`} style={badgeStyle}>
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
