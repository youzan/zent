import * as ReactDom from 'react-dom';
import { createRef, PureComponent } from 'react';
import classnames from 'classnames';
import isEqual from '../utils/isEqual';

import noop from '../utils/noop';
import measureScrollbar from '../utils/dom/measureScrollbar';
import { runOnceInNextFrame } from '../utils/nextFrame';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import { WindowScrollHandler } from '../utils/component/WindowScrollHandler';
import BatchComponents from './BatchComponents';
import {
  groupedColumns,
  getLeafColumns,
  needFixBatchComps,
  isElementInView,
  mapDOMNodes,
  getCompatSelectionPropsFn,
  getSelectAllCheckboxState,
} from './utils';
import { I18nReceiver as Receiver, II18nLocaleGrid } from '../i18n';
import BlockLoading from '../loading/BlockLoading';
import Store from './Store';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SelectionCheckbox from './SelectionCheckbox';
import SelectionRadio from './SelectionRadio';
import Affix from '../affix';
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
import { IRadioEvent } from '../radio';
import isBrowser from '../utils/isBrowser';
import { IBlockLoadingProps } from '../loading/props';
import { hasOwnProperty } from '../utils/hasOwn';
import isNil from '../utils/isNil';
import { Icon } from '../icon';

function stopPropagation(e: React.MouseEvent) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

const prefix = 'zent';
const BTN_WIDTH = 28;
const DEFAULT_SIZE = 'large';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IGridProps<Data = any, RowProps = {}, Key = string> {
  size?: 'medium' | 'large' | 'small';
  columns: IGridColumn[];
  datasets: ReadonlyArray<Data>;
  rowKey?: string;
  tableLayout?: 'auto' | 'fixed';
  onChange?: (conf: IGridOnChangeConfig) => any;
  scroll?: IGridScrollDelta;
  sortBy?: string;
  sortType?: GridSortType;
  defaultSortType?: GridSortType;
  emptyLabel?: React.ReactNode;
  selection?: IGridSelection<Data, Key>;
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
    row?: React.ComponentType<RowProps>;
  };
  rowProps?: (data: Data, index: number) => RowProps;
  batchRender?: IGridBatchRender;
  stickyBatch?: boolean;
  autoStick?: boolean;
  autoStickOffsetTop?: number;
  disableHoverHighlight?: boolean; // scroll时hover每次都会重绘，提供属性去禁用，这时hover就没有样式了
  loadingProps?: Omit<IBlockLoadingProps, 'loading'>;
}

export interface IGridState {
  mouseOverRowIndex: number;
  fixedColumnsBodyRowsHeight: Array<number | string>;
  fixedColumnsHeadRowsHeight: Array<number | string>;
  fixedColumnsBodyExpandRowsHeight: Array<number | string>;
  expandRowKeys: boolean[];
  showStickHead: boolean;
  tableWidth?: number;
  marginLeft?: string;
}

export interface IGridInnerColumn<Data> extends IGridColumn<Data> {
  key?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class Grid<
  Data = any,
  RowProps = Record<string, unknown>,
  Key = string
> extends PureComponent<IGridProps<Data, RowProps, Key>, IGridState> {
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
    autoStick: false,
    autoStickOffsetTop: 0,
    disableHoverHighlight: false,
  };

  mounted = false;
  selectionPropsCache: {
    [key: string]: {
      disabled?: boolean;
      reason?: React.ReactNode;
    };
  } = {};
  store: Store = new Store();
  gridNode = createRef<HTMLDivElement>();
  footNode = createRef<Footer>();
  footEl: Element;
  headerEl: Element;
  headerNode = createRef<Header<Data>>();
  bodyTable = createRef<HTMLDivElement>();
  leftBody = createRef<HTMLDivElement>();
  rightBody = createRef<HTMLDivElement>();
  scrollBody = createRef<HTMLDivElement>();
  scrollHeader = createRef<HTMLDivElement>();
  scrollPosition!: GridScrollPosition;
  lastScrollLeft!: number;
  lastScrollTop!: number;
  stickyHead = createRef<HTMLDivElement>();

  constructor(props: IGridProps<Data, RowProps, Key>) {
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
      showStickHead: false,
      tableWidth: undefined,
      marginLeft: undefined,
    };
  }

  getExpandRowKeys(props: IGridProps<Data, RowProps, Key>) {
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

    const bodyRows = this.bodyTable?.current?.querySelectorAll(
      `tbody .${prefix}-grid-tr`
    );
    const expandRows = this.bodyTable?.current?.querySelectorAll(
      `tbody .${prefix}-grid-tr__expanded`
    );
    const headRows = this.scrollHeader?.current
      ? this.scrollHeader?.current?.querySelectorAll('thead')
      : this.bodyTable?.current?.querySelectorAll('thead');

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

  isAnyColumnsFixed: () => boolean = () => {
    return this.store.getState('isAnyColumnsFixed', () =>
      (this.store.getState('columns') ?? []).some(column => !!column.fixed)
    );
  };

  isAnyColumnsLeftFixed: () => boolean = () => {
    return this.store.getState('isAnyColumnsLeftFixed', () =>
      (this.store.getState('columns') ?? []).some(
        column => column.fixed === 'left' || column.fixed === true
      )
    );
  };

  isAnyColumnsRightFixed: () => boolean = () => {
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

  handleExpandRow =
    (clickRow: number, rowData: Data) =>
    (e: React.MouseEvent<HTMLSpanElement>) => {
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
    expandRowKeys: boolean[],
    expandation: IGridExpandation
  ) => IGridColumnBodyRenderFunc<Data> =
    (expandRowKeys: boolean[], expandation: IGridExpandation) =>
    (rowData, pos) => {
      const { row } = pos;
      const { isExpandable = () => true } = expandation;

      return isExpandable(rowData, row) ? (
        <Icon
          type={expandRowKeys[row] ? 'up' : 'down'}
          className={`${prefix}-grid-expandable-btn`}
          onClick={this.handleExpandRow(row, rowData)}
        />
      ) : null;
    };

  getSelectionColumn(
    props: IGridProps<Data, RowProps, Key>,
    columnsArg?: Array<IGridInnerColumn<Data>>
  ) {
    const columns: Array<IGridInnerColumn<Data>> = (
      columnsArg || this.store.getState('columns')
    ).slice();
    const hasLeft = columns.some(
      column => column.fixed === 'left' || column.fixed === true
    );

    const { datasets, selection } = props || this.props;
    if (!selection) {
      return null;
    }

    let selectionColumn: IGridInnerColumn<Data> | null = null;
    if (selection.isSingleSelection) {
      // singleSelect
      selectionColumn = {
        title: '',
        key: 'selection-column-single',
        width: BTN_WIDTH,
        bodyRender: this.renderSelectionRadio(),
      };
    } else {
      // multi select
      const selectAllState = getSelectAllCheckboxState(
        datasets ?? [],
        this.getDataKey,
        (row, idx) => this.getSelectionPropsByItem(row, idx, selection)
      );

      selectionColumn = {
        title: (
          <SelectionCheckboxAll
            store={this.store}
            datasets={selectAllState.enabledRows}
            disabledDatasets={selectAllState.disabledRows}
            getDataKey={this.getDataKey}
            onSelect={this.handleBatchSelect}
            disabled={selectAllState.allDisabled}
          />
        ),
        key: 'selection-column',
        width: BTN_WIDTH,
        bodyRender: this.renderSelectionCheckbox(),
      };
    }

    if (hasLeft) {
      selectionColumn.fixed = 'left';
    }

    return selectionColumn;
  }

  getColumns = (
    props: IGridProps<Data, RowProps, Key>,
    columnsArg?: Array<IGridInnerColumn<Data>>,
    expandRowKeysArg?: boolean[]
  ) => {
    const { selection, expandation } = props || this.props;
    const isStoreColumns = !columnsArg;

    let columns: Array<IGridInnerColumn<Data>> = (
      columnsArg || this.store.getState('columns')
    ).slice();
    const expandRowKeys = expandRowKeysArg || this.state.expandRowKeys;
    const hasLeft = columns.some(
      column => column.fixed === 'left' || column.fixed === true
    );

    // 判断是否有选择
    if (selection) {
      const selectionColumn = this.getSelectionColumn(props, columnsArg);

      if (selectionColumn) {
        const selectionIndex = columns.findIndex(
          columns =>
            columns.key === 'selection-column' ||
            columns.key === 'selection-column-single'
        );
        if (selectionIndex !== -1) {
          columns[selectionIndex] = {
            ...columns[selectionIndex],
            ...selectionColumn,
          };
        } else {
          columns.unshift(selectionColumn);
        }
      }
    }

    // 判断是否展开
    if (expandation) {
      const expandColumn: IGridInnerColumn<Data> = {
        title: '',
        key: 'expand-column',
        width: BTN_WIDTH,
        bodyRender: this.getExpandBodyRender(expandRowKeys, expandation),
      };
      if (hasLeft) {
        expandColumn.fixed = 'left';
      }
      const expandIndex = columns.findIndex(
        columns => columns.key === expandColumn.key
      );
      if (expandIndex !== -1) {
        columns[expandIndex] = {
          ...columns[expandIndex],
          ...expandColumn,
        };
      } else {
        columns.unshift(expandColumn);
      }
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
      <BatchComponents<Data, Key>
        key="batch"
        position={position}
        store={this.store}
        onSelect={this.handleBatchSelect}
        datasets={datasets}
        getDataKey={this.getDataKey}
        prefix={prefix}
        batchRender={batchRender}
        selection={selection}
        selectionPropsCache={this.selectionPropsCache}
        rowKey={rowKey}
      />
    );
  };
  getLeftFixedTable = () => {
    return this.getTable({
      columns: this.getLeftColumns(),
      fixed: 'left',
      bodyRef: this.leftBody,
    });
  };

  getRightFixedTable = () => {
    return this.getTable({
      columns: this.getRightColumns(),
      fixed: 'right',
      bodyRef: this.rightBody,
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
    const node = this.bodyTable?.current;
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

  forceScroll = (
    target: EventTarget,
    distance: number,
    direction: 'Left' | 'Top'
  ) => {
    const scrollDirection = `scroll${direction}`;
    if (target && target[scrollDirection] !== distance) {
      target[scrollDirection] = distance;
    }
  };

  handleBodyScrollRunOnceNextFrame = runOnceInNextFrame(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!this.mounted) {
        return;
      }

      if (!this.isAnyColumnsFixed()) {
        return;
      }

      const target = e.target as HTMLDivElement;
      const { autoStick } = this.props;
      const { scrollTop, scrollLeft } = target;
      const leftBody = this.leftBody?.current;
      const rightBody = this.rightBody?.current;
      const scrollHeader = this.scrollHeader?.current;
      const stickyHead = this.stickyHead?.current;
      const bodyTable = this.bodyTable?.current;

      if (this.lastScrollLeft !== target.scrollLeft) {
        if (scrollHeader && target === scrollHeader) {
          this.forceScroll(bodyTable, scrollLeft, 'Left');
          autoStick && this.forceScroll(stickyHead, scrollLeft, 'Left');
        }

        if (bodyTable && target === bodyTable) {
          this.forceScroll(scrollHeader, scrollLeft, 'Left');
          autoStick && this.forceScroll(stickyHead, scrollLeft, 'Left');
        }

        if (autoStick && target === stickyHead) {
          this.forceScroll(bodyTable, scrollLeft, 'Left');
          this.forceScroll(scrollHeader, scrollLeft, 'Left');
        }
        this.lastScrollLeft = scrollLeft;
        this.setScrollPositionClassName();
      }

      if (this.lastScrollTop !== target.scrollTop) {
        if (leftBody && target === leftBody) {
          this.forceScroll(rightBody, scrollTop, 'Top');
          this.forceScroll(bodyTable, scrollTop, 'Top');
        }

        if (rightBody && target === rightBody) {
          this.forceScroll(leftBody, scrollTop, 'Top');
          this.forceScroll(bodyTable, scrollTop, 'Top');
        }

        if (bodyTable && target === bodyTable) {
          this.forceScroll(rightBody, scrollTop, 'Top');
          this.forceScroll(leftBody, scrollTop, 'Top');
        }
        this.lastScrollTop = target.scrollTop;
      }
    }
  );

  handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.persist();
    this.handleBodyScrollRunOnceNextFrame(e);
  };

  onResize = () => {
    this.syncFixedTableRowHeight();
    this.setScrollPositionClassName();
    this.toggleBatchComponents();
    this.setStickyHeadWidth();
  };

  onRowMouseEnter = (mouseOverRowIndex: number) => {
    this.setState({
      mouseOverRowIndex,
    });
  };

  getTable = (
    options: {
      columns?: Array<IGridInnerColumn<Data>>;
      fixed?: IGridInnerFixedType;
      isStickyHead?: boolean;
      headRef?: React.RefObject<HTMLDivElement>;
      bodyRef?: React.RefObject<HTMLDivElement>;
    } = {}
  ) => {
    const {
      size = DEFAULT_SIZE,
      datasets,
      scroll,
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
      disableHoverHighlight,
    } = this.props;
    const { fixed, isStickyHead } = options;
    const columns = options.columns || this.store.getState('columns');
    const { expandRowKeys } = this.state;
    let tableClassName = '';
    const bodyStyle: React.CSSProperties = {};
    const tableStyle: React.CSSProperties = {};

    if (fixed || !isNil(scroll.x)) {
      tableClassName = `${prefix}-grid-fixed`;
      bodyStyle.overflowX = isStickyHead ? 'hidden' : 'auto';
    }

    if (!fixed && !isNil(scroll.x)) {
      tableStyle.width = scroll.x;
    }
    const header = (
      <Header
        size={size}
        prefix={prefix}
        columns={columns}
        fixed={fixed}
        store={this.store}
        onChange={this.onChange}
        sortType={sortType}
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
        size={size}
        prefix={prefix}
        rowKey={rowKey}
        columns={leafColumns}
        datasets={datasets}
        expandRowKeys={expandRowKeys}
        mouseOverRowIndex={this.state.mouseOverRowIndex}
        onRowMouseEnter={this.onRowMouseEnter}
        rowClassName={rowClassName}
        onRowClick={onRowClick}
        fixed={fixed}
        hasFixedColumn={this.isAnyColumnsFixed()}
        scroll={scroll}
        expandRender={expandation && expandation.expandRender}
        fixedColumnsBodyRowsHeight={this.state.fixedColumnsBodyRowsHeight}
        fixedColumnsBodyExpandRowsHeight={
          this.state.fixedColumnsBodyExpandRowsHeight
        }
        components={components}
        rowProps={rowProps}
        disableHoverHighlight={disableHoverHighlight}
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
        if (!fixed && this.isAnyColumnsFixed() && x) {
          headStyle.marginBottom = -scrollbarWidth;
          headStyle.marginRight = scrollbarWidth;
        }
      } else {
        scrollBodyStyle.marginBottom = 0;
      }
      const table = [
        <div
          key="header"
          className={classnames(`${prefix}-grid-header`, {
            [`${prefix}-grid-sticky-header`]: options.isStickyHead,
          })}
          style={headStyle}
          ref={options.headRef}
          onScroll={this.handleBodyScroll}
        >
          {header}
        </div>,
      ];

      if (!options.isStickyHead) {
        table.push(
          <div key="body-outer" className={`${prefix}-grid-body-outer`}>
            <div
              key="body"
              className={`${prefix}-grid-body`}
              style={scrollBodyStyle}
              ref={options.bodyRef}
              onScroll={this.handleBodyScroll}
            >
              {body}
            </div>
          </div>
        );
      }
      return table;
    }
    return [
      <div
        style={bodyStyle}
        ref={options.bodyRef}
        onScroll={this.handleBodyScroll}
        key="table"
      >
        <table
          className={classnames(
            `${prefix}-grid-table ${prefix}-grid-table-${size}`,
            tableClassName,
            {
              [`${prefix}-grid-table-ellipsis`]: ellipsis,
            }
          )}
          style={tableStyle}
        >
          <ColGroup columns={columns} />
          {header}
          {options.isStickyHead ? null : body}
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

  getSelectionPropsByItem = (
    data: Data,
    rowIndex: number | string,
    nextSelection?: IGridSelection<Data, Key>
  ) => {
    const selection = nextSelection || this.props.selection;
    const getSelectionProps = getCompatSelectionPropsFn(selection);

    if (!getSelectionProps) {
      return {};
    }

    if (!this.selectionPropsCache[rowIndex]) {
      this.selectionPropsCache[rowIndex] = getSelectionProps(data);
    }

    return this.selectionPropsCache[rowIndex];
  };

  isFixedLayout = () => {
    const { tableLayout, columns = [], scroll = {}, ellipsis } = this.props;
    if (typeof tableLayout !== 'undefined') {
      return tableLayout === 'fixed';
    }

    if (columns.some(({ noWrap }) => !!noWrap) && ellipsis) {
      return true;
    }

    if (typeof scroll.x !== 'undefined' || typeof scroll.y !== 'undefined') {
      return true;
    }
    return false;
  };

  onSelectChange = (selectedRowKeys: Key[], data: Data | Data[]) => {
    const { datasets, selection } = this.props;
    const onSelect: IGridSelection<Data, Key>['onSelect'] = selection?.onSelect;

    if (typeof onSelect === 'function') {
      const selectedRows = (datasets || []).filter(
        (row, i) =>
          (selectedRowKeys ?? []).indexOf(this.getDataKey(row, i)) !== -1
      );
      onSelect(selectedRowKeys, selectedRows, data);
    }
  };

  handleSelect = (
    data: Data,
    rowIndex: string,
    e: ICheckboxEvent<unknown> | IRadioEvent<unknown>
  ) => {
    const { selection } = this.props;
    const { isSingleSelection } = selection;

    let checked = e.target.checked;
    // 处理半选状态下的取消
    if (e.target.type === 'checkbox' && e.target.indeterminate) {
      checked = false;
    }

    let selectedRowKeys = this.store.getState('selectedRowKeys') || [];

    if (isSingleSelection) {
      selectedRowKeys = [rowIndex];
    } else {
      if (checked) {
        selectedRowKeys = selectedRowKeys.concat(rowIndex);
      } else {
        selectedRowKeys = selectedRowKeys.filter(i => rowIndex !== i);
      }
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
        selectedRowKeys = (selectedRowKeys || []).filter(selectedRowKey => {
          return (data || []).every((key, index) => {
            const rowIndex = this.getDataKey(key, index);
            const match = selectedRowKey === rowIndex;
            if (match) {
              changeRowKeys.push(key);
            }
            return !match;
          });
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
      const props = this.getSelectionPropsByItem(data, rowIndex);

      return (
        <span
          onClick={stopPropagation}
          className="zent-grid-selection-checkbox"
        >
          <SelectionCheckbox
            {...props}
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

  renderSelectionRadio: () => IGridColumnBodyRenderFunc<Data> = () => {
    return (data, { row }) => {
      const rowIndex = this.getDataKey(data, row);
      const props = this.getSelectionPropsByItem(data, rowIndex);

      return (
        <span onClick={stopPropagation} className="zent-grid-selection-radio">
          <SelectionRadio
            {...props}
            rowIndex={rowIndex}
            store={this.store}
            onChange={(e: IRadioEvent<unknown>) =>
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

  onScroll = () => {
    this.toggleBatchComponents();
    const scrollLeft =
      document.body.scrollLeft ||
      document.documentElement.scrollLeft ||
      window.pageXOffset;
    if (this.props.autoStick) {
      const isTableInView = isElementInView(this.gridNode.current);
      const tableHeaderEl = ReactDom.findDOMNode(
        this.headerNode.current
      ) as Element;
      let offset = 0;
      if (tableHeaderEl && !offset) {
        const { height } = tableHeaderEl.getBoundingClientRect();
        offset = height;
      }
      const isHeaderInView = isElementInView(tableHeaderEl, offset);
      this.setState({
        showStickHead: !isHeaderInView && isTableInView,
        marginLeft: `-${scrollLeft}px`,
      });
    }
  };

  getStickyHead = () => {
    const content = [
      this.getTable({
        isStickyHead: true,
        headRef: this.stickyHead,
        bodyRef: this.stickyHead,
      }),

      this.isAnyColumnsLeftFixed() && (
        <div className={`${prefix}-grid-fixed-left`} key="left-sticky-head">
          {this.getTable({
            columns: this.getLeftColumns(),
            fixed: 'left',
            isStickyHead: true,
          })}
        </div>
      ),
      this.isAnyColumnsRightFixed() && (
        <div className={`${prefix}-grid-fixed-right`} key="right-sticky-head">
          {this.getTable({
            columns: this.getRightColumns(),
            fixed: 'right',
            isStickyHead: true,
          })}
        </div>
      ),
    ];

    const style: React.CSSProperties = {
      visibility: this.state.showStickHead ? 'visible' : 'hidden',
      height: this.state.showStickHead ? 'auto' : 0,
    };

    return this.isAnyColumnsFixed() ? (
      <div className={`${prefix}-grid-scroll`} style={style}>
        {content}
      </div>
    ) : (
      <div style={style}>{content}</div>
    );
  };

  setStickyHeadWidth = () => {
    if (this.props.autoStick && this.gridNode && this.gridNode.current) {
      const { scroll } = this.props;
      let { width } = this.gridNode.current.getBoundingClientRect();
      if (scroll && !isNil(scroll.x) && !isNil(scroll.y)) {
        width -= measureScrollbar();
      }
      this.setState({
        tableWidth: width,
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    this.setScrollPositionClassName();
    if (this.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
    }
    this.setStickyHeadWidth();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // 等重构再删了吧，改不动
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IGridProps<Data, RowProps, Key>) {
    if (nextProps.selection !== this.props.selection) {
      if (!nextProps.selection) {
        this.store.setState({
          columns: this.getColumns(nextProps, nextProps.columns),
        });
      }
    }

    if (
      nextProps.selection &&
      hasOwnProperty(nextProps.selection, 'selectedRowKeys')
    ) {
      this.store.setState({
        selectedRowKeys: nextProps.selection.selectedRowKeys || [],
        columns: this.getColumns(nextProps),
      });

      const { selection } = this.props;
      if (
        selection &&
        getCompatSelectionPropsFn(nextProps.selection) !==
          getCompatSelectionPropsFn(selection)
      ) {
        this.selectionPropsCache = {};
      }
    } else if (
      nextProps.selection?.isSingleSelection !==
      this.props.selection?.isSingleSelection
    ) {
      this.store.setState({
        columns: this.getColumns(nextProps),
      });
    }

    if (nextProps.columns && nextProps.columns !== this.props.columns) {
      this.store.setState({
        columns: this.getColumns(nextProps, nextProps.columns),
      });
    }

    if (
      hasOwnProperty(nextProps, 'datasets') &&
      nextProps.datasets !== this.props.datasets
    ) {
      this.selectionPropsCache = {};
      const expandRowKeys = this.getExpandRowKeys(nextProps);
      this.store.setState({
        columns: this.getColumns(nextProps, nextProps.columns, expandRowKeys),
      });
      this.setState({
        expandRowKeys,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isAnyColumnsFixed()) {
      if (this.props.scroll?.x !== prevProps.scroll?.x) {
        this.setScrollPositionClassName();
      }
      this.syncFixedTableRowHeight();
    }
  }

  render() {
    const {
      loading,
      pageInfo = {},
      paginationType,
      bordered,
      autoStick,
      autoStickOffsetTop,
      loadingProps = {},
      size,
    } = this.props;
    const { marginLeft, tableWidth, showStickHead } = this.state;

    const stickHeadWarpStyle: React.CSSProperties = {};

    if (autoStick) {
      stickHeadWarpStyle.width = tableWidth;
      stickHeadWarpStyle.marginLeft = marginLeft;
      stickHeadWarpStyle.visibility = showStickHead ? 'visible' : 'hidden';
    }

    let className = `${prefix}-grid`;
    const borderedClassName = bordered ? `${prefix}-grid-bordered` : '';
    className = classnames(className, this.props.className, borderedClassName, {
      [`${prefix}-grid-without-size`]: size === undefined,
      [`${prefix}-grid-fixed-layout`]: this.isFixedLayout(),
    });

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
            this.getTable({
              headRef: this.scrollHeader,
              bodyRef: this.bodyTable,
            }),
            this.getEmpty(i18n),
            <Footer
              ref={this.footNode}
              key="footer"
              prefix={prefix}
              pageInfo={pageInfo}
              paginationType={paginationType}
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
              <BlockLoading {...loadingProps} loading={loading}>
                {autoStick && (
                  <div
                    style={stickHeadWarpStyle}
                    className="zent-grid-sticky-header-warp"
                  >
                    <Affix offsetTop={autoStickOffsetTop}>
                      {this.getStickyHead()}
                    </Affix>
                  </div>
                )}
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
              <WindowScrollHandler
                onScroll={this.onScroll}
                options={{ capture: true }}
              />
            </div>
          );
        }}
      </Receiver>
    );
  }
}

export default Grid;
