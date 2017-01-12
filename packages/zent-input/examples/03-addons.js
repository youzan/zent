import React, { Component } from 'react';
import Input from '../src';
import '../assets/index.scss';


export default class Simple extends Component {
  render() {
    return (
      <div>
        <div><Input addonBefore="标签" /></div>
        <br />
        <div><Input addonAfter="标签" /></div>
        <br />
        <div className="has-error"><Input addonBefore="标签" /></div>
        <br />
        <div><Input disabled addonBefore="标签" defaultValue="aaaa" /></div>
        <br />
        <div><Input addonBefore="标签" addonAfter="标签" /></div>
      </div>
    );
  }
}
