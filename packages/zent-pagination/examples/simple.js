import React, { Component } from 'react';

import Pagination from '../src/index.js';
import '../assets/index.scss';

export default class Simple extends Component {
  state = {
    current: 1,
    totalItem: 1000,
  };

  onChange = (page) => {
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        maxPageToShow={12}
      />
    );
  }
}
