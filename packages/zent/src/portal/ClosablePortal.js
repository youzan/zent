import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Portal from './Portal';

// visible的逻辑放在Portal里实现会比较烦，因为没法利用React的update机制。
export default class ClosablePortal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
  };

  render() {
    const { visible, ...portalProps } = this.props;
    return visible && <Portal {...portalProps} />;
  }
}
