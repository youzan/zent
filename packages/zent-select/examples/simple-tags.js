import React, { Component } from 'react';
import Select from '../src/index';
import '../assets/index.scss';

class Example extends Component {

  render() {
    return (
      <form>
        <Select data={[1, 2, 3]} />
      </form>
    );
  }
}

export default Example;
