import React, { PropTypes, Children, Component } from 'react';
import Popover, { withPopover } from 'zent-popover';
import cx from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';

const TriggerModes = {
  click: Popover.Trigger.Click,
  hover: Popover.Trigger.Hover
};

const DropdownTrigger = (props) => props.children;
const DropdownContent = withPopover(function DropdownContentBase({ popover, children }) {
  return (
    <div onClick={popover.close}>
      {children}
    </div>
  );
})

export default class Dropdown extends Component {
  static Content = DropdownContent;
  static Trigger = DropdownTrigger;

  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['click', 'hover']),
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    position: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    mode: 'hover',
    onVisibleChange: noop,
    position: 'RightTop',
    className: ''
  };

  constructor() {
    super();
    this.visible = true;
  }

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

  renderTrigger() {
    const { mode, prefix } = this.props;
    const { dropdownTrigger } = this.validateChildren();
    const Trigger = TriggerModes[mode];
    return (
      <Trigger showDelay={mode==='hover'&&200} hideDelay={mode==='hover'&&200}>
        <div className={cx(`${prefix}-dropdown-trigger-wrapper`)} style={{"display": "inline-block"}}>
          {dropdownTrigger}
        </div>
      </Trigger>
    );
  }

  render() {
    const { dropdownContent } = this.validateChildren();
    const { prefix, className, mode, position, onVisibleChange } = this.props;
    const { Content } = Popover;
    return (
      <Popover position={Popover.Position[position]} className={cx(className, `${prefix}-dropdown`)}>
        {this.renderTrigger()}
        <Content>
          {dropdownContent}
        </Content>
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
