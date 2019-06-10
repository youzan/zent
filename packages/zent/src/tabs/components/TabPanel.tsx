import * as React from 'react';
import { Component } from 'react';
import noop from 'lodash-es/noop';

export interface ITabPanelProps {
  className?: string;
  prefix?: string;
  actived?: boolean;
  disabled?: boolean;
  tab: React.ReactNode;
  id: string | number;
  onTabReady?: (id: string | number) => void;
  uniqueId?: number;
}

class TabPanel extends Component<ITabPanelProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    actived: false,
    onTabReady: noop,
    uniqueId: 0,
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { onTabReady, id } = this.props;
    // Dom ready后的回调
    onTabReady(id);
  }

  render() {
    const props = this.props;
    const actived = props.actived;
    const hiddenStyle: React.CSSProperties = {};
    if (!actived) {
      hiddenStyle.display = 'none';
    }
    return (
      <div
        style={hiddenStyle}
        role="tabpanel"
        id={`${props.prefix}-tabpanel-${props.uniqueId}-${props.id}`}
        className={`${props.prefix}-tab-tabpanel ${props.className}`}
      >
        {props.children}
      </div>
    );
  }
}

export default TabPanel;
