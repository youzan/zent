import React, { Component } from 'react';
import Icon from '@youzan/zent-icon';

export default class PanelHeader extends Component {
  static defaultProps = {
    showPrev: true,
    showNext: true
  }
  render() {
    return (
      <div className="panel__header">
        {this.props.showPrev ? <span className="link--prev" onClick={this.props.prev}>
          <Icon type="right" />
        </span> : null}
        <span className="panel__title" onClick={this.props.onClick}>{this.props.title}</span>
        {this.props.showNext ? <span className="link--next" onClick={this.props.next}>
          <Icon type="right" />
        </span> : null}
      </div>
    );
  }
}
