import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import has from 'lodash-es/has';
import get from 'lodash-es/get';
import every from 'lodash-es/every';
import assign from 'lodash-es/assign';
import debounce from 'lodash-es/debounce';
import isEqual from 'lodash-es/isEqual';
import forEach from 'lodash-es/forEach';
import noop from 'lodash-es/noop';
import size from 'lodash-es/size';
import some from 'lodash-es/some';
import map from 'lodash-es/map';
import isFunction from 'lodash-es/isFunction';
import filter from 'lodash-es/filter';
import includes from 'lodash-es/includes';

import measureScrollbar from '../utils/dom/measureScrollbar';
import WindowResizeHandler from '../utils/component/WindowResizeHandler';
import { I18nReceiver as Receiver } from '../i18n';
import { groupedColumns, getLeafColumns } from './utils';
import BlockLoading from '../loading/BlockLoading';
import Store from './Store';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SelectionCheckbox from './SelectionCheckbox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import {
  IGridColumn,
  IGridOnChangeConfig,
  GridScrollPosition,
  GridSortType,
  GridRowClassNameType,
} from './types';
import { PaginationPageSizeOption } from '../pagination/components/PageSizeChanger';

function stopPropagation(e) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

export type GridPaginationType = 'default' | 'lite';

export interface IGridPageInfo {
  current?: number;
  total?: number;
  pageSize?: number;
  pageSizeOptions?: PaginationPageSizeOption[];
}

export interface IGridProps {
  columns: IGridColumn[];
  datasets: Array<{}>;
  rowKey?: string;
  onChange?: (conf: IGridOnChangeConfig) => any;
  scroll?: {
    x?: number;
    y?: number;
  };
  sortBy?: string;
  sortType?: GridSortType;
  emptyLabel?: string;
  selection?: {
    selectedRowKeys?: string[];
    onSelect?: (
      selectedkeys: string,
      selectedRows: any[],
      currentRow: number
    ) => any;
    getCheckboxProps?: (data: object) => { disabled?: boolean };
  };
  expandation?: {
    isExpanded?: (record: any, index: number) => boolean;
    expandRender?: (data: any) => React.ReactNode;
  };
  loading?: boolean;
  bordered?: boolean;
  className?: string;
  rowClassName?: GridRowClassNameType;
  prefix?: string;
  pageInfo?: IGridPageInfo;
  paginationType?: GridPaginationType;
  onRowClick?: (
    data: any,
    index: number,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => any;
  ellipsis?: boolean;
  onExpand?: (data: {
    expanded: boolean;
    data: any;
    event: React.MouseEvent<HTMLTableRowElement>;
    index: number;
  }) => any;
  components?: {
    row?: React.ReactNode;
  };
  rowProps?: (data: any, index: number) => any;
}

export class Grid extends PureComponent<IGridProps, any> {
  static defaultProps = {
    className: '',
    bordered: false,
    prefix: 'zent',
    datasets: [],
    columns: [],
    loading: false,
    pageInfo: false,
    paginationType: 'default',
    onChange: noop,
    expandation: null,
    selection: null,
    rowKey: 'id',
    emptyLabel: '',
    scroll: {},
    onRowClick: noop,
    ellipsis: false,
    onExpand: noop,
  };

  mounted: boolean;
  checkboxPropsCache: any;
  store: Store;
  tableNode: HTMLDivElement | null = null;
  bodyTable: HTMLDivElement | null = null;
  leftBody: HTMLDivElement | null = null;
  rightBody: HTMLDivElement | null = null;
  scrollBody: HTMLDivElement | null = null;
  scrollHeader: HTMLDivElement | null = null;
  scrollPosition: GridScrollPosition;
  lastScrollLeft: number;
  lastScrollTop: number;

  constructor(props) {
    super(props);

    this.mounted = false;
    this.checkboxPropsCache = {};
    this.store = new Store();
    const expandRowKeys = this.getExpandRowKeys(props);
    this.store.setState({
      columns: this.getColumns(props, props.columns, expandRowKeys),
      selectedRowKeys: get(props, 'selection.selectedRowKeys'),
    });
    this.setScrollPosition('both');

    this.state = {
      mouseOverRowIndex: -1,
      fixedColumnsBodyRowsHeight: [],
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyExpandRowsHeight: [],
      expandRowKeys,
    };
  }

  getExpandRowKeys(props) {
    const { expandation, datasets } = props;
    if (expandation) {
      const { isExpanded } = expandation;
      const expandRowKeys = datasets.reduce((items, rowData, rowIndex) => {
        if (typeof isExpanded === 'function') {
          items[rowIndex] = isExpanded(rowData, rowIndex);
        } else {
          items[rowIndex] = false;
        }

        return items;
      }, []);
      return expandRowKeys;
    }
    return [];
  }

  syncFixedTableRowHeight = () => {
    if (!this.mounted || !this.tableNode) {
      return;
    }

    const tableRect = this.tableNode.getBoundingClientRect();

    if (tableRect.height !== undefined && tableRect.height <= 0) {
      return;
    }

    const { prefix } = this.props;
    const bodyRows =
      (this.bodyTable &&
        this.bodyTable.querySelectorAll(`tbody .${prefix}-grid-tr`)) ||
      [];
    const expandRows =
      (this.bodyTable &&
        this.bodyTable.querySelectorAll(
          `tbody .${prefix}-grid-tr__expanded`
        )) ||
      [];
    const headRows = this.scrollHeader
      ? this.scrollHeader.querySelectorAll('thead')
      : this.bodyTable.querySelectorAll('thead');

    const fixedColumnsBodyRowsHeight = [].map.call(
      bodyRows,
      row => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsHeadRowsHeight = [].map.call(
      headRows,
      row => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsBodyExpandRowsHeight = [].map.call(
      expandRows,
      row => row.getBoundingClientRect().height || 'auto'
    );
    if (
      isEqual(
        this.state.fixedColumnsBodyRowsHeight,
        fixedColumnsBodyRowsHeight
      ) &&
      isEqual(
        this.state.fixedColumnsHeadRowsHeight,
        fixedColumnsHeadRowsHeight
      ) &&
      isEqual(
        this.state.fixedColumnsBodyExpandRowsHeight,
        fixedColumnsBodyExpandRowsHeight
      )
    ) {
      return;
    }

    this.setState({
      fixedColumnsBodyRowsHeight,
      fixedColumnsHeadRowsHeight,
      fixedColumnsBodyExpandRowsHeight,
    });
  };

  onChange = conf => {
    const params = assign({}, this.store.getState('conf'), conf);
    this.store.setState('conf');
    this.props.onChange(params);
  };

  onPaginationChange = (pageSize, current) => {
    this.props.onChange({
      pageSize,
      current,
    });
  };

  getDataKey = (data, rowIndex) => {
    const { rowKey } = this.props;
    return rowKey ? get(data, rowKey) : rowIndex;
  };

  isAnyColumnsFixed = () => {
    return this.store.getState('isAnyColumnsFixed', () =>
      some(this.store.getState('columns'), column => !!column.fixed)
    );
  };

  isAnyColumnsLeftFixed = () => {
    return this.store.getState('isAnyColumnsLeftFixed', () =>
      some(
        this.store.getState('columns'),
        column => column.fixed === 'left' || column.fixed === true
      )
    );
  };

  isAnyColumnsRightFixed = () => {
    return this.store.getState('isAnyColumnsRightFixed', () =>
      some(this.store.getState('columns'), column => column.fixed === 'right')
    );
  };

  getLeftColumns = () => {
    return filter(
      this.store.getState('columns'),
      column => column.fixed === 'left' || column.fixed === true
    );
  };

  getRightColumns = () => {
    return filter(
      this.store.getState('columns'),
      column => column.fixed === 'right'
    );
  };

  handleExpandRow = (clickRow, rowData) => e => {
    const { onExpand } = this.props;
    const expandRowKeys = map(this.state.expandRowKeys, (row, index) =>
      index === clickRow ? !row : row
    );
    this.store.setState({
      columns: this.getColumns(this.props, this.props.columns, expandRowKeys),
    });
    this.setState({
      expandRowKeys,
    });
    if (isFunction(onExpand)) {
      onExpand({
        expanded: expandRowKeys[clickRow],
        data: rowData,
        event: e,
        index: clickRow,
      });
    }
  };

  getExpandBodyRender = expandRowKeys => (rowData, { row }) => {
    const { prefix } = this.props;
    return (
      <span
        className={
          expandRowKeys[row]
            ? `${prefix}-grid-expandable-btn ${prefix}-grid-collapse-btn`
            : `${prefix}-grid-expandable-btn ${prefix}-grid-expand-btn`
        }
        onClick={this.handleExpandRow(row, rowData)}
      />
    );
  };

  getColumns = (props, columns?: any[], expandRowKeys?: string[]) => {
    const { selection, datasets, expandation } = props || this.props;
    const isStoreColumns = !columns;
    columns = (columns || this.store.getState('columns')).slice();
    expandRowKeys = expandRowKeys || this.state.expandRowKeys;
    const hasLeft = columns.some(
      column => column.fixed === 'left' || column.fixed === true
    );

    // 判断是否有多选
    if (selection) {
      const data = filter(datasets, (item, index) => {
        const rowIndex = this.getDataKey(item, index);

        if (selection.getCheckboxProps) {
          return !get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
        }
        return true;
      });

      const selectionColumn: any = {
        key: 'selection-column',
        width: '20px',
        bodyRender: this.renderSelectionCheckbox(),
      };

      const checkboxAllDisabled = every(data, (item, index) => {
        const rowIndex = this.getDataKey(item, index);
        return get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
      });

      selectionColumn.title = (
        <SelectionCheckboxAll
          store={this.store}
          datasets={data}
          getDataKey={this.getDataKey}
          onSelect={this.handleBatchSelect}
          disabled={checkboxAllDisabled}
        />
      );

      if (hasLeft) {
        selectionColumn.fixed = 'left';
      }

      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = { ...columns[0], ...selectionColumn };
      } else {
        columns.unshift(selectionColumn);
      }
    }

    // 判断是否展开
    if (expandation) {
      const expandColumn: any = {
        key: 'expand-column',
        width: '20px',
        bodyRender: this.getExpandBodyRender(expandRowKeys),
      };
      if (hasLeft) {
        expandColumn.fixed = 'left';
      }
      columns.unshift(expandColumn);
    }

    if (!isStoreColumns) {
      // 处理分组信息
      columns = groupedColumns(columns);
    }

    return columns;
  };

  getLeftFixedTable = () => {
    return this.getTable({
      columns: this.getLeftColumns(),
      fixed: 'left',
    });
  };

  getRightFixedTable = () => {
    return this.getTable({
      columns: this.getRightColumns(),
      fixed: 'right',
    });
  };

  setScrollPosition(position: GridScrollPosition) {
    this.scrollPosition = position;

    if (this.tableNode) {
      const { prefix } = this.props;
      if (position === 'both') {
        this.tableNode.className = this.tableNode.className.replace(
          new RegExp(`${prefix}-grid-scroll-position-.+$`, 'gi'),
          ' '
        );
        this.tableNode.classList.add(`${prefix}-grid-scroll-position-left`);
        this.tableNode.classList.add(`${prefix}-grid-scroll-position-right`);
      } else {
        this.tableNode.className = this.tableNode.className.replace(
          new RegExp(`${prefix}-grid-scroll-position-.+$`, 'gi'),
          ' '
        );
        this.tableNode.classList.add(
          `${prefix}-grid-scroll-position-${position}`
        );
      }
    }
  }

  setScrollPositionClassName() {
    const node = this.bodyTable;
    const scrollToLeft = node.scrollLeft === 0;
    const scrollToRight =
      node.scrollLeft + 1 >=
      node.children[0].getBoundingClientRect().width -
        node.getBoundingClientRect().width;
    if (scrollToLeft && scrollToRight) {
      this.setScrollPosition('both');
    } else if (scrollToLeft) {
      this.setScrollPosition('left');
    } else if (scrollToRight) {
      this.setScrollPosition('right');
    } else if (this.scrollPosition !== 'middle') {
      this.setScrollPosition('middle');
    }
  }

  handleBodyScroll = e => {
    if (!this.mounted) {
      return;
    }

    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target;
    const { scroll = {} } = this.props;
    const scrollTop = target.scrollTop;
    const { leftBody, rightBody, scrollBody } = this;

    if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
      if (this.scrollHeader && target === scrollBody) {
        this.scrollHeader.scrollLeft = target.scrollLeft;
      }
      if (this.scrollHeader && target === this.scrollHeader) {
        this.scrollBody.scrollLeft = target.scrollLeft;
      }
      this.setScrollPositionClassName();
    }
    this.lastScrollLeft = target.scrollLeft;
    if (target.scrollTop !== this.lastScrollTop && scroll.y) {
      if (leftBody && target !== leftBody) {
        leftBody.scrollTop = scrollTop;
      }
      if (rightBody && target !== rightBody) {
        rightBody.scrollTop = scrollTop;
      }
      if (scrollBody && target !== scrollBody) {
        scrollBody.scrollTop = scrollTop;
      }

      this.lastScrollTop = target.scrollTop;
    }
  };

  onResize = debounce(this.syncFixedTableRowHeight, 500);

  onRowMoverOver = mouseOverRowIndex => {
    this.setState({
      mouseOverRowIndex,
    });
  };

  getTable = (options: any = {}) => {
    const {
      prefix,
      datasets,
      scroll,
      sortType,
      sortBy,
      rowClassName,
      onRowClick,
      ellipsis,
      expandation,
      rowKey,
      components,
      rowProps,
    } = this.props;
    const { fixed } = options;
    const columns = options.columns || this.store.getState('columns');
    const { expandRowKeys } = this.state;
    let tableClassName = '';
    const bodyStyle: React.CSSProperties = {};
    const tableStyle: React.CSSProperties = {};

    if (fixed || scroll.x) {
      tableClassName = `${prefix}-grid-fixed`;
      bodyStyle.overflowX = 'auto';
    }

    if (!fixed && scroll.x) {
      tableStyle.width = scroll.x;
    }
    const header = (
      <Header
        prefix={prefix}
        columns={columns}
        fixed={fixed}
        store={this.store}
        onChange={this.onChange}
        sortType={sortType}
        scroll={scroll}
        sortBy={sortBy}
        fixedColumnsHeadRowsHeight={this.state.fixedColumnsHeadRowsHeight}
      />
    );

    const leafColumns = getLeafColumns(columns);

    const body = (
      <Body
        prefix={prefix}
        rowKey={rowKey}
        columns={leafColumns}
        datasets={datasets}
        expandRowKeys={expandRowKeys}
        mouseOverRowIndex={this.state.mouseOverRowIndex}
        onRowMoverOver={this.onRowMoverOver}
        rowClassName={rowClassName}
        onRowClick={onRowClick}
        fixed={fixed}
        scroll={scroll}
        expandRender={expandation && expandation.expandRender}
        fixedColumnsBodyRowsHeight={this.state.fixedColumnsBodyRowsHeight}
        fixedColumnsBodyExpandRowsHeight={
          this.state.fixedColumnsBodyExpandRowsHeight
        }
        components={components}
        rowProps={rowProps}
      />
    );
    const { y, x } = scroll;

    if (y) {
      const scrollbarWidth = measureScrollbar();
      const headStyle: React.CSSProperties = {};
      const scrollBodyStyle: React.CSSProperties = {
        maxHeight: y,
        overflowY: 'scroll',
      };
      if (scrollbarWidth > 0) {
        headStyle.paddingBottom = 0;
        if (!fixed && x) {
          headStyle.marginBottom = -scrollbarWidth;
        }
      } else {
        scrollBodyStyle.marginBottom = 0;
      }
      return [
        <div
          key="header"
          className={`${prefix}-grid-header`}
          style={headStyle}
          ref={ref => {
            if (!fixed) this.scrollHeader = ref;
          }}
          onScroll={this.handleBodyScroll}
        >
          {header}
        </div>,
        <div key="body-outer" className={`${prefix}-grid-body-outer`}>
          <div
            key="body"
            className={`${prefix}-grid-body`}
            style={scrollBodyStyle}
            ref={ref => {
              this[`${fixed || 'scroll'}Body`] = ref;
              if (!fixed) this.bodyTable = ref;
            }}
            onScroll={this.handleBodyScroll}
          >
            {body}
          </div>
        </div>,
      ];
    }
    return [
      <div
        style={bodyStyle}
        ref={ref => {
          if (!fixed) this.bodyTable = ref;
        }}
        onScroll={this.handleBodyScroll}
        key="table"
      >
        <table
          className={classnames(`${prefix}-grid-table`, tableClassName, {
            [`${prefix}-grid-table-ellipsis`]: ellipsis,
          })}
          style={tableStyle}
        >
          <ColGroup columns={columns} />
          {header}
          {body}
        </table>
      </div>,
    ];
  };

  getEmpty = i18n => {
    const { datasets, prefix, emptyLabel } = this.props;

    if (size(datasets) === 0) {
      return (
        <div className={`${prefix}-grid-empty`} key="empty">
          {emptyLabel || i18n.emptyLabel}
        </div>
      );
    }
    return null;
  };

  getCheckboxPropsByItem = (data, rowIndex) => {
    const { selection } = this.props;

    if (!get(selection, 'getCheckboxProps')) {
      return {};
    }

    if (!this.checkboxPropsCache[rowIndex]) {
      this.checkboxPropsCache[rowIndex] = selection.getCheckboxProps(data);
    }
    return this.checkboxPropsCache[rowIndex];
  };

  onSelectChange = (selectedRowKeys, data) => {
    const { datasets, selection } = this.props;
    const onSelect = get(selection, 'onSelect');

    if (isFunction(onSelect)) {
      const selectedRows = filter(datasets, (row, i) =>
        includes(selectedRowKeys, this.getDataKey(row, i))
      );
      onSelect(selectedRowKeys, selectedRows, data);
    }
  };

  handleSelect = (data, rowIndex, e) => {
    const checked = e.target.checked;

    let selectedRowKeys = this.store.getState('selectedRowKeys');

    if (checked) {
      selectedRowKeys = selectedRowKeys.concat(rowIndex);
    } else {
      selectedRowKeys = filter(selectedRowKeys, i => rowIndex !== i);
    }

    this.store.setState({ selectedRowKeys });

    this.onSelectChange(selectedRowKeys, data);
  };

  handleBatchSelect = (type, data) => {
    let selectedRowKeys = this.store.getState('selectedRowKeys').slice();

    const changeRowKeys = [];

    switch (type) {
      case 'selectAll':
        forEach(data, (key, index) => {
          const rowIndex = this.getDataKey(key, index);
          if (!includes(selectedRowKeys, rowIndex)) {
            selectedRowKeys = selectedRowKeys.concat(rowIndex);
            changeRowKeys.push(rowIndex);
          }
        });
        break;
      case 'removeAll':
        selectedRowKeys = (data || []).filter((key, index) => {
          const rowIndex = this.getDataKey(key, index);
          let rlt = true;
          if (includes(selectedRowKeys, rowIndex)) {
            rlt = false;
            changeRowKeys.push(key);
          }
          return rlt;
        });
        break;
      default:
        break;
    }

    this.store.setState({ selectedRowKeys });

    const changeRow = filter(data, (row, i) =>
      includes(changeRowKeys, this.getDataKey(row, i))
    );

    this.onSelectChange(selectedRowKeys, changeRow);
  };

  renderSelectionCheckbox = () => {
    return (data, { row }) => {
      const rowIndex = this.getDataKey(data, row);
      const props = this.getCheckboxPropsByItem(data, rowIndex);

      return (
        <span onClick={stopPropagation}>
          <SelectionCheckbox
            disabled={props.disabled}
            rowIndex={rowIndex}
            store={this.store}
            onChange={e =>
              this.handleSelect(data, this.getDataKey(data, row), e)
            }
          />
        </span>
      );
    };
  };

  componentDidMount() {
    this.mounted = true;
    this.setScrollPositionClassName();
    if (this.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selection && has(nextProps.selection, 'selectedRowKeys')) {
      this.store.setState({
        selectedRowKeys: nextProps.selection.selectedRowKeys || [],
        columns: this.getColumns(nextProps),
      });

      const { selection } = this.props;
      if (
        selection &&
        nextProps.selection.getCheckboxProps !== selection.getCheckboxProps
      ) {
        this.checkboxPropsCache = {};
      }
    }

    if (nextProps.columns && nextProps.columns !== this.props.columns) {
      this.store.setState({
        columns: this.getColumns(nextProps, nextProps.columns),
      });
    }

    if (
      has(nextProps, 'datasets') &&
      nextProps.datasets !== this.props.datasets
    ) {
      this.checkboxPropsCache = {};
      const expandRowKeys = this.getExpandRowKeys(nextProps);
      this.store.setState({
        columns: this.getColumns(nextProps, nextProps.columns, expandRowKeys),
      });
      this.setState({
        expandRowKeys,
      });
    }
  }

  componentDidUpdate() {
    if (this.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
    }
  }

  render() {
    const { prefix, loading, pageInfo, paginationType, bordered } = this.props;
    let className = `${prefix}-grid`;
    const borderedClassName = bordered ? `${prefix}-grid-bordered` : '';
    className = classnames(className, this.props.className, borderedClassName);

    if (this.scrollPosition === 'both') {
      className = classnames(
        className,
        `${prefix}-grid-scroll-position-left`,
        `${prefix}-grid-scroll-position-right`
      );
    } else {
      className = classnames(
        className,
        `${prefix}-grid-scroll-position-${this.scrollPosition}`
      );
    }

    return (
      <Receiver componentName="Grid">
        {i18n => {
          const content = [
            this.getTable(),
            this.getEmpty(i18n),
            <Footer
              key="footer"
              prefix={prefix}
              pageInfo={pageInfo}
              paginationType={paginationType}
              onChange={this.onChange}
              onPaginationChange={this.onPaginationChange}
            />,
          ];

          const scrollTable = this.isAnyColumnsFixed() ? (
            <div className={`${prefix}-grid-scroll`}>{content}</div>
          ) : (
            content
          );

          return (
            <div className={className} ref={node => (this.tableNode = node)}>
              <BlockLoading loading={loading}>
                {scrollTable}
                {this.isAnyColumnsLeftFixed() && (
                  <div className={`${prefix}-grid-fixed-left`}>
                    {this.getLeftFixedTable()}
                  </div>
                )}
                {this.isAnyColumnsRightFixed() && (
                  <div className={`${prefix}-grid-fixed-right`}>
                    {this.getRightFixedTable()}
                  </div>
                )}
              </BlockLoading>
              <WindowResizeHandler onResize={this.onResize} />
            </div>
          );
        }}
      </Receiver>
    );
  }
}

export default Grid;
