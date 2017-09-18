import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

class ColGroup extends (PureComponent || Component) {
  render() {
    const { columns } = this.props;

    const cols = map(columns, (c, index) => (
      <col key={c.key || index} style={{ width: c.width, minWidth: c.width }} />
    ));

    return <colgroup>{cols}</colgroup>;
  }
}

ColGroup.propTypes = {
  columns: PropTypes.array
};

export default ColGroup;
