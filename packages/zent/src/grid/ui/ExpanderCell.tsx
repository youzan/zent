import * as React from 'react';

export function expanderRender(cell) {
  const cellProps = cell.getCellProps();
  const { expandable, ...restProps } = cellProps;
  return expandable ? <span {...restProps}></span> : null;
}
