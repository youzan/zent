import React, { Component } from 'react';
import Select, { Option } from '../src/index';
import '../assets/index.scss';

export default class Example extends Component {

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(ev, data) {
    alert(data ? `你选择了 ${data.text}` : '请选择一种分类'); // eslint-disable-line
  }

  render() {
    return (
      <form>
        <Select disabled value="2" onChange={this.changeHandler} placeholder="选择商品分组">
          <Option value="1">养生食品分类</Option>
          <Option value="2">休闲食品分类</Option>
          <Option value="3">药效性食物分类</Option>
          <Option value="4">列表中隐藏</Option>
        </Select>
      </form>
    );
  }
}
