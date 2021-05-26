import classnames from 'classnames';
import { emptyRenderer } from 'react-table';
import { clsPrefix } from '../constants';

export const useGridExpandation = hooks => {
  hooks.visibleColumns.push(visibleColumns);
  hooks.getCellProps.push(getCellProps);
};

function visibleColumns(columns, { instance }) {
  return [
    {
      id: 'expander',
      width: '40px',
      isVisible: true,
      Cell: 
      Head: emptyRenderer,
    },
    ...columns,
  ];
}

function getCellProps(props, { cell }) {
  console.log(cell);
  return [
    props,
    {
      ...cell.getToggleRowExpandedProps,
      className: classnames(`${clsPrefix}-expandable-btn`, {
        [`${clsPrefix}-expand-btn`]: !cell.isExpanded,
        [`${clsPrefix}-collapse-btn`]: cell.isExpanded,
      }),
    },
  ];
}

useGridExpandation.pluginName = 'useGridExpandation';
