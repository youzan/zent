import React from 'react';
import Pagination from '../src/index.js';
import '../assets/index.scss';

const Simple = React.createClass({
  getInitialState() {
    return {
      current: 1,
      totalItem: 1000
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
        onChange={this.onChange}
        maxPageToShow={12}
      />
    );
  }
});

export default Simple;
