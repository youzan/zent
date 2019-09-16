import * as React from 'react';
import { Button } from '../../../button';
import { IInnerTab } from '../../types';
import CommonTabsNav from './CommonTabsNav';

class ButtonTabsNav<Id extends string | number = string> extends CommonTabsNav<
  Id
> {
  protected typeName = 'button';

  protected scrollGroup: React.ElementType = Button.Group;

  renderTab(data: IInnerTab<Id>): React.ReactNode {
    const { key, actived, disabled, title, className } = data;
    return (
      <Button
        className={className}
        onClick={() => this.onTabSelected(key)}
        type="primary"
        key={key}
        outline={!actived}
        disabled={disabled}
      >
        {title}
      </Button>
    );
  }
}

export default ButtonTabsNav;
