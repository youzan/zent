import React, { Component, PureComponent } from 'react';

export default class Jump extends (PureComponent || Component) {
  state = {
    pageLabel: this.props.content.trim()
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageLabel: nextProps.content.trim()
    });
  }

  onKeyUp = e => {
    if (e.key !== 'Enter') return;
    let value = e.target.value.trim();
    const pattern = /^\d+$/g;

    if (pattern.test(value)) {
      if (value <= 0) {
        value = 0;
      }

      if (value > this.props.total) {
        value = this.props.total;
      }

      this.props.onChange(parseInt(value, 10));
    }
  };

  onChange = e => {
    this.setState({
      pageLabel: e.target.value.trim()
    });
  };

  render() {
    return (
      <div className="pager pager--jump">
        <input
          className="pager__input"
          value={this.state.pageLabel}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
        />
        <span className="pager__suffix">/共{this.props.total}页</span>
      </div>
    );
  }
}
