import React from 'react';
import TabPanel from './components/TabPanel/TabPanel';
import LazyMount from './components/LazyMount';
import Nav from './components/Nav/Nav';

import tabUtil from './tabUtil';


function noop() { }

export default class Tabs extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string,
    type: React.PropTypes.oneOf(['normal', 'card', 'slider']),
    activeKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    // 推荐使用activeId代替原来的activeKey
    // 更直观
    activeId: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    size: React.PropTypes.oneOf(['huge', 'normal']),
    align: React.PropTypes.oneOf(['left', 'right', 'center']),
    onTabChange: React.PropTypes.func,
    onTabDel: React.PropTypes.func,
    onTabAdd: React.PropTypes.func,
    candel: React.PropTypes.bool,
    canadd: React.PropTypes.bool,
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      title: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    }))
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    type: 'normal',
    activeKey: '',
    activeId: '',
    size: 'normal',
    align: 'left',
    onTabChange: noop,
    onTabDel: noop,
    onTabAdd: noop,
    candel: false,
    canadd: false
  };

  static uniqueId = 0;

  static TabPanel = TabPanel;

  constructor(props) {
    super(props);
    Tabs.uniqueId++;
  }

  // 选中tab
  onTabChange(selectKey) {
    let { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(selectKey);
    }
  }

  // 删除tab
  onTabDel(tabKey) {
    let { onTabDel } = this.props;
    if (onTabDel) {
      onTabDel(tabKey);
    }
  }

  // 增加tab
  onTabAdd() {
    let { onTabAdd } = this.props;
    if (onTabAdd) {
      onTabAdd();
    }
  }

  renderNav(tabListData) {
    let { type, align, canadd, candel, prefix, size } = this.props;
    if (tabListData && tabListData.length) {
      return (
        <Nav
          onChange={this.onTabChange.bind(this)}
          tabListData={tabListData}
          type={type}
          align={align}
          size={size}
          onDelete={this.onTabDel.bind(this)}
          onTabAdd={this.onTabAdd.bind(this)}
          canadd={canadd}
          candel={candel}
          prefix={prefix}
          uniqueId={Tabs.uniqueId}
        />
      );
    }
  }

  renderTabPanel(tabListData) {
    let { prefix } = this.props;
    let newChildren = [];
    if (tabListData && tabListData.length) {
      tabListData.forEach((tabItem) => {
        newChildren.push(
          <LazyMount mountTrigger={tabItem.actived} key={tabItem.key}>
            <TabPanel
              tab={tabItem.title}
              actived={tabItem.actived}
              onTabReady={tabItem.onTabReady}
              prefix={prefix}
              className={tabItem.panelClassName}
              id={tabItem.key}
              uniqueId={Tabs.uniqueId}
            >
              {tabItem.content}
            </TabPanel>
          </LazyMount>
        );
      });
      return newChildren;
    }
    return null;
  }

  renderWithPanel() {
    let { prefix, className, children, activeKey, activeId } = this.props;
    // 向上兼容
    activeId = activeId || activeKey;
    let tabListData = tabUtil.getTabListData(children, activeId);
    return (
      <div className={`${prefix}-tabs ${className}`}>
        {this.renderNav(tabListData)}
        <div className={`${prefix}-tabs-panewrap`}>
          {this.renderTabPanel(tabListData)}
        </div>
      </div>
    );
  }

  renderWithoutPanel() {
    let { tabs, prefix, className, activeId } = this.props;

    return (
      <div className={`${prefix}-tabs ${className}`}>
        {this.renderNav(tabs.map(tab => Object.assign({}, tab, { actived: tab.key === activeId })))}
      </div>
    );
  }

  render() {
    let { tabs } = this.props;
    if (tabs) {
      return this.renderWithoutPanel();
    }
    return this.renderWithPanel();
  }
}
