import * as React from 'react';
import cn from 'classnames';
import { ITabsNavProps, IInnerTab } from '../../types';
import { getRenderTabListData } from './utils';

abstract class BaseTabsNav<
  Id extends string | number = string
> extends React.PureComponent<ITabsNavProps<Id>> {
  protected abstract typeName: string;

  get tabsNavCls() {
    const { align, stretch } = this.props;
    return cn(
      'zent-tabs-nav',
      `zent-tabs-nav-align__${align}`,
      `zent-tabs-nav-type__${this.typeName}`,
      { ['zent-tabs-nav__stretch']: stretch }
    );
  }

  onTabSelected = (id: Id) => {
    const { onChange } = this.props;
    onChange(id);
  };

  onTabDel = (id: Id) => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  renderNavExtraContent() {
    const { navExtraContent, navExtraContentAlign } = this.props;
    const cls = cn(
      'zent-tabs-nav-extra-content',
      `zent-tabs-nav-extra-content-align__${navExtraContentAlign}`
    );
    return navExtraContent ? (
      <div className={cls}>{navExtraContent}</div>
    ) : null;
  }

  renderTabs() {
    const listData = getRenderTabListData(this.props);
    return listData.map(renderDataItem => {
      return this.renderTab(renderDataItem);
    });
  }

  abstract renderTab(data: IInnerTab<Id>): React.ReactNode;
}

export default BaseTabsNav;
