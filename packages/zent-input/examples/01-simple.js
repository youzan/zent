import React, { Component } from 'react';
import Input from '../src';
import '../assets/index.scss';


export default class Simple extends Component {
  focus = () => {
    this.input.focus();
  }

  render() {
    return (
      <div>
        <div><Input ref={input => this.input = input} className="hello" defaultValue={'hello world'} /><button onClick={() => this.focus()}>focus</button></div>
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
