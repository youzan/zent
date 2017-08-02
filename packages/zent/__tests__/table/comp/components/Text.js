import React, { Component } from 'react';

export default class TextComponent extends Component {
  render() {
    let { data, name } = this.props;

    return (
      <span className="text">
        {data[name]}
      </span>
    );
  }
}
