import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OldTree from './Tree';
import NewTree from './new/Tree';

export default class Tree extends PureComponent {
  static propTypes = {
    useNew: PropTypes.bool,
  };

  static defaultProps = {
    useNew: false,
  };

  render() {
    const { useNew, ...otherProps } = this.props;

    if (useNew) {
      return <NewTree {...otherProps} />;
    }

    return <OldTree {...otherProps} />;
  }
}
