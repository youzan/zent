import React, { PureComponent } from 'react';
import { Tabs } from 'zent';

const { TabPanel } = Tabs;

export default class TabsFilter extends PureComponent {
  handleTabChange = tabId => {
    const { onChange } = this.props;
    onChange(tabId);
  };

  render() {
    const { activeId, tabs } = this.props;
    return (
      <div className="trade-order-list__tab">
        <Tabs activeId={activeId} onTabChange={this.handleTabChange}>
          {tabs.map(({ value, text }) => (
            <TabPanel key={value} tab={text} id={value} />
          ))}
        </Tabs>
      </div>
    );
  }
}
