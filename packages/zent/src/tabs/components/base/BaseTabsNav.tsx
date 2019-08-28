import * as React from 'react';
import { IBaseTabsNavProps } from '../../types';

abstract class BaseTabsNav<
  Id,
  InnerTab,
  TabsNavProps extends IBaseTabsNavProps<Id, InnerTab>
> extends React.PureComponent<TabsNavProps> {
  protected abstract typeName: string;

  onTabSelected = (id: Id) => {
    const { onChange } = this.props;
    onChange(id);
  };

  abstract transformTabDataList(tabDataList: InnerTab[]): InnerTab[];

  renderTabs() {
    const { tabDataList } = this.props;

    const renderDataList = this.transformTabDataList(tabDataList);

    return renderDataList.map(renderDataItem => {
      return this.renderTab(renderDataItem);
    });
  }

  abstract renderTab(data: InnerTab): React.ReactNode;
}

export default BaseTabsNav;
