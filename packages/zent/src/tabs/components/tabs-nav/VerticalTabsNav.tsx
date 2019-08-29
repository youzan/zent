import * as React from 'react';
import cn from 'classnames';
import VerticalTab from '../tab/VerticalTab';
import BaseTabsNav from '../base/BaseTabsNav';
import { IVerticalInnerTab, IVerticalTabsNavProps } from '../../types';
import { commonTransformTabData } from '../../utils';

class VerticalTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id,
  IVerticalInnerTab<Id>,
  IVerticalTabsNavProps<Id>
> {
  protected typeName = 'vertical';

  get tabsNavCls() {
    return cn('zent-tabs-nav', `zent-tabs-nav-type__${this.typeName}`);
  }

  transformTabDataList(
    tabDataList: Array<IVerticalInnerTab<Id>>
  ): Array<IVerticalInnerTab<Id>> {
    return tabDataList.map(tabItem => {
      if ('divide' in tabItem) {
        return tabItem;
      }
      return commonTransformTabData(tabItem, false);
    });
  }

  renderTab(data: IVerticalInnerTab<Id>, index: number): React.ReactNode {
    if ('divide' in data) {
      return <div key={`divide-${index}`} className="zent-tabs-divide" />;
    }
    return (
      <VerticalTab<Id> onSelected={this.onTabSelected} {...data} id={data.key}>
        {data.title}
      </VerticalTab>
    );
  }

  render() {
    const { scrollHeight: maxHeight } = this.props;
    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content">
          <div
            className="zent-tabs-scroll"
            style={{
              maxHeight,
            }}
            role="tablist"
          >
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }
}

export default VerticalTabsNav;
