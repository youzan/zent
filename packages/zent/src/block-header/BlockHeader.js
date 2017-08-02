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
    position: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    position: 'top-right',
    tooltip: '',
    content: ''
  };

  render() {
    const {
      prefix,
      content,
      title,
      tooltip,
      position,
      className,
      children
    } = this.props;
    return (
      <div className={cx(`${prefix}-block-header`, className)}>
        {title &&
          <div className={`${prefix}-block-header__left`}>
            <h3>
              {title}
            </h3>
          </div>}
        <div className={`${prefix}-block-header__content`}>
          {content && content}
          {children && children}
        </div>
        <div className={`${prefix}-block-header__pop`}>
          {tooltip &&
            <Pop
              trigger="hover"
              centerArrow
              position={position}
              content={
                <p className={`${prefix}-block-header__tooltip`}>
                  {tooltip}
                </p>
              }
              wrapperClassName={`${prefix}-block-header__tooltip-trigger`}
            >
              <Icon type="help-circle" />
            </Pop>}
        </div>
      </div>
    );
  }
}
