import React from 'react';
import Pagination from '../src/index.js';
import '../assets/index.scss';

const Custom = React.createClass({
  getInitialState() {
    return {
      current: 1,
      pageSize: 10,
      totalItem: 1000,
      max: 100
    };
  },

  onChange(page) {
    this.setState({
      current: page
    });
  },

  onTotalChange(e) {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      totalItem: value
    });
  },

  onPageSizeChange(e) {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      pageSize: value
    });
  },

  onCurrentChange(e) {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      current: value
    });
  },

  onMaxChange(e) {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      max: value
    });
  },

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>totalItem:</label>
            <input type="text" className="form-control" placeholder="数字" value={this.state.totalItem} onChange={this.onTotalChange} />
          </div>
          <div className="form-group">
            <label>pageSize:</label>
            <input type="text" className="form-control" placeholder="数字" value={this.state.pageSize} onChange={this.onPageSizeChange} />
          </div>
          <div className="form-group">
            <label>current:</label>
            <input type="text" className="form-control" placeholder="数字" value={this.state.current} onChange={this.onCurrentChange} />
          </div>
          <div className="form-group">
            <label>maxPageToShow:</label>
            <input type="text" className="form-control" placeholder="数字" value={this.state.max} onChange={this.onMaxChange} />
          </div>
        </form>
        <Pagination
          current={this.state.current}
          totalItem={this.state.totalItem}
          pageSize={this.state.pageSize}
          maxPageToShow={this.state.max}
          onChange={this.onChange}
        />
      </div>
    );
  }
});

export default Custom;
