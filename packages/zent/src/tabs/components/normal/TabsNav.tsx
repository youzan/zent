import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NormalTab from './Tab';
import * as navUtils from '../../utils';
import BaseTabsNav from '../../impl/BaseTabsNav';

class NormalTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'normal';

  inkBarRef = React.createRef<HTMLSpanElement>();
  activeTabRef = React.createRef<NormalTab<Id>>();
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
    const activeTabDom = ReactDOM.findDOMNode(
      this.activeTabRef.current
    ) as HTMLElement;
    if (activeTabDom) {
      const activeTabInner = activeTabDom.children[0] as HTMLDivElement;
      let tWidth = navUtils.getOffsetWH(activeTabInner);
      const tLeft = navUtils.getOffsetLT(activeTabInner);
      let wrapLeft = navUtils.getOffsetLT(this.tabwrapRef.current);
      const cssStyle = window.getComputedStyle(activeTabInner);
      const paddingLeft = parseInt(cssStyle.paddingLeft || '', 10);
      const paddingRight = parseInt(cssStyle.paddingRight || '', 10);
      tWidth = tWidth - paddingLeft - paddingRight;
      wrapLeft -= paddingLeft;
      const inkBarEl = this.inkBarRef.current;
      if (inkBarEl) {
        inkBarEl.style.width = `${tWidth}px`;
        inkBarEl.style.left = `${tLeft - wrapLeft}px`;
      }
    }
  }

  renderTabs() {
    const renderData = navUtils.getRenderTabListData(this.props);
    return renderData.map(renderDataItem => {
      const refProp = renderDataItem.actived ? this.activeTabRef : undefined;
      return (
        <NormalTab<Id>
          onSelected={this.onTabSelected}
          onDelete={this.onTabDel}
          {...renderDataItem}
          id={renderDataItem.key}
          ref={refProp}
        >
          {renderDataItem.title}
        </NormalTab>
      );
    });
  }

  render() {
    const addBtn = this.renderAddBtn();
    const navExtraContent = this.renderNavExtraContent();

    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content" ref={this.navContentRef}>
          <div className="zent-tabs-scroll">
            <div
              className="zent-tabs-tab-wrapper"
              role="tablist"
              ref={this.tabwrapRef}
            >
              <span className="zent-tabs-nav-ink-bar" ref={this.inkBarRef} />
              <div>{this.renderTabs()}</div>
            </div>
          </div>
        </div>
        {navExtraContent}
        {addBtn}
      </div>
    );
  }
}

export default NormalTabsNav;
