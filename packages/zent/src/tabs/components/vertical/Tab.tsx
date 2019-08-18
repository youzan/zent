import * as React from 'react';
import BaseTab from '../../impl/BaseTab';

class VerticalTab<Id extends string | number = string> extends BaseTab<Id> {
  protected typeName = 'vertical';

  render() {
    const { actived, disabled, children } = this.props;
    return (
      <div
        role="tab"
        className={this.tabsCls}
        aria-disabled={disabled}
        aria-selected={actived}
        onClick={this.onClick}
      >
        <div className="zent-tabs-tab-inner">{children}</div>
      </div>
    );
  }
}

export default VerticalTab;
