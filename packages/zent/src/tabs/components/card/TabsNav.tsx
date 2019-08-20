import * as React from 'react';
import CardTab from './Tab';
import BaseTabsNav from '../base/BaseTabsNav';

class CardTabsNav<Id extends string | number = string> extends BaseTabsNav<Id> {
  protected typeName = 'card';

  renderTab(data: import('../..').IInnerTab<Id>): React.ReactNode {
    return (
      <CardTab<Id>
        onSelected={this.onTabSelected}
        onDelete={this.onTabDel}
        {...data}
        id={data.key}
      >
        {data.title}
      </CardTab>
    );
  }

  render() {
    const navExtraContent = this.renderNavExtraContent();

    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content">
          <div className="zent-tabs-scroll" role="tablist">
            {this.renderTabs()}
          </div>
        </div>
        {navExtraContent}
      </div>
    );
  }
}

export default CardTabsNav;
