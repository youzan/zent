import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';

import isNil from 'lodash-es/isNil';

import helper from '../helper';
import Pagination from '../../pagination';
import Checkbox from '../../checkbox';
import { TablePaginationType, ITablePageInfo } from '../Table';
import { PaginationChangeHandler } from '../../pagination/impl/BasePagination';
import LitePagination from '../../pagination/LitePagination';
import MiniPagination from '../../pagination/MiniPagination';
import AbstractPagination from '../../pagination/impl/AbstractPagination';
import { Class } from 'utility-types';

export interface ITableFootProps {
  pageInfo: ITablePageInfo;
  paginationType: TablePaginationType;
  batchComponentsFixed: boolean;
  onPageChange: PaginationChangeHandler;
  selection: {
    needSelect: boolean;
    isSingleSelection: boolean;
    onSelectAll: (isSelectAll: boolean) => any;
    selectedRows: any[];
    isSelectAll: boolean;
    isSelectPart: boolean;
  };
  batchComponents: any[];
  current: number;
}

export default class Foot extends PureComponent<ITableFootProps> {
  footStyleFixed: React.CSSProperties;
  batch: HTMLDivElement | null = null;

  // 拿到所有的选中的item
  renderBatchComps(selectedRows, batchComponents) {
    return batchComponents.map((comp, index) => {
      let subComponent;
      if (helper.isReactComponent(comp)) {
        const Comp = comp;
        subComponent = <Comp data={selectedRows} />;
      } else if (typeof comp === 'function') {
        subComponent = comp(selectedRows, index);
      } else {
        subComponent = comp;
      }

      return (
        <div className="subcomponent-wrapper" key={index}>
          {subComponent}
        </div>
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.batchComponentsFixed) {
      this.footStyleFixed = {
        height: (ReactDOM.findDOMNode(
          this.batch
        ) as Element).getBoundingClientRect().height,
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
      onPageChange,
      paginationType,
      batchComponents,
      selection,
      current,
    } = this.props;

    const pageInfo = this.props.pageInfo || {};

    const {
      // tslint:disable-next-line:deprecation
      totalItem,
      pageSize,
      total,
      // tslint:disable-next-line:deprecation
      limit,
      current: _,
      ...restPageInfo
    } = pageInfo;

    const { needSelect, selectedRows } = selection;
    let batchClassName = 'tfoot__batchcomponents';
    const shouldRenderFoot =
      (batchComponents && batchComponents.length > 0) ||
      Object.keys(pageInfo).length !== 0;

    if (batchComponents && batchComponents.length > 0) {
      batchClassName += ' tfoot__batchcomponents--has-children';
    }

    if (this.props.batchComponentsFixed) {
      batchClassName += ' tfoot__batchcomponents--fixed';
    }

    // 判断使用哪种 Pagination
    let PaginationComp: Class<AbstractPagination>;
    switch (paginationType) {
      case 'mini':
        PaginationComp = MiniPagination;
        break;
      case 'lite':
        PaginationComp = LitePagination;
        break;
      case 'default':
        PaginationComp = Pagination;
        break;
      default:
        PaginationComp = Pagination;
        break;
    }

    return (
      shouldRenderFoot && (
        <div className="tfoot clearfix" style={this.footStyleFixed}>
          <div className={batchClassName} ref={c => (this.batch = c)}>
            {needSelect && batchComponents && batchComponents.length > 0 && (
              <Checkbox
                className="select-check"
                onChange={this.onSelect}
                checked={selection.isSelectAll}
                indeterminate={selection.isSelectPart}
              />
            )}
            {batchComponents &&
              batchComponents.length > 0 &&
              this.renderBatchComps(selectedRows, batchComponents)}
          </div>
          <div className="tfoot__page">
            {Object.keys(pageInfo).length > 0 && (
              <PaginationComp
                current={current}
                total={isNil(total) ? totalItem : total}
                pageSize={isNil(pageSize) ? limit : pageSize}
                onChange={onPageChange}
                {...restPageInfo}
              />
            )}
          </div>
        </div>
      )
    );
  }
}
