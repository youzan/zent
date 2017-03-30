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
  onTabAdd() {
    this.setState(state => {
      state.tabs.push({
        title: `选项${uniqId}`,
        key: `${uniqId++}`,
        disabled: false
      });
      return state;
    });
  }
  onTabDel(id) {
    this.setState(state => {
      let index = state.tabs.findIndex(tab => tab.key === id);
      if (index !== -1) {
        state.tabs.splice(index, 1);
        return state;
      }
      return state;
    });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <Tabs
            candel
            canadd
            activeId={this.state.activeId}
            onTabChange={this.onTabChange.bind(this)}
            onTabDel={this.onTabDel.bind(this)}
            onTabAdd={this.onTabAdd.bind(this)}
            tabs={this.state.tabs} />
          <h1>{this.state.activeId}</h1>
        </div>
      </div>
    );
  }
}

export default Simple;
