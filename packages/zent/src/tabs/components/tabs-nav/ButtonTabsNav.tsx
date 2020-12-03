import ButtonTab from '../tab/ButtonTab';
import { IInnerTab } from '../../types';
import CommonTabsNav from './CommonTabsNav';

class ButtonTabsNav<
  Id extends string | number = string
> extends CommonTabsNav<Id> {
  protected typeName = 'button';

  renderTab(data: IInnerTab<Id>): React.ReactNode {
    return (
      <ButtonTab<Id>
        onSelected={this.onTabSelected}
        onDelete={this.onTabDel}
        {...data}
        id={data.key}
      >
        {data.title}
      </ButtonTab>
    );
  }
}

export default ButtonTabsNav;
