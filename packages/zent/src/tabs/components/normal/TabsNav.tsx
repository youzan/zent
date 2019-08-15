import * as React from 'react';
import NormalTab from './Tab';
import * as navUtils from '../../utils';
import BaseTabsNav from '../../impl/BaseTabsNav';

class NormalTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'normal';

  renderTabs() {
    const renderData = navUtils.getRenderTabListData(this.props);
    return renderData.map(renderDataItem => {
      return (
        <NormalTab<Id>
          onSelected={this.onTabSelected}
          onDelete={this.onTabDel}
          {...renderDataItem}
          id={renderDataItem.key}
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
        <div className="zent-tabs-nav-content">
          <div className="zent-tabs-scroll" role="tablist">
            {this.renderTabs()}
          </div>
        </div>
        {navExtraContent}
        {addBtn}
      </div>
    );
  }
}

export default NormalTabsNav;
