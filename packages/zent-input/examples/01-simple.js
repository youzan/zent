import React, { Component } from 'react';
import Input from '../src';
import '../assets/index.scss';


export default class Simple extends Component {
  render() {
    return (
      <div>
        <div><Input className="hello" defaultValue={'hello world'} /></div>
        <br />
        <div><Input autoFocus placeholder="Email" /></div>
        <br />
        <div className="has-error"><Input /></div>
        <br />
        <div><Input disabled /></div>
        <br />
        <div><Input readOnly /></div>
      </div>
    );
  }
}
