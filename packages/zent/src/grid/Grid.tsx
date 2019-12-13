import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PureComponent } from 'react';
import classnames from 'classnames';
import debounce from '../utils/debounce';
import isEqual from '../utils/isEqual';
import throttle from '../utils/throttle';

import noop from '../utils/noop';
import measureScrollbar from '../utils/dom/measureScrollbar';
import WindowResizeHandler from '../utils/component/WindowResizeHandler';
import WindowEventHandler from '../utils/component/WindowEventHandler';
import BatchComponents from './BatchComponents';
import {
  groupedColumns,
  getLeafColumns,
  needFixBatchComps,
  isElementInView,
  mapDOMNodes,
} from './utils';
import { I18nReceiver as Receiver, II18nLocaleGrid } from '../i18n';
import BlockLoading from '../loading/BlockLoading';
import Store from './Store';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SelectionCheckbox from './SelectionCheckbox';
import SelectionCheckboxAll, {
  IGridSelectionAllCheckboxProps,
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
  IGridRowClickHandler,
  IGridOnExpandHandler,
  IGridInnerFixedType,
  IGridColumnBodyRenderFunc,
  IGridBatchRender,
} from './types';
import { ICheckboxEvent } from '../checkbox';
import isBrowser from '../utils/isBrowser';

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
  onRowClick?: IGridRowClickHandler<Data>;
  ellipsis?: boolean;
  onExpand?: IGridOnExpandHandler<Data>;
  components?: {
    row?: React.ComponentType;
  };
  rowProps?: (data: Data, index: number) => any;
  batchRender?: IGridBatchRender;
  stickyBatch?: boolean;
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
    stickyBatch: false,
  };

  mounted = false;
  checkboxPropsCache: {
    [key: string]: {
      disabled?: boolean;
    };
  } = {};
  store: Store = new Store();
  gridNode = React.createRef<HTMLDivElement>();
  footNode = React.createRef<Footer>();
  footEl: Element;
  headerEl: Element;
  headerNode = React.createRef<Header<Data>>();
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
      selectedRowKeys: props?.selection?.selectedRowKeys,
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
    if (!this.mounted || !this.gridNode.current) {
      return;
    }

    const tableRect = this.gridNode.current.getBoundingClientRect();

    if (tableRect.height !== undefined && tableRect.height <= 0) {
      return;
    }

    const bodyRows = this.bodyTable?.querySelectorAll(
      `tbody .${prefix}-grid-tr`
    );
    const expandRows = this.bodyTable?.querySelectorAll(
      `tbody .${prefix}-grid-tr__expanded`
    );
    const headRows = this.scrollHeader
      ? this.scrollHeader.querySelectorAll('thead')
      : (this.bodyTable as HTMLDivElement).querySelectorAll('thead');

    const fixedColumnsBodyRowsHeight = mapDOMNodes(
      bodyRows,
      (row: Element) => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsHeadRowsHeight = mapDOMNodes(
      headRows,
      (row: Element) => row.getBoundingClientRect().height || 'auto'
    );
    const fixedColumnsBodyExpandRowsHeight = mapDOMNodes(
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
    const params = Object.assign({}, this.store.getState('conf'), conf);
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
    return rowKey ? data?.[rowKey] : rowIndex;
  };

  isAnyColumnsFixed = () => {
    return this.store.getState('isAnyColumnsFixed', () =>
      (this.store.getState('columns') ?? []).some(column => !!column.fixed)
    );
  };

  isAnyColumnsLeftFixed = () => {
    return this.store.getState('isAnyColumnsLeftFixed', () =>
      (this.store.getState('columns') ?? []).some(
        column => column.fixed === 'left' || column.fixed === true
      )
    );
  };

  isAnyColumnsRightFixed = () => {
    return this.store.getState('isAnyColumnsRightFixed', () =>
      (this.store.getState('columns') ?? []).some(
        column => column.fixed === 'right'
      )
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
    const expandRowKeys = (this.state.expandRowKeys ?? []).map((row, index) =>
      index === clickRow ? !row : row
    );
    this.store.setState({
      columns: this.getColumns(this.props, this.props.columns, expandRowKeys),
    });
    this.setState({
      expandRowKeys,
    });
    if (typeof onExpand === 'function') {
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
          return !this.getCheckboxPropsByItem(item, rowIndex)?.disabled;
        }
        return true;
      });

      const checkboxAllDisabled = data.every((item, index) => {
        const rowIndex = this.getDataKey(item, index);
        return this.getCheckboxPropsByItem(item, rowIndex)?.disabled;
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
        width: '44px',
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
        width: '44px',
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

  getBatchFixedStyle() {
    if (!isBrowser) {
      return {};
    }
    const el = ReactDom.findDOMNode(this.footNode.current) as Element;
    if (el && this.props.stickyBatch) {
      return {
        width: el.getBoundingClientRect().width,
      };
    }
    return {};
  }

  getBatchComponents = (position: 'header' | 'foot') => {
    const { datasets, batchRender, selection, rowKey } = this.props;
    return (
      <BatchComponents
        key="batch"
        position={position}
        store={this.store}
        onSelect={this.handleBatchSelect}
        datasets={datasets}
        getDataKey={this.getDataKey}
        prefix={prefix}
        batchRender={batchRender}
        selection={selection}
        checkboxPropsCache={this.checkboxPropsCache}
        rowKey={rowKey}
      />
    );
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

    if (this.gridNode.current) {
      const el = this.gridNode.current;
      if (position === 'both') {
        el.className = el.className.replace(
          new RegExp(`${prefix}-grid-scroll-position-.+$`, 'gi'),
          ' '
        );
        el.classList.add(`${prefix}-grid-scroll-position-left`);
        el.classList.add(`${prefix}-grid-scroll-position-right`);
      } else {
        el.className = el.className.replace(
          new RegExp(`${prefix}-grid-scroll-position-.+$`, 'gi'),
          ' '
        );
        el.classList.add(`${prefix}-grid-scroll-position-${position}`);
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

  onResize = debounce(() => {
    this.syncFixedTableRowHeight();
    this.toggleBatchComponents();
  }, 500);

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
        ref={this.headerNode}
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
        onRowClick={onRowClick as IGridRowClickHandler<Data>}
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

  getEmpty = (i18n: II18nLocaleGrid) => {
    const { datasets, emptyLabel } = this.props;

    if (!datasets || datasets.length === 0) {
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
    const onSelect: IGridSelection<Data>['onSelect'] = selection?.onSelect;

    if (typeof onSelect === 'function') {
      const selectedRows = (datasets || []).filter(
        (row, i) =>
          (selectedRowKeys ?? []).indexOf(this.getDataKey(row, i)) !== -1
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

  handleBatchSelect: IGridSelectionAllCheckboxProps<Data>['onSelect'] = (
    type,
    data
  ) => {
    let selectedRowKeys = (
      this.store.getState('selectedRowKeys') ?? []
    ).slice();

    const changeRowKeys = [];

    switch (type) {
      case 'selectAll':
        (data || []).forEach((key, index) => {
          const rowIndex = this.getDataKey(key, index);
          if (selectedRowKeys.indexOf(rowIndex) === -1) {
            selectedRowKeys = selectedRowKeys.concat(rowIndex);
            changeRowKeys.push(rowIndex);
          }
        });
        break;
      case 'removeAll':
        selectedRowKeys = (data || []).filter((key, index) => {
          const rowIndex = this.getDataKey(key, index);
          let rlt = true;
          if (selectedRowKeys.indexOf(rowIndex) !== -1) {
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

    const changeRow = (data || []).filter(
      (row, i) => changeRowKeys.indexOf(this.getDataKey(row, i)) !== -1
    );

    this.onSelectChange(selectedRowKeys, changeRow);
  };

  renderSelectionCheckbox: () => IGridColumnBodyRenderFunc<Data> = () => {
    return (data, { row }) => {
      const rowIndex = this.getDataKey(data, row);
      const props = this.getCheckboxPropsByItem(data, rowIndex);

      return (
        <span
          onClick={stopPropagation}
          className="zent-grid-selection-checkbox"
        >
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

  toggleBatchComponents = () => {
    const isSupportFixed = this.props.stickyBatch && this.props.batchRender;
    if (!this.mounted || !isSupportFixed) {
      return;
    }

    if (!this.footEl) {
      this.footEl = ReactDom.findDOMNode(this.footNode.current) as Element;
    }

    if (!this.headerEl) {
      this.headerEl = ReactDom.findDOMNode(this.headerNode.current) as Element;
    }

    const isTableInView = isElementInView(this.gridNode.current);
    const isHeaderInView = isElementInView(this.headerEl);
    const isFootInView = isElementInView(this.footEl);

    const batchNeedRenderFixed = needFixBatchComps(
      isTableInView,
      isHeaderInView,
      isFootInView
    );

    const batchRenderFixed = this.store.getState('batchRenderFixed');
    if (batchRenderFixed !== batchNeedRenderFixed) {
      this.store.setState({
        batchRenderFixed: batchNeedRenderFixed,
        batchRenderFixedStyles: this.getBatchFixedStyle(),
      });
    }
  };

  onScroll = throttle(this.toggleBatchComponents, 200);

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
    if (nextProps.selection?.hasOwnProperty('selectedRowKeys')) {
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
      nextProps.hasOwnProperty('datasets') &&
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
        {(i18n: II18nLocaleGrid) => {
          const content = [
            this.getTable(),
            this.getEmpty(i18n),
            <Footer
              ref={this.footNode}
              key="footer"
              prefix={prefix}
              pageInfo={pageInfo}
              paginationType={paginationType as GridPaginationType}
              onChange={this.onChange}
              onPaginationChange={this.onPaginationChange}
              batchComponents={this.getBatchComponents('foot')}
            />,
          ];

          const scrollTable = this.isAnyColumnsFixed() ? (
            <div className={`${prefix}-grid-scroll`}>{content}</div>
          ) : (
            content
          );

          return (
            <div className={className} ref={this.gridNode}>
              {this.getBatchComponents('header')}
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
              <WindowEventHandler
                eventName="scroll"
                callback={this.onScroll}
                useCapture
              />
            </div>
          );
        }}
      </Receiver>
    );
  }
}

export default Grid;
