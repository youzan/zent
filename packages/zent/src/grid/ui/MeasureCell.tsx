import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';
import { IGridColumn } from '../types';

interface ITableMeasureProps {
  onColumnsWidthChange: (column: IGridColumn, width: number) => void;
  columns: IGridColumn[];
}

const MeasureCells: React.FC<ITableMeasureProps> = props => {
  const { columns, onColumnsWidthChange } = props;
  const handleOnTdSizeChange = React.useCallback(
    (index, width) => {
      const column = columns[index];
      onColumnsWidthChange(column, width);
    },
    [columns, onColumnsWidthChange]
  );

  return (
    <tr>
      {props.columns.map((column: IGridColumn, index: number) => (
        <ResizeObserver
          key={index}
          onResize={({ width }) => handleOnTdSizeChange(index, width)}
        >
          <td />
        </ResizeObserver>
      ))}
    </tr>
  );
};
export default MeasureCells;
