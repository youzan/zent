import * as React from 'react';
import BaseTabsNav from '../base/BaseTabsNav';
import { Button } from '../../../button';
import { IInnerTab } from '../../types';

class ButtonTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'button';

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

  render() {
    const navExtraContent = this.renderNavExtraContent();

    return (
      <div className={this.tabsNavCls}>
        <div className="zent-tabs-nav-content">
          <Button.Group className="zent-tabs-scroll">
            {this.renderTabs()}
          </Button.Group>
        </div>
        {navExtraContent}
      </div>
    );
  }
}

export default ButtonTabsNav;
