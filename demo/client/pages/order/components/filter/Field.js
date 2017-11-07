import React, { PureComponent } from 'react';
import cx from 'classnames';

export default class Field extends PureComponent {
  render() {
    const { label, content, className } = this.props;
    return (
      <div className={cx('trade-order-list__filter-field', className)}>
        <label className="trade-order-list__filter-label">{label}：</label>
        <div className="trade-order-list__filter-content">{content}</div>
      </div>
    );
  }
}
