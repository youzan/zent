import * as React from 'react';
import CardTab from '../tab/CardTab';
import CommonTabsNav from './CommonTabsNav';
import { IInnerTab } from '../../types';

class CardTabsNav<Id extends string | number = string> extends CommonTabsNav<
  Id
> {
  protected typeName = 'card';

  renderTab(data: IInnerTab<Id>): React.ReactNode {
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
}

export default CardTabsNav;
