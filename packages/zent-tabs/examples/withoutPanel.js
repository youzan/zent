import React, { Component } from 'react';
import Tabs from '../src';
import '../assets/index.scss';

let uniqId = 4;

class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: '2',
      tabs: [{
        title: '选项一',
        key: '1',
        disabled: true
      }, {
        title: '选项二',
        key: '2'
      }, {
        title: '选项三',
        key: '3'
      }]
    };
  }

  onTabChange(id) {
    this.setState({
      activeId: id
    });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <Tabs
            activeId={this.state.activeId}
            onTabChange={this.onTabChange.bind(this)}
            tabs={this.state.tabs} />
          <h1>{this.state.activeId}</h1>
        </div>
      </div>
    );
  }
}

export default Simple;
