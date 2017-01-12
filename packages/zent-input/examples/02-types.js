import React, { Component } from 'react';
import Input from '../src';
import '../assets/index.scss';


export default class Simple extends Component {
  render() {
    return (
      <div>
        <div><Input type="number" /> Number</div>
        <br />
        <div><Input type="password" /> Password</div>
        <br />
        <div className="has-error"><Input type="number" addonBefore="￥" /></div>
        <br />
        <div><Input type="number" min="2" max="8" /></div>
        <br />
        <div><Input type="number" addonBefore="买了" addonAfter="个苹果" /></div>
      </div>
    );
  }
}
