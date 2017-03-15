import React, { Component, PropTypes } from 'react';
import Popover from 'zent-popover';
import Icon from 'zent-icon';
import cx from 'zent-utils/classnames';
import CommonMenu from './CommonMenu';

const PopoverContent = Popover.Content;
const PopoverHoverTrigger = Popover.Trigger.Hover;
const withPopover = Popover.withPopover;

@withPopover
class HoverContent extends CommonMenu {
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
      wrapperClassName,
      children
    } = this.props;

    return (
      <ul
        className={cx(`${prefix}-menu`, wrapperClassName)}
      >
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}

export default class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  renderContent = () => {
    const {
      title,
      prefix,
      children,
      onClick,
      className,
      wrapperClassName,
      disabled
    } = this.props;

    if (disabled) {
      return title;
    }

    return (<Popover
      position={Popover.Position.RightTop}
      display="inline"
      cushion={5}
    >
      <PopoverHoverTrigger
        showDelay={200}
        hideDelay={200}
      >
        <div>
          {title}
          <Icon type="right" />
        </div>
      </PopoverHoverTrigger>
      <PopoverContent>
        <HoverContent
          prefix={prefix}
          onClick={onClick}
          className={className}
          wrapperClassName={wrapperClassName}
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
