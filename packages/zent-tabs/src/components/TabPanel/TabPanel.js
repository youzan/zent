import React from 'react';

function noop() {}

class TabPanel extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string,
    actived: React.PropTypes.bool,
    tab: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    onPanelReady: React.PropTypes.func,
    uniqueId: React.PropTypes.number
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    actived: false,
    onPanelReady: noop,
    uniqueId: 0
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
      <div style={hiddenStyle} role="tabpanel" id={`${props.prefix}-tabpanel-${props.uniqueId}-${props.id}`} className={`${props.prefix}-tab-tabpanel ${props.className}`}>
      {props.children}
      </div>
    );
  }

}

export default TabPanel;
