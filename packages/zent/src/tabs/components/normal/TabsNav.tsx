import * as React from 'react';
import NormalTab from './Tab';
import BaseTabsNav from '../../impl/BaseTabsNav';
import { IInnerTab } from '../../types';

class NormalTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'normal';

  renderTab(data: IInnerTab<Id>): React.ReactNode {
    return (
      <NormalTab<Id>
        onSelected={this.onTabSelected}
        onDelete={this.onTabDel}
        {...data}
        id={data.key}
      >
        {data.title}
      </NormalTab>
    );
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
