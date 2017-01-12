import React, { Component } from 'react';
import Loading from '../src/index.js';
import '../assets/index.scss';
import '../assets/_demo.scss';

/* 使用 Loading 包裹组件，为了减少对代码的侵入性，除了 API 调用方式，在 static 为 false 的情况下，有如下的表现

一般情况下推荐此种方式，但是目前版本的 Loading 对于动态元素的支持有一些 bug
*/
export default class Demo extends Component {

  state = {
    loadingC: false,
    loadingA: false
  }

  handleClick(name) {
    let state = this.state;
    state[name] = !state[name];
    this.setState(state);
  }

  render() {
    let { loadingA, loadingC } = this.state;

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
            onClick={this.handleClick.bind(this, 'loadingC')}
          >
            特定区域C
          </button>
        </div>
        <div className="row">
          <Loading show={loadingA} static={false}>
            <div className="zent-col zent-col-20 zent-col-offset-1">
              <p className="demo-loading">特定区域 全部 覆盖</p>
              <Loading show={loadingC} static={false}>
                <p className="demo-loading">特定区域 C 覆盖</p>
              </Loading>
            </div>
          </Loading>
        </div>
      </div>
    );
  }
}
