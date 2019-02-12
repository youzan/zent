import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import * as PropTypes from 'prop-types';
import isArray from 'lodash-es/isArray';

const NO_STYLE = {};

export interface IBadgeProps {
  count?: number
  maxCount?: number
  dot?: boolean
  showZero?: boolean
  offset?: [number, number]
  style?: React.CSSProperties
  className?: string
  prefix?: string
}

export class Badge extends PureComponent<IBadgeProps> {
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

export default Badge;
