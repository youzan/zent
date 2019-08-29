import * as React from 'react';
import BaseTabsNav from '../base/BaseTabsNav';
import cn from 'classnames';
import { IInnerTab, ITabsNavProps } from '../../types';
import { commonTransformTabData } from '../../utils';

abstract class CommonTabsNav<Id> extends BaseTabsNav<
  Id,
  IInnerTab<Id>,
  ITabsNavProps<Id>
> {
  protected scrollGroup: React.ElementType = 'div';

  get tabsNavCls() {
    const { stretch } = this.props;
    return cn('zent-tabs-nav', `zent-tabs-nav-type__${this.typeName}`, {
      ['zent-tabs-nav__stretch']: stretch,
    });
  }

  onTabDel = (id: Id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  renderNavExtraContent() {
    const { navExtraContent } = this.props;
    return navExtraContent ? (
      <div className="zent-tabs-nav-extra-content">{navExtraContent}</div>
    ) : null;
  }

  transformTabDataList(
    tabDataList: Array<IInnerTab<Id>>
  ): Array<IInnerTab<Id>> {
    const { candel } = this.props;
    return tabDataList.map(tabItem => commonTransformTabData(tabItem, candel));
  }

  render() {
    const navExtraContent = this.renderNavExtraContent();
    const ScrollGroupComp = this.scrollGroup;
    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content">
          <ScrollGroupComp className="zent-tabs-scroll" role="tablist">
            {this.renderTabs()}
          </ScrollGroupComp>
        </div>
        {navExtraContent}
      </div>
    );
  }
}

export default CommonTabsNav;
