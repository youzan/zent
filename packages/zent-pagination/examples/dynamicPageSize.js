import React from 'react';
import Pagination from '../src/index.js';
import 'zent-select/lib/index.css';
import '../assets/index.scss';

const Dynamic = React.createClass({
  getInitialState() {
    return {
      current: 1,
      totalItem: 1000,
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
        pageSize={[20, { value: 30, isCurrent: true }]}
      />
    );
  }
});

export default Dynamic;
