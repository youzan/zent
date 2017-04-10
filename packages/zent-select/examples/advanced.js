import React, { Component } from 'react';
import Select, { Option } from '../src/index';
import '../assets/index.scss';

class Example extends Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({}, props);
    this.changeHandler = this.changeHandler.bind(this);
    this.getSelectData = this.getSelectData.bind(this);
    this.resetSelectData = this.resetSelectData.bind(this);
  }

  changeHandler(ev, data) {
    this.state.value = data.value;
    console.log(data); // eslint-disable-line
  }

  getSelectData() {
    let { index } = this.state;
    alert(index !== '' ? `你选择了第 ${index + 1} 项` : '请选择一种分类'); // eslint-disable-line
  }

  resetSelectData() {
    this.setState({
      index: ''
    });
  }

  selectIndex(index) {
    return () => {
      this.setState({
        index
      });
    };
  }

  render() {
    let { index } = this.state;

    return (
      <form>
        <Select index={index} onChange={this.changeHandler} placeholder="选择商品分组">
          <Option value="1" xxx="12">养生食品分类</Option>
          <Option value="2">休闲食品分类</Option>
          <Option value="3">药效性食物分类</Option>
          <Option value="4">列表中隐藏</Option>
        </Select>
        <button type="button" onClick={this.getSelectData}>提交</button>
        <button type="button" onClick={this.resetSelectData}>清空</button>
        <button type="button" onClick={this.selectIndex(0)}>第一项</button>
        <button type="button" onClick={this.selectIndex(1)}>第二项</button>
        <button type="button" onClick={this.selectIndex(2)}>第三项</button>
        <button type="button" onClick={this.selectIndex(3)}>第四项</button>
      </form>
    );
  }
}

Example.defaultProps = {
  index: 1
};

export default Example;
