import React, { Component } from 'react';
import Pagination from 'pagination';
import Checkbox from 'checkbox';

import helper from '../helper.js';

export default class Foot extends Component {
  // 拿到所有的选中的item
  renderBatchComps(selectedRows, batchComps) {
    return batchComps.map((comp, index) => {
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
      batchComps,
      selection,
      current
    } = this.props;

    const { needSelect, selectedRows } = selection;

    return (
      <div className="tfoot clearfix">
        <div className="tfoot__batchcomps">
          {needSelect &&
            <Checkbox
              className="select-check"
              onChange={this.onSelect}
              checked={selection.isSelectAll}
              indeterminate={selection.isSelectPart}
            />}
          {batchComps &&
            batchComps.length > 0 &&
            this.renderBatchComps(selectedRows, batchComps)}
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
