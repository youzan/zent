import React, { Component } from 'react';
import Pagination from '../src/index.js';
import '../assets/index.scss';

export default class HugeTotal extends Component {
  state = {
    current: 1321,
    totalItem: 10000000000000,
    pageSize: 10
  };

  onChange = (page) => {
    this.setState({
      current: page
    });
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        pageSize={this.state.pageSize}
        onChange={this.onChange}
      />
    );
  }
}
