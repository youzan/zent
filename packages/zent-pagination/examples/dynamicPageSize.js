import React, { Component } from 'react';
import Pagination from '../src/index.js';
import 'zent-select/lib/index.css';
import '../assets/index.scss';

export default class DynamicPageSize extends Component {
  state = {
    current: 1,
    totalItem: 1000
  };

  onChange = (page) => {
    this.setState({
      current: page
    });
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        pageSize={[20, { value: 30, isCurrent: true }]}
      />
    );
  }
}
