import classnames from 'classnames';
import { emptyRender } from 'react-table';
import { expanderRender } from '../ui/ExpanderCell';
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
      Cell: ({ cell }) => expanderRender(cell),
      Headers: emptyRender,
    },
    ...columns,
  ];
}

function getCellProps(props, { cell, instance }) {
  const isExpanded = instance.expandation?.isExpanded(
    cell.row.original,
    cell.row.index
  );

  return [
    props,
    {
      expandable: cell.row.canExpand && isExpanded,
      ...cell.row.getToggleRowExpandedProps(),
      className: classnames(`${clsPrefix}-expandable-btn`, {
        [`${clsPrefix}-expand-btn`]: !isExpanded,
        [`${clsPrefix}-collapse-btn`]: isExpanded,
      }),
    },
  ];
}

useGridExpandation.pluginName = 'useGridExpandation';
