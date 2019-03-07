import * as React from 'react';
import { Component } from 'react';

import Portal, { IPortalProps } from './Portal';

export interface IClosablePortalProps extends IPortalProps {}

// visible的逻辑放在Portal里实现会比较烦，因为没法利用React的update机制。
export class ClosablePortal extends Component<IClosablePortalProps> {
  static defaultProps = {
    visible: true,
  };

  render() {
    const { visible, ...portalProps } = this.props;
    return visible && <Portal {...portalProps} />;
  }
}

export default ClosablePortal;
