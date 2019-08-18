import * as React from 'react';
import cn from 'classnames';
import VerticalTab from './Tab';
import BaseTabsNav from '../../impl/BaseTabsNav';
import { IInnerTab } from '../../types';

class VerticalTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'vertical';

  get tabsNavCls() {
    // override to remove align classname
    return cn('zent-tabs-nav', `zent-tabs-nav-type__${this.typeName}`);
  }

  renderTab(data: IInnerTab<Id>): React.ReactNode {
    return (
      <VerticalTab<Id>
        onSelected={this.onTabSelected}
        onDelete={this.onTabDel}
        {...data}
        id={data.key}
      >
        {data.title}
      </VerticalTab>
    );
  }

  render() {
    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content">
          <div className="zent-tabs-scroll" role="tablist">
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }
}

export default VerticalTabsNav;
