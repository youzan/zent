import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { getLeafColumns } from './utils';

class ColGroup extends PureComponent {
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

ColGroup.propTypes = {
  columns: PropTypes.array,
};

export default ColGroup;
