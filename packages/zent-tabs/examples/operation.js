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
    let self = this;
    return {
      align: 'left',
      size: 'normal',
      type: 'normal',
      candel: true,
      canadd: true,
      onTabChange(id) {
        self.setState({
          activeId: id
        });
      },
      onTabAdd() {
        let { panels } = self.state;
        panels.push({
          tab: `选项${uniqId}`,
          id: `${uniqId++}`,
          disabled: false,
          content: Date.now()
        });
        self.setState({
          panels
        });
      },
      onTabDel(id) {
        let { panels } = self.state;
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
          self.setState({
            panels
          });
        }
      },
      activeId: '2',
      panels: [{
        tab: '选项一',
        id: '1',
        disabled: true,
        content: '选项一，呦呦'
      }, {
        tab: '选项二',
        id: '2',
        content: <div>哈哈哈</div>
      }, {
        tab: '选项三',
        id: '3',
        content: '从前有棵树'
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
