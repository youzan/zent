/**
 * CustomTrigger
 */

import React, { Component } from 'react';
import { SelectTrigger } from '../../src/index';

class CustomTrigger extends Component {

  render() {
    let {
      text,
      placeholder
    } = this.props;

    if (text) {
      text = `分类：${this.props.text}`;
    } else {
      text = placeholder;
    }

    return (
      <SelectTrigger {...this.props} text={text} />
    );
  }
}

export default CustomTrigger;
