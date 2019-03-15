import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import noop from 'lodash-es/noop';

import Tab from './Tab';
import navUtil from './navUtil';

export interface INavProps {
  prefix: string;
  tabListData: any[];
  onChange: (id: number | string) => void;
  type: string;
  align: string;
  size: string;
  onDelete: (id: number | string) => void;
  onTabAdd: () => void;
  candel: boolean;
  canadd: boolean;
  uniqueId: number;
  navExtraContent: React.ReactNode;
}

class Nav extends Component<INavProps> {
  static defaultProps = {
    prefix: 'zent',
    onChange: noop,
    tabListData: [],
    type: 'normal',
    align: 'left',
    size: 'normal',
    onDelete: noop,
    candel: false,
    canadd: false,
    onTabAdd: noop,
    uniqueId: 0,
  };

  inkBarDom: HTMLSpanElement | null = null;
  activeTab: Tab | null = null;
  navContentDom: HTMLDivElement | null = null;
  tabwrapDom: HTMLDivElement | null = null;

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    // 设置navContent的宽度
    this.positionInkBar();
  }

  positionInkBar() {
    const { type } = this.props;
    if (type === 'slider') {
      const activeTabDom = ReactDOM.findDOMNode(this.activeTab);
      if (activeTabDom) {
        const activeTabInner = (activeTabDom as any).children[0];
        const activeTabInnerContentDom = activeTabInner.children[0];
        const targetDom = activeTabInnerContentDom || activeTabInner;
        let tWidth = navUtil.getOffsetWH(targetDom);
        const tLeft = navUtil.getOffsetLT(targetDom);
        let wrapLeft = navUtil.getOffsetLT(this.tabwrapDom);
        if (!activeTabInnerContentDom) {
          const cssStyle = window.getComputedStyle(activeTabInner);
          const paddingLeft = parseInt(cssStyle.paddingLeft, 10);
          const paddingRight = parseInt(cssStyle.paddingRight, 10);
          tWidth = tWidth - paddingLeft - paddingRight;
          wrapLeft -= paddingLeft;
        }
        this.inkBarDom.style.width = `${tWidth}px`;
        this.inkBarDom.style.left = `${tLeft - wrapLeft}px`;
      }
    }
  }

  renderTabs() {
    const renderData = navUtil.modifyTabListData(this.props);
    const TabList = [];
    renderData.forEach(renderDataItem => {
      const refParam = {};
      if (renderDataItem.actived) {
        (refParam as any).ref = c => {
          this.activeTab = c;
        };
      }
      TabList.push(
        <Tab
          prefix={this.props.prefix}
          onSelected={this.onTabSelected}
          onDelete={this.onTabDel}
          uniqueId={this.props.uniqueId}
          {...renderDataItem}
          id={renderDataItem.key}
          {...refParam}
        >
          {renderDataItem.title}
        </Tab>
      );
    });
    return TabList;
  }

  onTabSelected = id => {
    const { onChange } = this.props;
    onChange(id);
  };

  onTabDel = id => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  onTabAdd = () => {
    const { onTabAdd } = this.props;
    onTabAdd();
  };

  render() {
    const { prefix, align, canadd, size, type, navExtraContent } = this.props;
    let classes = `${prefix}-tabs-size-${size} ${prefix}-tabs-type-${type} ${prefix}-tabs-align-${align}`;
    if (type === 'slider' && size === 'normal') {
      classes += ` ${prefix}-tabs-third-level`;
    }
    let addOperation = null;
    if (canadd && align !== 'center') {
      addOperation = (
        <div className={`${prefix}-tabs-nav-add`} onClick={this.onTabAdd}>
          <span>+</span>
        </div>
      );
    }

    let addNavCustomComponent = null;
    if (navExtraContent && align !== 'center') {
      addNavCustomComponent = (
        <div className={`${prefix}-tabs-nav-extra-content`}>
          {navExtraContent}
        </div>
      );
    }

    return (
      <div className={`${prefix}-tabs-nav ${classes}`}>
        <div
          className={`${prefix}-tabs-nav-content`}
          ref={r => {
            this.navContentDom = ReactDOM.findDOMNode(r) as HTMLDivElement;
          }}
        >
          {addOperation}
          {addNavCustomComponent}
          <div className={`${prefix}-tabs-scroll`}>
            <div
              className={`${prefix}-tabs-tabwrap`}
              role="tablist"
              ref={c => {
                this.tabwrapDom = c;
              }}
            >
              <span
                className={`${prefix}-tabs-nav-ink-bar`}
                ref={c => {
                  this.inkBarDom = c;
                }}
              />
              <div>{this.renderTabs()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
