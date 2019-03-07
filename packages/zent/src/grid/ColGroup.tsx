import * as React from 'react';
import { PureComponent } from 'react';
import map from 'lodash-es/map';
import { getLeafColumns } from './utils';
import { IGridColumn } from './types';

export interface IGridColGroupProps {
  columns: IGridColumn[];
}

class ColGroup extends PureComponent<IGridColGroupProps> {
  render() {
    const { columns } = this.props;

    const leafColumns = getLeafColumns(columns);

    const cols = map(leafColumns, (c, index) => {
      const width = typeof c.width === 'number' ? `${c.width}px` : c.width;
      return <col key={c.key || index} style={{ width, minWidth: width }} />;
    });

    return <colgroup>{cols}</colgroup>;
  }
}

export default ColGroup;
