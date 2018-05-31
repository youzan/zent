import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import noop from 'lodash/noop';

class TabPanel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    actived: PropTypes.bool,
    tab: PropTypes.any.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPanelReady: PropTypes.func,
    uniqueId: PropTypes.number,
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    actived: false,
    onPanelReady: noop,
    uniqueId: 0,
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let { onPanelReady, id } = this.props;
    // Dom ready后的回调
    onPanelReady(id);
  }

  render() {
    let props = this.props;
    let actived = props.actived;
    let hiddenStyle = {};
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
