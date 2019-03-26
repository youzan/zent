import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import Icon from 'icon';

export default class BlockHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    tooltip: PropTypes.node,
    content: PropTypes.node,
    childAlign: PropTypes.oneOf(['left', 'right']),
    position: PropTypes.string,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    childAlign: 'left',
    position: 'top-right',
    tooltip: '',
    content: '',
  };

  render() {
    const {
      prefix,
      content,
      title,
      tooltip,
      childAlign,
      position,
      className,
      children,
    } = this.props;
    return (
      <div className={cx(`${prefix}-block-header`, className)}>
        {title && (
          <div className={`${prefix}-block-header__left`}>
            <h3>{title}</h3>
          </div>
        )}
        <div className={`${prefix}-block-header__pop`}>
          {tooltip && (
            <Pop
              trigger="hover"
              centerArrow
              position={position}
              content={
                <div className={`${prefix}-block-header__tooltip`}>
                  {tooltip}
                </div>
              }
              wrapperClassName={`${prefix}-block-header__tooltip-trigger`}
            >
              <Icon type="help-circle" />
            </Pop>
          )}
        </div>
        <div
          className={cx(`${prefix}-block-header__content`, {
            [`${prefix}-block-header__content-right`]: childAlign === 'right',
          })}
        >
          {content && content}
          {children && children}
        </div>
      </div>
    );
  }
}
