import React from 'react';
import Pagination from '../src/index.js';
import '../assets/index.scss';

const Simple = React.createClass({
  getInitialState() {
    return {
      current: 1321,
      totalItem: 10000000000000,
      pageSize: 10
    };
  },

  onChange(page) {
    this.setState({
      current: page
    });
  },

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
});

export default Simple;
