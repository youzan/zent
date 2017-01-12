import React, { Component } from 'react';
import Checkbox from '../src';
import '../assets/index.scss';

/*
## 只读

只读的 checkbox
*/

export default class Simple extends Component {

  render() {
    return (
      <div>
        <Checkbox readOnly>
          Checkbox
        </Checkbox>
        <br />
        <Checkbox checked readOnly>
          Checkbox
        </Checkbox>
      </div>
    );
  }
}
