import React from 'react';
import Tabs from '../src';
import '../assets/index.scss';

let uniqId = 4;

const Simple = React.createClass({
  getInitialState() {
    return {
      align: 'left',
      size: 'normal',
      type: 'normal',
      candel: true,
      canadd: true,
      onTabChange: ((id) => {
        this.setState({
          activeId: id
        });
      }),
      onTabAdd: (() => {
        this.setState(state => {
          state.tabs.push({
            title: `选项${uniqId}`,
            key: `${uniqId++}`,
            disabled: false
          });
          return state;
        });
      }),
      onTabDel: ((id) => {
        this.setState(state => {
          let index = state.tabs.findIndex(tab => tab.key === id);
          if (index !== -1) {
            state.tabs.splice(index, 1);
            return state;
          }
          return state;
        });
      }),
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
  },

  render() {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <Tabs {...this.state} />
        </div>
      </div>
    );
  }
});

export default Simple;
