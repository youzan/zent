import React, { Component } from 'react';
import Select, { Option } from '../src/index';
import '../assets/index.scss';

const provinceMap = {
  1: [{ text: '杭州', value: 1 }, { text: '宁波', value: 2 }],
  2: [{ text: '南宁', value: 1 }, { text: '桂林', value: 2 }]
};

class Example extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
    this.provinceChangeHandler = this.provinceChangeHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
  }

  provinceChangeHandler(ev, data) {
    this.setState({
      province: data.value
    });
  }

  filterHandler(item, keyword) {
    return item.text.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
  }

  render() {
    let {
      province,
      index
    } = this.state;

    return (
      <form>
        <Select value={province} onChange={this.provinceChangeHandler} placeholder="选择省份">
          <Option value="1">浙江</Option>
          <Option value="2">广西</Option>
        </Select>

        <Select
          index={index}
          data={provinceMap[province]}
          searchPlaceholder="请输入您所在的城市"
          filter={this.filterHandler}
          placeholder="选择城市"
        />
      </form>
    );
  }
}

Example.defaultProps = {
  province: 1,
  index: 0
};

export default Example;
