import React, { Component } from 'react';
import Button from '../src';
import '../assets/index.scss';

export default class Example extends Component {
  render() {
    return (
      <Button type="primary" block>块级按钮</Button>
    );
  }
}
