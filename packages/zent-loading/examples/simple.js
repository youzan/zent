import React, { Component } from 'react';
import Loading from '../src/index.js';
import '../assets/index.scss';
import '../assets/_demo.scss';

/* 使用 Loading 包裹组件， static 属性 默认为 true，Loading 将会存在于文档流中

这种条件下 Loading 也可以不包裹组件，用户可以自定义高度
*/
export default class Demo extends Component {

  state = {
    loadingB: false,
    loadingA: false
  }

  handleClick(name) {
    let state = this.state;
    state[name] = !state[name];
    this.setState(state);
  }

  render() {
    let { loadingA, loadingB } = this.state;

    return (
      <div>
        <div className="row">
          <button
            className="zent-col zent-col-10 zent-btn zent-btn-default"
            onClick={this.handleClick.bind(this, 'loadingA')}
          >
            特定区域全部
          </button>
          <button
            className="zent-col zent-col-10 zent-btn zent-btn-default"
            onClick={this.handleClick.bind(this, 'loadingB')}
          >
            特定区域B，可自定义高度
          </button>
        </div>
        <Loading show={loadingA} containerClass="clearfix">
          <div className="zent-col zent-col-20 zent-col-offset-1">
            <Loading show={loadingB} />
            <Loading show />
            <p className="demo-loading">特定区域 全部 覆盖</p>
          </div>
        </Loading>
      </div>
    );
  }
}
