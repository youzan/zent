import * as React from 'react';
import { IBaseTabsNavProps } from '../../types';

abstract class BaseTabsNav<
  Id,
  InnerTab,
  TabsNavProps extends IBaseTabsNavProps<Id, InnerTab>
> extends React.PureComponent<TabsNavProps> {
  protected abstract typeName: string;

  abstract transformTabDataList(tabDataList: InnerTab[]): InnerTab[];
  abstract renderTab(data: InnerTab, index: number): React.ReactNode;

  onTabSelected = (id: Id) => {
    const { onChange } = this.props;
    onChange(id);
  };

  renderTabs() {
    const { tabDataList } = this.props;

    const renderDataList = this.transformTabDataList(tabDataList);

    return renderDataList.map(this.renderTab, this);
  }
}

export default BaseTabsNav;
