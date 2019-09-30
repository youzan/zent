import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import size from 'lodash-es/size';
import includes from 'lodash-es/includes';
import concat from 'lodash-es/concat';
import get from 'lodash-es/get';
import every from 'lodash-es/every';
import uniqBy from 'lodash-es/uniqBy';
import Pagination from '../pagination';
import LitePagination from '../pagination/LitePagination';
import {
  IGridOnChangeConfig,
  GridPaginationType,
  IGridPageInfo,
  IGridSelection,
} from './types';
import { IBatchComponentsProps } from './BatchComponents';
import { PaginationChangeHandler } from '../pagination/impl/BasePagination';
import MiniPagination from '../pagination/MiniPagination';
import BatchComponents from './BatchComponents';

const defaultPageInfo = {
  current: 1,
  pageSize: 10,
};

export interface IGridFooterProps extends IBatchComponentsProps {
  prefix: string;
  pageInfo: IGridPageInfo;
  paginationType: GridPaginationType;
  onChange: (conf: IGridOnChangeConfig) => any;
  onPaginationChange: (pageSize: number, current: number) => any;
  selection: IGridSelection;
  checkboxPropsCache: {
    [key: string]: {
      disabled?: boolean;
    };
  };
  rowKey: string;
}

interface IGridFooterState {
  selectedRows: any[];
}

class Footer extends PureComponent<IGridFooterProps, IGridFooterState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: this.getSelectedRows(),
    };
  }
  unsubscribe: any;
  state: IGridFooterState = {
    selectedRows: [],
  };

  hasPagination(props?: IGridFooterProps) {
    const { pageInfo } = props || this.props;
    return pageInfo && size(pageInfo);
  }

  getDefaultPagination(props?: IGridFooterProps) {
    const { pageInfo } = props || this.props;

    return this.hasPagination(props)
      ? {
          ...pageInfo,
          current: pageInfo.current || defaultPageInfo.current,
          pageSize: pageInfo.pageSize || defaultPageInfo.pageSize,
        }
      : null;
  }

  getSelectedRows = () => {
    const { datasets, getDataKey, store, rowKey } = this.props;
    const { selectedRows: prevSelectedRows } = this.state;
    const selectedRowKeys = store.getState('selectedRowKeys');
    const selectedRows = (datasets || []).filter((row, i) =>
      includes(selectedRowKeys, getDataKey(row, i))
    );
    return uniqBy(concat(prevSelectedRows, selectedRows), rowKey);
  };

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      this.setState({
        selectedRows: this.getSelectedRows(),
      });
    });
  };

  handlePageChange: PaginationChangeHandler = ({ pageSize, current }) => {
    this.setState({
      selectedRows: this.getSelectedRows(),
    });
    const { onPaginationChange } = this.props;
    onPaginationChange && onPaginationChange(pageSize, current);
  };

  getCheckboxPropsByItem = (data: any[], rowIndex: number | string) => {
    const { selection, checkboxPropsCache } = this.props;

    if (!selection || !selection.getCheckboxProps) {
      return {};
    }

    if (!checkboxPropsCache[rowIndex]) {
      checkboxPropsCache[rowIndex] = selection.getCheckboxProps(data);
    }
    return checkboxPropsCache[rowIndex];
  };

  getDataAndDisabled = () => {
    const { datasets, getDataKey, selection } = this.props;
    if (!selection) {
      return datasets;
    }
    return (datasets || []).filter((item, index) => {
      const rowIndex = getDataKey(item, index);

      if (selection.getCheckboxProps) {
        return !get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
      }
      return true;
    });
  };

  getCheckboxAllDisabled() {
    const { getDataKey, datasets } = this.props;
    return every(datasets, (item, index) => {
      const rowIndex = getDataKey(item, index);
      return get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
    });
  }

  componentDidMount() {
    const { selection, batchComponents } = this.props;
    if (selection && batchComponents.length > 0) {
      this.subscribe();
    }
  }

  componentWillMount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const {
      prefix,
      paginationType,
      store,
      onSelect,
      getDataKey,
      selection,
      batchComponents,
    } = this.props;
    const { selectedRows } = this.state;
    const curPageInfo = this.getDefaultPagination();
    const data = this.getDataAndDisabled();
    const disabled = this.getCheckboxAllDisabled();

    if (curPageInfo) {
      return (
        <div className={`${prefix}-grid-tfoot`}>
          {selection && batchComponents.length > 0 && (
            <BatchComponents
              store={store}
              onSelect={onSelect}
              datasets={data}
              getDataKey={getDataKey}
              prefix={prefix}
              batchComponents={batchComponents}
              selectedRows={selectedRows}
              disabled={disabled}
            />
          )}
          <div className={classnames(`${prefix}-grid-tfoot-page`)}>
            {paginationType === 'default' && (
              <Pagination {...curPageInfo} onChange={this.handlePageChange} />
            )}
            {paginationType === 'lite' && (
              <LitePagination
                {...curPageInfo}
                onChange={this.handlePageChange}
              />
            )}
            {paginationType === 'mini' && (
              <MiniPagination
                {...curPageInfo}
                onChange={this.handlePageChange}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Footer;
