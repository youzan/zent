import * as React from 'react';
import * as navUtils from '../../utils';
import BaseTabsNav from '../../impl/BaseTabsNav';
import { Button } from '../../../button';

class ButtonTabsNav<Id extends string | number = string> extends BaseTabsNav<
  Id
> {
  protected typeName = 'button';

  renderTabs() {
    const renderData = navUtils.getRenderTabListData(this.props);
    return renderData.map(renderDataItem => {
      const { key, actived, disabled, title, className } = renderDataItem;
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
    });
  }

  render() {
    const navExtraContent = this.renderNavExtraContent();

    return (
      <div className={this.tabsNavCls}>
        <div className={`zent-tabs-nav-content`}>
          <Button.Group>{this.renderTabs()}</Button.Group>
        </div>
        {navExtraContent}
      </div>
    );
  }
}

export default ButtonTabsNav;
