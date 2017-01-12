import React from 'react';
import Loading from '../src/index.js';
import '../assets/index.scss';

/* 调用Loading.on()以及Loading.off()来开启和关闭全局的 loading

 on 可以接受对象参数，作为 props，目前支持参数：prefix、className、containerClass、zIndex
*/
export default class Demo extends React.Component {
  render() {
    return (
      <div className="row">
        <button
          className="zent-col zent-col-10 zent-col-offset-1 zent-btn zent-btn-default"
          onClick={() => { Loading.on() }}
        >
          全局开启
        </button>
        <button
          className="zent-col zent-col-10 zent-btn zent-btn-default"
          style={{ zIndex: 9999, position: 'relative' }}
          onClick={() => { Loading.off() }}
        >
          全局关闭
        </button>
      </div>
    );
  }
}
