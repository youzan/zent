import CardTab from '../tab/CardTab';
import CommonTabsNav from './CommonTabsNav';
import { IInnerTab } from '../../types';

class CardTabsNav<
  Id extends string | number = string
> extends CommonTabsNav<Id> {
  protected typeName = 'card';

  state = {
    fixedIds: [],
  };

  get isFixedControlled() {
    return 'fixedIds' in this.props;
  }

  get fixedIds() {
    const ids = this.isFixedControlled
      ? this.props.fixedIds
      : this.state.fixedIds;
    return ids || [];
  }

  onFixedChange = (ids: Id[]) => {
    const { onFixedChange } = this.props;
    onFixedChange?.(ids);
    this.setState({ fixedIds: ids });
  };

  renderTab(data: IInnerTab<Id>): React.ReactNode {
    return (
      <CardTab<Id>
        onSelected={this.onTabSelected}
        onDelete={this.onTabDel}
        {...data}
        fixedIds={this.fixedIds}
        onFixedChange={this.onFixedChange}
        id={data.key}
      >
        {data.title}
      </CardTab>
    );
  }
}

export default CardTabsNav;
