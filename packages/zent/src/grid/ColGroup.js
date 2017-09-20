import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

class ColGroup extends (PureComponent || Component) {
  render() {
    const { columns } = this.props;

    const cols = map(columns, (c, index) => {
      const width = typeof c.width === 'number' ? `${c.width}px` : c.width;
      return <col key={c.key || index} style={{ width, minWidth: width }} />;
    });

    return <colgroup>{cols}</colgroup>;
  }
}

ColGroup.propTypes = {
  columns: PropTypes.array
};

export default ColGroup;
