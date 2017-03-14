import React, { Component, PropTypes } from 'react';
import Popover from 'zent-popover';
import Icon from 'zent-icon';
import cx from 'zent-utils/classnames';
import { noop } from './utils';
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
        className={cx(`${prefix}-menu-wrapper`, wrapperClassName)}
      >
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}

class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onTitleClick: PropTypes.func
  };

  static defaultProps = {
    prefix: 'zent',
    onTitleClick: noop
  };

  onTitleClick = (e) => {
    const {
      onTitleClick
    } = this.props;

    onTitleClick(e);
  }

  render() {
    const {
      title,
      prefix,
      className,
      wrapperClassName,
      children,
      onClick
    } = this.props;

    const mouseEvents = {
      onClick: this.onTitleClick
    };

    return (
      <li
        {...mouseEvents}
        className={cx(`${prefix}-menu-item`, className)}
      >
        <Popover
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
            </div>
          </PopoverHoverTrigger>
          <PopoverContent>
            <HoverContent
              prefix={prefix}
              wrapperClassName={wrapperClassName}
              onClick={onClick}
            >
              {children}
            </HoverContent>
          </PopoverContent>
        </Popover>
        <Icon type="right" />
      </li>
    );
  }
}

export default MenuItem;
