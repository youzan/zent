import React from 'react';

function noop() {}

class Tab extends React.Component {
  static propTypes = {
    prefix: React.PropTypes.string,
    actived: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    minWidth: React.PropTypes.string,
    onSelected: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    candel: React.PropTypes.bool,
    uniqueId: React.PropTypes.number
  };

  static defaultProps = {
    prefix: 'zent',
    actived: false,
    disabled: false,
    id: '',
    minWidth: '',
    onSelected: noop,
    onDelete: noop,
    candel: false
  };

  onDel(e) {
    e.stopPropagation();
    let { onDelete, id } = this.props;
    onDelete(id);
  }

  onClick() {
    let { onSelected, id, actived, disabled } = this.props;
    if (!actived && !disabled) {
      onSelected(id);
    }
  }

  renderDelOperater() {
    let { candel, prefix } = this.props;
    if (candel) {
      return (
        <span className={`${prefix}-tabs-tab-inner-del`} onClick={this.onDel.bind(this)}>&#10005;</span>
      );
    }
    return '';
  }

  render() {
    let props = this.props;
    let { prefix, minWidth } = props;
    let classes = `${prefix}-tabs-tab`;
    if (props.actived) {
      classes += ` ${prefix}-tabs-actived`;
    }
    if (props.disabled) {
      classes += ` ${prefix}-tabs-disabled`;
    }
    let style = {};
    if (minWidth) {
      style.minWidth = minWidth;
    }
    return (
      <div
        role="tab"
        aria-labelledby={`${props.prefix}-tabpanel-${props.uniqueId}-${props.id}`}
        className={classes}
        aria-disabled={props.disabled}
        aria-selected={props.actived}
        onClick={this.onClick.bind(this)}
        style={style}>
        <div className={`${prefix}-tabs-tab-inner`}>
          {this.renderDelOperater()}
          {props.children}
        </div>
      </div>
    );
  }

}

export default Tab;
