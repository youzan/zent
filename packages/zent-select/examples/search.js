import React, { Component } from 'react';
import Select from '../src/index';
import '../assets/index.scss';

const data = [
  '选项一', '选项二', '选项三'
];

export default class Example extends Component {

  constructor(props) {
    super(props);
    this.filterHandler = this.filterHandler.bind(this);
  }

  filterHandler(item, keyword) {
    return keyword && item.value.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
  }

  emptySelectedHandler(keyword) {
    console.log(keyword); // eslint-disable-line
  }

  render() {
    return (
      <form>
        <Select
          value="选项一"
          data={data}
          searchPlaceholder="请选择其中一项"
          filter={this.filterHandler}
          onEmptySelected={this.emptySelectedHandler}
        />
      </form>
    );
  }
}
