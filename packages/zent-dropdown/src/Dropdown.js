import React, { Proptypes, Children, Component } from 'react';
import cx from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';
import DropdownContent from './DropdownContent';
import DropdownTrigger from './DropdownTrigger';

const T = {
  click: Popover.Trigger.Click,
  hover: class Hover extends Popover.Trigger.Hover {
    isOutSide = (node) => {
      const {getTriggerNode, isOutside} = this.props;

      if (isOutside && isOutside(node)) {
        return true;
      }

      const triggerNode = getTriggerNode();
      const popoverNodes = [].slice.call(document.querySelectorAll('.zent-multihover-popover'));

      if (popoverNodes && popoverNodes.some(popover => popover.contains(node)) || triggerNode && triggerNode.contains(node)) {
        return false;
      }

      return true;
    }
  }
};

export default class Dropdown extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']),
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func
    position: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
    trigger: 'hover',
    onChange: noop,
    position: 'RightTop'
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

  render() {
    const { dropdownTrigger, dropdownContent } = this.validateChildren();
    const { prefix, className, trigger, position, visible, onVisibleChange } = this.props;
    const Trigger = T[trigger];
    return (
      <Popover position={Popover.Position[position]} className={cx(className, `${prefix}-dropdown-popover`, 'zent-multihover-popover')}>
        <Trigger>
          {React.cloneElement(dropdownTrigger, {
            prefix
          })}
        </Trigger>
        <Popover.Content>
          {React.cloneElement(dropdownContent, {
            prefix
          })}
        </Popover.Content>
      </Popover>
    )
  }
}


// import Popover from 'zent-popover';
// import Menu from 'zent-menu';
// import 'zent-menu/lib/index.css';
// import React, { PropTypes, Component } from 'react';
//
// const { Trigger, Content } = Popover;
// const { MenuItem, SubMenu } = Menu;
//
// export default class Dropdown extends Component {
//   render() {
//     return (
//       <Popover position={Popover.Position.BottomLeft} display="block">
//         <Trigger.Click>
//           <a>Hover me</a>
//         </Trigger.Click>
//         <Content>
//           <Menu
//             onClick={(e, key) => { console.log(key) }}
//             className="hello"
//           >
//             <MenuItem key="1-1" className="food">食品分类</MenuItem>
//             <MenuItem key="1-2" disabled>服装分类</MenuItem>
//             <SubMenu title="电器分类" overlayClassName="sub">
//               <SubMenu key="2-1-0" className="tv" title="电视机">
//                 <MenuItem key="2-1-1" disabled>三星</MenuItem>
//                 <MenuItem key="2-1-2">夏普</MenuItem>
//               </SubMenu>
//               <MenuItem key="2-2" disabled>笔记本</MenuItem>
//               <MenuItem key="2-3">洗衣机</MenuItem>
//             </SubMenu>
//             <SubMenu title="美妆分类" disabled>
//               <MenuItem key="3-1">眼影</MenuItem>
//               <MenuItem key="3-2">洗面奶</MenuItem>
//             </SubMenu>
//           </Menu>
//         </Content>
//       </Popover>
//     );
//   }
// };
