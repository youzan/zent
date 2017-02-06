import React from 'react';
import Tabs from '../src';
import '../assets/index.scss';

const TabPanel = Tabs.TabPanel;

/*
## Write Something here

You can write guides for users here
*/


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
        let { panels } = this.state;
        panels.push({
          tab: `选项${uniqId}`,
          id: `${uniqId++}`,
          disabled: false,
          content: Date.now()
        });
        this.setState({
          panels
        });
      }),
      onTabDel: ((id) => {
        let { panels } = this.state;
        let index = -1;
        panels.some((p, i) => {
          if (p.id === id) {
            index = i;
            return true;
          }
          return false;
        });
        if (index > -1) {
          panels.splice(index, 1);
          this.setState({
            panels
          });
        }
      }),
      activeId: '2',
      panels: [{
        tab: '选项一',
        id: '1',
        disabled: true,
        content: '选项一的内容'
      }, {
        tab: '选项二',
        id: '2',
        content: <div>选项二的内容</div>
      }, {
        tab: '选项三',
        id: '3',
        content: '选项三的内容'
      }]
    };
  },

  renderPanels() {
    let { panels } = this.state;
    let PanelEls = [];
    panels.forEach((p) => {
      PanelEls.push(<TabPanel {...p} key={p.id}>{p.content}</TabPanel>);
    });
    return PanelEls;
  },

  render() {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <Tabs {...this.state} >
            {this.renderPanels()}
          </Tabs>
        </div>
      </div>
    );
  }
});

export default Simple;
