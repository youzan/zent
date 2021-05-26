import classnames from 'classnames';
import { actions, Hooks } from 'react-table';
import { clsPrefix } from '../constants';

actions.setSortType = 'setSortType';

export const useZentPlugin = (hooks: Hooks) => {
  hooks.getCellProps.push(getCellProps);
  hooks.getRowProps.push(getRowProps);
  hooks.useInstanceAfterData.push(useInstanceAfterData);
  hooks.getToggleAllRowsSelectedProps.push(getToggleAllRowsSelectedProps);
  // hooks.stateReducers.push(reducer);
  hooks.getHeaderProps.push(getHeaderProps);
};

function getCellProps(props, { cell }) {
  const className = classnames({
    [`${clsPrefix}-td-expand`]: cell.column.id === 'expander',
    [`${clsPrefix}__expanded`]: cell.row.isExpanded,
  });

  return [
    props,
    {
      className,
    },
  ];
}

function getRowProps(props, table) {
  const { row, instance } = table;
  const className = classnames({
    [`${clsPrefix}-tr__expanded`]: row.canExpand && row.isExpanded,
    [`${clsPrefix}-sub-tr`]: !instance?.preExpandedRows.some(
      item => item.id === row.id
    ),
  });
  return [
    props,
    {
      className,
    },
  ];
}

function useInstanceAfterData(instance) {
  const {
    selectedFlatRows = [],
    cachedAllSelectedRows = [],
    cachedSelectedRowIds = {},
  } = instance;
  const currentRows = [...cachedAllSelectedRows];
  const currentRowIds = { ...cachedSelectedRowIds };
  selectedFlatRows.forEach(item => {
    if (!cachedSelectedRowIds[item.id]) {
      currentRows.push(item);
      currentRowIds[item.id] = true;
    }
  });
  instance.cachedSelectedRowIds = currentRowIds;
  instance.cachedAllSelectedRows = currentRows;
}

function getToggleAllRowsSelectedProps(props, { instance }) {
  return [
    props,
    {
      indeterminate:
        !instance.isAllRowsSelected && instance.selectedFlatRows.length,
    },
  ];
}

// function reducer(state, action, _, instance) {
//   if (action.type === actions.init) {
//     return {
//       ...state,
//       sortType: instance.defaultSortType,
//     };
//   }
//   if (action.type === actions.setSortType) {
//     const { sortType } = state;
//     let currentSortType = '';

//     switch (sortType) {
//       case 'desc':
//         currentSortType = 'asc';
//         break;
//       case 'asc':
//         currentSortType = '';
//       default:
//         currentSortType = 'desc';
//         break;
//     }

//     return {
//       ...state,
//       sortType: currentSortType,
//     };
//   }
// }

function getSortType(sortType, defaultSortType) {
  const otherSortType = defaultSortType === 'desc' ? 'asc' : 'desc';
  switch (sortType) {
    case defaultSortType:
      return otherSortType;
    case otherSortType:
      return '';
    default:
      return defaultSortType;
  }
}

function getHeaderProps(props, { column, userProps }) {
  const { name, needSort } = column;
  const { sortType, sortBy, defaultSortType = 'desc' } = userProps;
  function handleSortTypeClick() {
    userProps.handleOnSortTypeClick({
      sortBy: name,
      sortType: sortType
        ? getSortType(sortType, defaultSortType)
        : defaultSortType,
    });
  }
  return [
    props,
    {
      onClick: () => handleSortTypeClick(),
    },
  ];
}

useZentPlugin.pluginName = 'useZentPlugin';
