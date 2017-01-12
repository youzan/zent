import React, { Component } from 'react';

import '../assets/index.scss';
import '../assets/demo.scss';

export default class CssExample extends Component {
  render() {
    return (
      <div className="demo-grid">
        <div className="demo-grid-row"><i className="zenticon zenticon-shop"></i>快来有赞转转</div>
        <div className="demo-grid-row"><i className="zenticon zenticon-casher"></i>快点交学费</div>
      </div>
    );
  }
}
