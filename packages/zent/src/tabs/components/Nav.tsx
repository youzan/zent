import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Tab from './Tab';
import * as navUtil from './navUtil';
import { ITabsNavProps } from '../types';

class TabsNav<Id extends string | number = string> extends React.PureComponent<
  ITabsNavProps<Id>
> {
  inkBarRef = React.createRef<HTMLSpanElement>();
  activeTabRef = React.createRef<Tab>();
  navContentRef = React.createRef<HTMLDivElement>();
  tabwrapRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.positionInkBar();
  }

  componentDidUpdate() {
    this.positionInkBar();
  }

  /**
   * 设置navContent的宽度
   */
  positionInkBar() {
    const { type } = this.props;
    if (type === 'slider') {
      const activeTabDom = ReactDOM.findDOMNode(
        this.activeTabRef.current
      ) as HTMLElement;
      if (activeTabDom) {
        const activeTabInner = activeTabDom.children[0];
        const activeTabInnerContentDom = activeTabInner.children[0];
        const targetDom = (activeTabInnerContentDom ||
          activeTabInner) as HTMLElement;
        let tWidth = navUtil.getOffsetWH(targetDom);
        const tLeft = navUtil.getOffsetLT(targetDom);
        let wrapLeft = navUtil.getOffsetLT(this.tabwrapRef
          .current as HTMLDivElement);
        if (!activeTabInnerContentDom) {
          const cssStyle = window.getComputedStyle(activeTabInner);
          const paddingLeft = parseInt(cssStyle.paddingLeft || '', 10);
          const paddingRight = parseInt(cssStyle.paddingRight || '', 10);
          tWidth = tWidth - paddingLeft - paddingRight;
          wrapLeft -= paddingLeft;
        }
        const inkBarEl = this.inkBarRef.current;
        if (inkBarEl) {
          inkBarEl.style.width = `${tWidth}px`;
          inkBarEl.style.left = `${tLeft - wrapLeft}px`;
        }
      }
    }
  }

  renderTabs() {
    const renderData = navUtil.modifyTabListData(this.props);
    const TabList: React.ReactNode[] = [];
    renderData.forEach(renderDataItem => {
      const refParam = {};
      if (renderDataItem.actived) {
        (refParam as any).ref = this.activeTabRef;
      }
      TabList.push(
        <Tab
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

  onTabSelected = (id: Id) => {
    const { onChange } = this.props;
    onChange(id);
  };

  onTabDel = (id: Id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  onTabAdd = () => {
    const { onAdd: onTabAdd } = this.props;
    onTabAdd();
  };

  render() {
    const { align, canadd, size, type, navExtraContent } = this.props;
    let classes = `zent-tabs-size-${size} zent-tabs-type-${type} zent-tabs-align-${align}`;
    if (type === 'slider' && size === 'normal') {
      classes += ` zent-tabs-third-level`;
    }
    let addOperation = null;
    if (canadd && align !== 'center') {
      addOperation = (
        <div className={`zent-tabs-nav-add`} onClick={this.onTabAdd}>
          <span>+</span>
        </div>
      );
    }

    let addNavCustomComponent = null;
    if (navExtraContent && align !== 'center') {
      addNavCustomComponent = (
        <div className={`zent-tabs-nav-extra-content`}>{navExtraContent}</div>
      );
    }

    return (
      <div className={`zent-tabs-nav ${classes}`}>
        <div className={`zent-tabs-nav-content`} ref={this.navContentRef}>
          {addOperation}
          {addNavCustomComponent}
          <div className={`zent-tabs-scroll`}>
            <div
              className={`zent-tabs-tabwrap`}
              role="tablist"
              ref={this.tabwrapRef}
            >
              <span className={`zent-tabs-nav-ink-bar`} ref={this.inkBarRef} />
              <div>{this.renderTabs()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TabsNav;
