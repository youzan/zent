import * as React from 'react';
import cn from 'classnames';
import noop from 'lodash-es/noop';
import { ITabPanelProps } from '../types';

class TabPanel<Id extends string | number = string> extends React.PureComponent<
  ITabPanelProps<Id>
> {
  static defaultProps = {
    actived: false,
    onTabReady: noop,
    uniqueId: 0,
  };

  componentDidMount() {
    this.emitTabReady();
  }

  componentDidUpdate() {
    this.emitTabReady();
  }

  emitTabReady() {
    const { onTabReady, id } = this.props;
    onTabReady && onTabReady(id);
  }

  render() {
    const {
      actived = false,
      uniqueId = 0,
      id,
      className,
      children,
    } = this.props;

    if (!actived) {
      return null;
    }

    const panelCls = cn('zent-tab-tabpanel', className);
    return (
      <div
        role="tabpanel"
        id={`zent-tabpanel-${uniqueId}-${id}`}
        className={panelCls}
      >
        {children}
      </div>
    );
  }
}

export default TabPanel;
