import * as React from 'react';
import { IInnerTab } from '../../types';
import NormalTab from '../tab/NormalTab';
import CommonTabsNav from './CommonTabsNav';

class NormalTabsNav<Id extends string | number = string> extends CommonTabsNav<
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
}

export default NormalTabsNav;
