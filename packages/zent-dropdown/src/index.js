import React, { PropTypes, Children, Component } from 'react';
import Popover, { withPopover } from 'zent-popover';
import cx from 'zent-utils/classnames';

const TriggerModes = {
  click: Popover.Trigger.Click,
  hover: Popover.Trigger.Hover
};

const Positions = {
  'right-top': Popover.Position.RightTop,
  'right-center': Popover.Position.RightCenter,
  'right-bottom': Popover.Position.RightBottom,
  'bottom-left': Popover.Position.BottomLeft,
  'bottom-right': Popover.Position.BottomRight,
  'bottom-center': Popover.Position.BottomCenter,
  'left-top': Popover.Position.LeftTop,
  'left-center': Popover.Position.LeftCenter,
  'left-bottom': Popover.Position.LeftBottom,
  'top-left': Popover.Position.TopLeft,
  'top-center': Popover.Position.TopCenter,
  'top-right': Popover.Position.TopRight
};

const DropdownTrigger = (props) => props.children;
const DropdownContentBase = function ({ popover, children, prefix = 'zent' }) {
  return (
    <div onClick={popover.close} className={cx(`${prefix}-dropdown-content-wrapper`)}>
      {children}
    </div>
  );
};
const DropdownContent = withPopover(DropdownContentBase);

export default class Dropdown extends Component {
  static Content = DropdownContent;
  static Trigger = DropdownTrigger;

  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']),
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    position: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    trigger: 'hover',
    position: 'right-top',
    className: ''
  };

  validateChildren() {
    const { children } = this.props;
    const childArray = Children.toArray(children);

    if (childArray.length !== 2) {
      throw new Error('There must be one and only one trigger and content in Dropdown');
    }

    const { dropdownTrigger, dropdownContent } = childArray.reduce((state, c) => {
      const type = c.type;
      if (type === DropdownTrigger) {
        state.dropdownTrigger = c;
      } else if (type === DropdownContent) {
        state.dropdownContent = c;
      }
      return state;
    }, { dropdownTrigger: null, dropdownContent: null });

    if (!dropdownTrigger) {
      throw new Error('Missing trigger in Dropdown');
    }
    if (!dropdownContent) {
      throw new Error('Missing content in Dropdown');
    }

    return { dropdownTrigger, dropdownContent };
  }

  renderTrigger(triggerContent) {
    const { trigger, prefix } = this.props;
    const Trigger = TriggerModes[trigger];
    return (
      <Trigger showDelay={trigger === 'hover' && 200} hideDelay={trigger === 'hover' && 200}>
        <div className={`${prefix}-dropdown-trigger-wrapper`}>
          {triggerContent}
        </div>
      </Trigger>
    );
  }

  render() {
    const { dropdownContent, dropdownTrigger } = this.validateChildren();
    const { prefix, className, position, visible, onVisibleChange } = this.props;
    const { Content } = Popover;
    return (
      <Popover position={Positions[position]} className={cx(className, `${prefix}-dropdown`)} visible={visible} onVisibleChange={onVisibleChange}>
        {this.renderTrigger(dropdownTrigger)}
        <Content>
          {dropdownContent}
        </Content>
      </Popover>
    );
  }
}
