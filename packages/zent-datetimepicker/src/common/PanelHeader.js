import React, { Component } from 'react';
import Icon from '@youzan/zent-icon';

export default class PanelHeader extends Component {
  render() {
    return (
      <div className="panel__header">
        <span className="link--prev" onClick={this.props.prev}>
          <Icon type="right" />
        </span>
        <span className="panel__title" onClick={this.props.onClick}>{this.props.title}</span>
        <span className="link--next" onClick={this.props.next}>
          <Icon type="right" />
        </span>
      </div>
    );
  }
}
