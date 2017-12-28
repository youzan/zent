import React, { Component, PureComponent } from 'react';

import { I18nReceiver as Receiver } from 'i18n';
import { Pagination as I18nDefault } from 'i18n/default';

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
    const { total } = this.props;
    return (
      <div className="pager pager--jump">
        <input
          className="pager__input"
          value={this.state.pageLabel}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
        />
        <Receiver componentName="Pagination" defaultI18n={I18nDefault}>
          {i18n => (
            <span className="pager__suffix">{`/ ${total} ${i18n.pages}`}</span>
          )}
        </Receiver>
      </div>
    );
  }
}
