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
import SelectionCheckboxAll, {
  IGridSelctionAllCheckboxProps,
} from './SelectionCheckboxAll';
import {
  IGridColumn,
  IGridOnChangeConfig,
  GridScrollPosition,
  GridSortType,
  GridRowClassNameType,
  GridPaginationType,
  IGridPageInfo,
  IGridScrollDelta,
  IGridSelection,
  IGridExpandation,
  IGridRowClickHander,
  IGridOnExpandHandler,
  IGridInnerFixedType,
  IGridColumnBodyRenderFunc,
} from './types';
import { ICheckboxEvent } from '../checkbox';

function stopPropagation(e: React.MouseEvent) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

const prefix = 'zent';

export interface IGridProps<Data = any> {
  columns: IGridColumn[];
  datasets: Data[];
  rowKey?: string;
  onChange?: (conf: IGridOnChangeConfig) => any;
  scroll?: IGridScrollDelta;
  sortBy?: string;
  sortType?: GridSortType;
  defaultSortType?: GridSortType;
  emptyLabel?: React.ReactNode;
  selection?: IGridSelection<Data>;
  expandation?: IGridExpandation<Data>;
  loading?: boolean;
  bordered?: boolean;
  className?: string;
  rowClassName?: GridRowClassNameType<Data>;
  pageInfo?: IGridPageInfo;
  paginationType?: GridPaginationType;
  onRowClick?: IGridRowClickHander<Data>;
  ellipsis?: boolean;
  onExpand?: IGridOnExpandHandler<Data>;
  components?: {
    row?: React.ComponentType;
  };
  rowProps?: (data: Data, index: number) => any;
}

export interface IGridState {
  mouseOverRowIndex: number;
  fixedColumnsBodyRowsHeight: Array<number | string>;
  fixedColumnsHeadRowsHeight: Array<number | string>;
  fixedColumnsBodyExpandRowsHeight: Array<number | string>;
  expandRowKeys: boolean[];
}

export interface IGridInnerColumn<Data> extends IGridColumn<Data> {
  key?: string;
}

export class Grid<Data = any> extends PureComponent<
  IGridProps<Data>,
  IGridState
> {
  static defaultProps: Partial<IGridProps> = {
    className: '',
    bordered: false,
    datasets: [],
    columns: [],
    loading: false,
    paginationType: 'default',
    onChange: noop,
    rowKey: 'id',
    emptyLabel: '',
    scroll: {},
    onRowClick: noop,
    ellipsis: false,
    onExpand: noop,
  };

  mounted = false;
  checkboxPropsCache: {
    [key: string]: {
      disabled?: boolean;
    };
  } = {};
  store: Store = new Store();
  tableNode: HTMLDivElement | null = null;
  bodyTable: HTMLDivElement | null = null;
  leftBody: HTMLDivElement | null = null;
  rightBody: HTMLDivElement | null = null;
  scrollBody: HTMLDivElement | null = null;
  scrollHeader: HTMLDivElement | null = null;
  scrollPosition!: GridScrollPosition;
  lastScrollLeft!: number;
  lastScrollTop!: number;

  constructor(props: IGridProps<Data>) {
    super(props);

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

  getExpandRowKeys(props: IGridProps<Data>) {
    const { expandation, datasets } = props;
    if (expandation) {
      const { isExpanded } = expandation;
      const expandRowKeys = datasets.reduce<boolean[]>(
        (items, rowData, rowIndex) => {
          if (typeof isExpanded === 'function') {
            items[rowIndex] = isExpanded(rowData, rowIndex);
          } else {
            items[rowIndex] = false;
          }
          return items;
        },
        []
      );
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
      : (this.bodyTable as HTMLDivElement).querySelectorAll('thead');

    const fixedColumnsBodyRowsHeight = map(
      bodyRows,
      (row: Element) => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsHeadRowsHeight = map(
      headRows,
      (row: Element) => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsBodyExpandRowsHeight = map(
      expandRows,
      (row: Element) => row.getBoundingClientRect().height || 'auto'
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

  onChange = (conf: IGridOnChangeConfig) => {
    const params = assign({}, this.store.getState('conf'), conf);
    this.store.setState('conf');
    this.props.onChange && this.props.onChange(params);
  };

  onPaginationChange = (pageSize: number, current: number) => {
    this.props.onChange &&
      this.props.onChange({
        pageSize,
        current,
      });
  };

  getDataKey = (data: Data, rowIndex: number | string) => {
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
    const columns = this.store.getState('columns') || [];
    return columns.filter(
      column => column.fixed === 'left' || column.fixed === true
    );
  };

  getRightColumns = () => {
    const columns = this.store.getState('columns') || [];
    return columns.filter(column => column.fixed === 'right');
  };

  handleExpandRow = (clickRow: number, rowData: Data) => (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
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

  getExpandBodyRender: (
    expandRowKeys: boolean[]
  ) => IGridColumnBodyRenderFunc<Data> = (expandRowKeys: boolean[]) => (
    rowData,
    { row }
  ) => {
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

  getColumns = (
    props: IGridProps<Data>,
    columnsArg?: Array<IGridInnerColumn<Data>>,
    expandRowKeysArg?: boolean[]
  ) => {
    const { selection, datasets, expandation } = props || this.props;
    const isStoreColumns = !columnsArg;

    let columns: Array<IGridInnerColumn<Data>> = (
      columnsArg || this.store.getState('columns')
    ).slice();
    const expandRowKeys = expandRowKeysArg || this.state.expandRowKeys;
    const hasLeft = columns.some(
      column => column.fixed === 'left' || column.fixed === true
    );

    // 判断是否有多选
    if (selection) {
      const data = (datasets || []).filter((item, index) => {
        const rowIndex = this.getDataKey(item, index);

        if (selection.getCheckboxProps) {
          return !get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
        }
        return true;
      });

      const checkboxAllDisabled = every(data, (item, index) => {
        const rowIndex = this.getDataKey(item, index);
        return get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
      });

      const selectionColumn: IGridInnerColumn<Data> = {
        title: (
          <SelectionCheckboxAll
            store={this.store}
            datasets={data}
            getDataKey={this.getDataKey}
            onSelect={this.handleBatchSelect}
            disabled={checkboxAllDisabled}
          />
        ),
        key: 'selection-column',
        width: '20px',
        bodyRender: this.renderSelectionCheckbox(),
      };

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
      const expandColumn: IGridInnerColumn<Data> = {
        title: '',
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
    const node = this.bodyTable as HTMLDivElement;
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

  handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!this.mounted) {
      return;
    }

    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target as HTMLDivElement;
    const { scroll = {} } = this.props;
    const scrollTop = target.scrollTop;
    const { leftBody, rightBody, scrollBody } = this;

    if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
      if (this.scrollHeader && target === scrollBody) {
        this.scrollHeader.scrollLeft = target.scrollLeft;
      }
      if (
        this.scrollHeader &&
        this.scrollBody &&
        target === this.scrollHeader
      ) {
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

  onRowMouseEnter = (mouseOverRowIndex: number) => {
    this.setState({
      mouseOverRowIndex,
    });
  };

  getTable = (
    options: {
      columns?: Array<IGridInnerColumn<Data>>;
      fixed?: IGridInnerFixedType;
    } = {}
  ) => {
    const {
      datasets,
      scroll = {},
      sortType,
      sortBy,
      defaultSortType,
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
        sortType={sortType as GridSortType}
        scroll={scroll}
        sortBy={sortBy}
        defaultSortType={defaultSortType}
        fixedColumnsHeadRowsHeight={this.state.fixedColumnsHeadRowsHeight}
      />
    );

    const leafColumns = getLeafColumns(columns);

    const body = (
      <Body
        prefix={prefix}
        rowKey={rowKey as string}
        columns={leafColumns}
        datasets={datasets}
        expandRowKeys={expandRowKeys}
        mouseOverRowIndex={this.state.mouseOverRowIndex}
        onRowMouseEnter={this.onRowMouseEnter}
        rowClassName={rowClassName}
        onRowClick={onRowClick as IGridRowClickHander<Data>}
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
        overflowY: 'auto',
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
              (this as any)[`${fixed || 'scroll'}Body`] = ref;
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

  getEmpty = (i18n: Record<string, string>) => {
    const { datasets, emptyLabel } = this.props;

    if (size(datasets) === 0) {
      return (
        <div className={`${prefix}-grid-empty`} key="empty">
          {emptyLabel || i18n.emptyLabel}
        </div>
      );
    }
    return null;
  };

  getCheckboxPropsByItem = (data: Data, rowIndex: number) => {
    const { selection } = this.props;

    if (!selection || !selection.getCheckboxProps) {
      return {};
    }

    if (!this.checkboxPropsCache[rowIndex]) {
      this.checkboxPropsCache[rowIndex] = selection.getCheckboxProps(data);
    }
    return this.checkboxPropsCache[rowIndex];
  };

  onSelectChange = (selectedRowKeys: string[], data: Data | Data[]) => {
    const { datasets, selection } = this.props;
    const onSelect: IGridSelection<Data>['onSelect'] = get(
      selection,
      'onSelect'
    );

    if (isFunction(onSelect)) {
      const selectedRows = (datasets || []).filter((row, i) =>
        includes(selectedRowKeys, this.getDataKey(row, i))
      );
      onSelect(selectedRowKeys, selectedRows, data);
    }
  };

  handleSelect = (data: Data, rowIndex: string, e: ICheckboxEvent<unknown>) => {
    const checked = e.target.checked;

    let selectedRowKeys = this.store.getState('selectedRowKeys') || [];

    if (checked) {
      selectedRowKeys = selectedRowKeys.concat(rowIndex);
    } else {
      selectedRowKeys = selectedRowKeys.filter(i => rowIndex !== i);
    }

    this.store.setState({ selectedRowKeys });

    this.onSelectChange(selectedRowKeys, data);
  };

  handleBatchSelect: IGridSelctionAllCheckboxProps<Data>['onSelect'] = (
    type,
    data
  ) => {
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

    const changeRow = (data || []).filter((row, i) =>
      includes(changeRowKeys, this.getDataKey(row, i))
    );

    this.onSelectChange(selectedRowKeys, changeRow);
  };

  renderSelectionCheckbox: () => IGridColumnBodyRenderFunc<Data> = () => {
    return (data, { row }) => {
      const rowIndex = this.getDataKey(data, row);
      const props = this.getCheckboxPropsByItem(data, rowIndex);

      return (
        <span onClick={stopPropagation}>
          <SelectionCheckbox
            disabled={props.disabled}
            rowIndex={rowIndex}
            store={this.store}
            onChange={(e: ICheckboxEvent<unknown>) =>
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

  componentWillReceiveProps(nextProps: IGridProps<Data>) {
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
    const { loading, pageInfo = {}, paginationType, bordered } = this.props;
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
              paginationType={paginationType as GridPaginationType}
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
