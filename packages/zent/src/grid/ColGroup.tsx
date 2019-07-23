import * as React from 'react';
import { PureComponent } from 'react';
import map from 'lodash-es/map';
import { getLeafColumns } from './utils';
import { IGridInnerColumn } from './Grid';

export interface IGridColGroupProps<Data> {
  columns: Array<IGridInnerColumn<Data>>;
}

class ColGroup<Data> extends PureComponent<IGridColGroupProps<Data>> {
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
