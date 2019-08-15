import * as React from 'react';
import * as navUtils from '../../utils';
import CardTab from './Tab';
import BaseTabsNav from '../../impl/BaseTabsNav';

class CardTabsNav<Id extends string | number = string> extends BaseTabsNav<Id> {
  protected typeName = 'card';

  renderTabs() {
    const renderData = navUtils.getRenderTabListData(this.props);
    return renderData.map(renderDataItem => {
      return (
        <CardTab<Id>
          onSelected={this.onTabSelected}
          onDelete={this.onTabDel}
          {...renderDataItem}
          id={renderDataItem.key}
        >
          {renderDataItem.title}
        </CardTab>
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

export default CardTabsNav;
