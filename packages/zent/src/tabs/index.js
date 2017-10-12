import React, { Component, PureComponent } from 'react';
import assign from 'lodash/assign';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import TabPanel from './components/TabPanel';
import LazyMount from './components/LazyMount';
import Nav from './components/Nav';
import tabUtil from './tabUtil';

export default class Tabs extends (PureComponent || Component) {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.oneOf(['normal', 'card', 'slider']),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // 推荐使用activeId代替原来的activeKey
    // 更直观
    activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['huge', 'normal']),
    align: PropTypes.oneOf(['left', 'right', 'center']),
    onTabChange: PropTypes.func,
    onTabDel: PropTypes.func,
    onTabAdd: PropTypes.func,
    candel: PropTypes.bool,
    canadd: PropTypes.bool,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.node.isRequired,
        disabled: PropTypes.bool
      })
    )
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
      tabListData.forEach(tabItem => {
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
    // 因为defaultProps里面activeId和activeKey默认值为空，所以不应该用是否是undefined来处理
    activeId = activeId === '' ? activeKey : activeId;
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
        {this.renderNav(
          tabs.map(tab => assign({}, tab, { actived: tab.key === activeId }))
        )}
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
