import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import noop from 'lodash-es/noop';

import Tab from './Tab';
import navUtil from './navUtil';

class Nav extends Component<any> {
  static propTypes = {
    prefix: PropTypes.string,
    tabListData: PropTypes.array,
    onChange: PropTypes.func,
    type: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.string,
    onDelete: PropTypes.func,
    onTabAdd: PropTypes.func,
    candel: PropTypes.bool,
    canadd: PropTypes.bool,
    uniqueId: PropTypes.number,
    navExtraContent: PropTypes.node,
  };

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
  activeTab: Tab | null = null
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
    let { type } = this.props;
    if (type === 'slider') {
      let activeTabDom = ReactDOM.findDOMNode(this.activeTab);
      if (activeTabDom) {
        let activeTabInner = (activeTabDom as any).children[0];
        let activeTabInnerContentDom = activeTabInner.children[0];
        let targetDom = activeTabInnerContentDom || activeTabInner;
        let tWidth = navUtil.getOffsetWH(targetDom);
        let tLeft = navUtil.getOffsetLT(targetDom);
        let wrapLeft = navUtil.getOffsetLT(this.tabwrapDom);
        if (!activeTabInnerContentDom) {
          let cssStyle = window.getComputedStyle(activeTabInner);
          let paddingLeft = parseInt(cssStyle.paddingLeft);
          let paddingRight = parseInt(cssStyle.paddingRight);
          tWidth = tWidth - paddingLeft - paddingRight;
          wrapLeft -= paddingLeft;
        }
        this.inkBarDom.style.width = `${tWidth}px`;
        this.inkBarDom.style.left = `${tLeft - wrapLeft}px`;
      }
    }
  }

  renderTabs() {
    let renderData = navUtil.modifyTabListData(this.props);
    let TabList = [];
    renderData.forEach(renderDataItem => {
      let refParam = {};
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
    let { onChange } = this.props;
    onChange(id);
  };

  onTabDel = id => {
    let { onDelete } = this.props;
    onDelete(id);
  };

  onTabAdd = () => {
    let { onTabAdd } = this.props;
    onTabAdd();
  };

  render() {
    let { prefix, align, canadd, size, type, navExtraContent } = this.props;
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
