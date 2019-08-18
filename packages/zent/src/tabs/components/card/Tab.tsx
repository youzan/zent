import * as React from 'react';
import BaseTab from '../../impl/BaseTab';

class CardTab<Id extends string | number = string> extends BaseTab<Id> {
  protected typeName = 'card';
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
        <div className="zent-tabs-tab-inner">
          {children}
          {this.renderDelOperater()}
        </div>
      </div>
    );
  }
}

export default CardTab;
