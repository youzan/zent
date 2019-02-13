import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import map from 'lodash-es/map';
import { getLeafColumns } from './utils';

class ColGroup extends PureComponent<any> {
  static propTypes = {
    columns: PropTypes.array,
  };

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
