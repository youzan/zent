import React, { Component, PropTypes } from 'react';
import Popover from 'zent-popover';
import Icon from 'zent-icon';
import cx from 'zent-utils/classnames';
import CommonMenu from './CommonMenu';

const PopoverContent = Popover.Content;
const PopoverHoverTrigger = Popover.Trigger.Hover;
const withPopover = Popover.withPopover;

const HoverContent = withPopover(class _HoverContent extends CommonMenu {
  onClick = (e, index) => {
    const { onClick, popover } = this.props;
    popover.close();

    onClick(e, index);
  };

  renderMenuItem = (c, i, index) => {
    if (!c) {
      return null;
    }

    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const {
      prefix,
      children
    } = this.props;

    return (
      <ul
        className={cx(`${prefix}-menu`, `${prefix}-sub-menu`)}
      >
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
});

export default class MenuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    prefix: 'zent',
    disabled: false
  };

  renderContent = () => {
    const {
      title,
      prefix,
      children,
      onClick,
      className,
      overlayClassName,
      disabled
    } = this.props;

    if (disabled) {
      return title;
    }

    return (<Popover
      wrapperClassName={`${prefix}-sub-menu-popover-wrapper`}
      className={cx(`${prefix}-sub-menu-overlay`, overlayClassName)}
      position={Popover.Position.RightTop}
      display="inline-block"
      cushion={5}
    >
      <PopoverHoverTrigger
        showDelay={200}
        hideDelay={200}
      >
        <div className={`${prefix}-sub-menu-trigger`}>
          {title}
          <Icon type="right" />
        </div>
      </PopoverHoverTrigger>
      <PopoverContent>
        <HoverContent
          prefix={prefix}
          onClick={onClick}
          className={className}
        >
          {children}
        </HoverContent>
      </PopoverContent>
    </Popover>);
  }

  render() {
    const {
      prefix,
      className,
      disabled
    } = this.props;

    return (
      <li
        className={
          cx(`${prefix}-menu-item`,
              className,
            { [`${prefix}-menu-item-disabled`]: disabled })
        }
      >
        {this.renderContent()}
      </li>
    );
  }
}
