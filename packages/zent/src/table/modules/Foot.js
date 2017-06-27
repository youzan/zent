import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.batchComponentsAutoFixed) {
      this.footStyleFixed = {
        height: ReactDOM.findDOMNode(this.batch).getBoundingClientRect().height
      };
    } else {
      this.footStyleFixed = {};
    }
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
      pageInfo = {},
      onPageChange,
      batchComponents,
      selection,
      current
    } = this.props;

    let { totalItem, pageSize, total, limit, maxPageToShow } = pageInfo;
    const { needSelect, selectedRows } = selection;
    let batchClassName = 'tfoot__batchcomponents';
    const shouldRenderFoot =
      (batchComponents && batchComponents.length > 0) ||
      Object.keys(pageInfo).length !== 0;

    if (this.props.batchComponentsAutoFixed) {
      batchClassName += ' tfoot__batchcomponents--fixed';
    }

    return (
      shouldRenderFoot &&
      <div className="tfoot clearfix" style={this.footStyleFixed}>
        <div className={batchClassName} ref={c => (this.batch = c)}>
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
              totalItem={totalItem || total}
              pageSize={pageSize || limit}
              maxPageToShow={maxPageToShow}
              onChange={onPageChange}
            />}
        </div>
      </div>
    );
  }
}
