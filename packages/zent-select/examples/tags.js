import React, { Component } from 'react';
import Select from '../src/index';
import '../assets/index.scss';

const optionData = [
  { text: 'S', value: 'S' },
  { text: 'M', value: 'M' },
  { text: 'XL', value: 'XL' },
  { text: 'XXXL', value: 'XXXL' },
  { text: 'XXXXL', value: 'XXXXL' },
  { text: 'XXXXXL', value: 'XXXXXL' },
  { text: 'XXXXXXL', value: 'XXXXXXL' },
  { text: 'XXXXXXXL', value: 'XXXXXXXL' }
];

class Example extends Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({}, props);
    this.changeHandler = this.changeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
    this.asyncFilterHandler = this.asyncFilterHandler.bind(this);
    this.getSelectData = this.getSelectData.bind(this);
    this.resetSelectData = this.resetSelectData.bind(this);
  }

  changeHandler(ev, data) {
    if (this.state.value.indexOf(data.value) < 0) {
      this.state.value.push(data.value);
    }
  }

  deleteHandler(data) {
    let { value } = this.state;
    value = value.filter(item => item !== data.value);
    this.setState({ value });
  }

  filterHandler(item, keyword) {
    return keyword && item.value.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
  }

  asyncFilterHandler(keyword, update) {
    setTimeout(() => {
      update(optionData.filter(item => item.value.indexOf(keyword) > -1).map(item => item.value));
    }, 1000);
  }

  getSelectData() {
    let { value } = this.state;
    alert(value ? `你选择了 ${value}` : '请选择一种分类'); // eslint-disable-line
  }

  resetSelectData() {
    this.setState({
      value: []
    });
  }

  render() {
    let { value } = this.state;

    return (
      <form>
        <Select data={optionData} value={value} tags onChange={this.changeHandler} onDelete={this.deleteHandler} filter={this.filterHandler} onAsyncFilter={this.asyncFilterHandler} />
        <div>
          <button type="button" onClick={this.getSelectData}>提交</button>
          <button type="button" onClick={this.resetSelectData}>清空</button>
        </div>
      </form>
    );
  }
}

Example.defaultProps = {
  value: ['S', 'M']
};

export default Example;
