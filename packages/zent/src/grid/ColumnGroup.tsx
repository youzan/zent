import * as React from 'react';
import { IColumnProps } from './Column';

interface IColumnGroupProps {
  children:
    | React.ReactElement<IColumnProps>
    | React.ReactElement<IColumnProps>[];
}

function ColumnGroup(props: IColumnGroupProps) {
  return null;
}

export default ColumnGroup;
