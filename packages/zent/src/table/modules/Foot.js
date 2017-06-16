import React, { Component, PureComponent } from 'react';
import Pagination from 'pagination';
import Checkbox from 'checkbox';

import helper from '../helper.js';

export default class Foot extends (PureComponent || Component) {
  // 拿到所有的选中的item
  renderBatchComps(selectedRows, batchComponents) {
    return batchComponents.map((comp, index) => {
      if (helper.isReactComponent(comp)) {
        const Comp = comp;
        return <Comp key={index} data={selectedRows} />;
      }
      if (typeof comp === 'function') {
        return comp(selectedRows, index);
      }
      return comp;
    });
  }

  onSelect = e => {
    let isChecked = false;
    if (e.target.checked) {
      isChecked = true;
    }

    this.props.selection.onSelectAll(isChecked);
  };

  render() {
    const {
      pageInfo,
      onPageChange,
      batchComponents,
      selection,
      current
    } = this.props;

    const { needSelect, selectedRows } = selection;
    const shouldRenderFoot =
      (batchComponents && batchComponents.length > 0) || !!pageInfo;
    return (
      shouldRenderFoot &&
      <div className="tfoot clearfix">
        <div className="tfoot__batchcomponents">
          {needSelect &&
            batchComponents &&
            batchComponents.length > 0 &&
            <Checkbox
              className="select-check"
              onChange={this.onSelect}
              checked={selection.isSelectAll}
              indeterminate={selection.isSelectPart}
            />}
          {batchComponents &&
            batchComponents.length > 0 &&
            this.renderBatchComps(selectedRows, batchComponents)}
        </div>
        <div className="tfoot__page">
          {pageInfo &&
            <Pagination
              current={current}
              totalItem={pageInfo.total}
              pageSize={pageInfo.limit}
              maxPageToShow={pageInfo.maxPageToShow}
              onChange={onPageChange}
            />}
        </div>
      </div>
    );
  }
}
