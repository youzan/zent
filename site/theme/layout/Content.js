import React, { Component } from 'react';

import Test from '../../docs/test.md';


export default class Content extends Component {
  render() {
    return (
      <div className="zent-doc-layout__content">
        <div className="zent-doc-layout__content-doc">
          <Test />
        </div>
      </div>
    );
  }
}
