import * as React from 'react';
import { clsPrefix } from '../constants';
import classnames from 'classnames';
import { actions, ensurePluginOrder } from 'react-table';

actions.setScrollPosition = 'setScrollPosition';

export const useFixedColumns = hooks => {
  hooks.useInstance.push(useInstance);
  hooks.stateReducers.push(reducer);
  hooks.visibleColumns.push(visibleColumns);
  hooks.getTableProps.push(getTableProps);
  hooks.getCellProps.push(getCellProps);
  hooks.getHeaderProps.push(getHeaderProps);
};

function defaultGetScrollProps(e, instance) {
  const onScroll = e => {
    const node = instance.tableRef.current;
    const isScrollToLeft = node.scrollLeft === 0;
    const isScrollToRight =
      node.scrollLeft + 1 >=
      node.children[0].getBoundingClientRect().width -
        node.getBoundingClientRect().width;
    switch (true) {
      case isScrollToLeft:
        instance.dispatch({
          type: actions.setScrollPosition,
          scrollPosition: 'left',
        });
        break;
      case isScrollToRight:
        instance.dispatch({
          type: actions.setScrollPosition,
          scrollPosition: 'right',
        });
        break;
      default:
        instance.dispatch({
          type: actions.setScrollPosition,
          scrollPosition: 'middle',
        });
        break;
    }
  };

  return {
    onScroll,
  };
}

function visibleColumns(columns, { instance }) {
  const copyColumns = [...columns];
  const fixedLeftColumns = copyColumns.filter(
    column => column.fixed && column.fixed !== 'right'
  );
  const fixedRightColumns = copyColumns.filter(
    column => column.fixed === 'right'
  );

  const noFixedColumns = copyColumns.filter(column => !column.fixed);
  let cacheLeftPosition = 0;
  let cacheRightPosition = 0;

  fixedLeftColumns.forEach((column, index) => {
    column.position = {
      left: `${cacheLeftPosition}px`,
    };
    column.isLastLeftFixedColumn = index === fixedLeftColumns.length - 1;
    cacheLeftPosition += column.width || 0;
  });

  fixedRightColumns.forEach((column, index) => {
    column.position = {
      right: `${cacheRightPosition}px`,
    };
    column.isFirstRightFixedColumn = index === 0;
    cacheRightPosition += column.width || 0;
  });

  return [
    ...fixedLeftColumns,
    ...noFixedColumns,
    ...fixedRightColumns,
  ].map(item => ({ ...item, isVisible: true }));
}

function getCommonProps(column) {
  const {
    position,
    fixed,
    isFirstRightFixedColumn,
    isLastLeftFixedColumn,
  } = column;
  const style: React.CSSProperties = {
    ...position,
  };

  if (fixed) {
    style.position = 'sticky';
  }
  return {
    style,
    className: classnames({
      [`${clsPrefix}-fixed ${clsPrefix}-fixed-${fixed}`]: !!fixed,
      [`${clsPrefix}-fixed ${clsPrefix}-fixed-${fixed}`]: !!fixed,
      [`${clsPrefix}-fixed-right-first`]: isFirstRightFixedColumn,
      [`${clsPrefix}-fixed-left-last`]: isLastLeftFixedColumn,
    }),
  };
}

function getCellProps(props, { cell }) {
  return [props, getCommonProps(cell.column)];
}

function getHeaderProps(props, { column }) {
  return [props, getCommonProps(column)];
}

function getTableProps(props, { instance }) {
  const style: React.CSSProperties = {};
  if (instance.scroll?.x) {
    style.width = instance.scroll.x;
  }

  if (instance.scroll?.y) {
    style.height = instance.scroll.y;
  }

  return [
    props,
    {
      style,
    },
  ];
}

function reducer(state, action) {
  if (action.type === actions.init) {
    return {
      ...state,
      scrollPosition: 'left',
    };
  }

  if (action.type === actions.setScrollPosition) {
    return {
      ...state,
      scrollPosition: action.scrollPosition,
    };
  }
}

function useInstance(instance) {
  const { visibleColumns, state, plugins } = instance;
  ensurePluginOrder(plugins, ['useHeadGroup'], 'useFixedColumns');
  const { scrollPosition } = state;
  const hasAnyColumnFixed = React.useMemo(() => {
    return visibleColumns.some(column => column.fixed);
  }, [visibleColumns]);

  const tableContainerCls = React.useMemo(() => {
    return classnames(clsPrefix, {
      [`${clsPrefix}-fixed`]: hasAnyColumnFixed,
      [`${clsPrefix}-scroll-position-${scrollPosition}`]: hasAnyColumnFixed,
    });
  }, [hasAnyColumnFixed, scrollPosition]);

  const tableContainerProps = React.useMemo(() => {
    return {
      className: tableContainerCls,
    };
  }, [tableContainerCls]);

  const getScrollProps = React.useCallback(
    e => {
      return defaultGetScrollProps(e, instance);
    },
    [instance]
  );

  Object.assign(instance, {
    tableContainerProps,
    getScrollProps,
  });
}

useFixedColumns.pluginName = 'useFixedColumns';
