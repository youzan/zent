import * as React from 'react';
import { Component } from 'react';
import LazyMount from '../utils/component/LazyMount';

import TabPanel from './components/TabPanel';
import Nav from './components/Nav';
import tabUtil from './tabUtil';

export interface ITab {
  key: string | number;
  title: string | number;
  disabled?: boolean;
}

export interface ITabsProps {
  activeId?: string | number;
  activeKey?: string | number;
  type?: 'normal' | 'card' | 'slider';
  size?: 'normal' | 'huge';
  align?: 'left' | 'right' | 'center';
  onChange?: (id: string | number) => void;
  onTabChange?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onTabDel?: (id: string | number) => void;
  onAdd?: () => void;
  onTabAdd?: () => void;
  candel?: boolean;
  canadd?: boolean;
  tabs?: ITab[];
  className?: string;
  prefix?: string;
  navExtraContent?: React.ReactNode;
}

export class Tabs extends Component<ITabsProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    type: 'normal',
    activeKey: '',
    activeId: '',
    size: 'normal',
    align: 'left',
    candel: false,
    canadd: false,
  };

  static uniqueId = 0;

  static TabPanel = TabPanel;

  constructor(props) {
    super(props);
    Tabs.uniqueId++;
  }

  // 选中tab
  onTabChange = selectKey => {
    const { onTabChange, onChange } = this.props;
    const onChangeFn = onChange || onTabChange;

    if (onChangeFn) {
      onChangeFn(selectKey);
    }
  };

  // 删除tab
  onTabDel = tabKey => {
    const { onTabDel, onDelete } = this.props;
    const onDeleteFn = onDelete || onTabDel;

    if (onDeleteFn) {
      onDeleteFn(tabKey);
    }
  };

  // 增加tab
  onTabAdd = () => {
    const { onTabAdd, onAdd } = this.props;
    const onAddFn = onAdd || onTabAdd;

    if (onAddFn) {
      onAddFn();
    }
  };

  renderNav(tabListData) {
    let {
      type,
      align,
      canadd,
      candel,
      prefix,
      size,
      navExtraContent,
    } = this.props;
    if (tabListData && tabListData.length) {
      return (
        <Nav
          onChange={this.onTabChange}
          tabListData={tabListData}
          type={type}
          align={align}
          size={size}
          onDelete={this.onTabDel}
          onTabAdd={this.onTabAdd}
          canadd={canadd}
          candel={candel}
          prefix={prefix}
          navExtraContent={navExtraContent}
          uniqueId={Tabs.uniqueId}
        />
      );
    }

    return null;
  }

  renderTabPanel(tabListData) {
    let { prefix } = this.props;
    let newChildren = [];
    if (tabListData && tabListData.length) {
      tabListData.forEach(tabItem => {
        newChildren.push(
          <LazyMount mount={tabItem.actived} key={tabItem.key}>
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
          tabs.map(tab => ({
            ...tab,
            actived: tab.key === activeId,
          }))
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

export default Tabs;
