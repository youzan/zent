import React from 'react';
import ReactDom from 'react-dom';
import Tabs from '../src';
import '../assets/index.scss';

const TabPanel = Tabs.TabPanel;

/*
## Write Something here

You can write guides for users here
*/


const Simple = React.createClass({
  getInitialState() {
    return {
      align: 'left',
      size: 'normal',
      type: 'normal',
      candel: false,
      canadd: false,
      activeId: '2',
      panels: [{
        tab: '选项一',
        id: '1',
        disabled: true,
        content: '选项二'
      }, {
        tab: '选项二',
        id: '2',
        content: <div>选项一的内容</div>
      }, {
        tab: '选项三',
        id: '3',
        content: '选项三的内容'
      }],
      onTabChange: ((id) => {
        this.setState({
          activeId: id
        });
      })
    };
  },

  alignChange() {
    this.setState({
      align: this.aselect.value
    });
  },

  sizeChange() {
    this.setState({
      size: this.asize.value
    });
  },

  typeChange() {
    this.setState({
      type: this.atype.value
    });
  },

  canaddChange() {
    this.setState({
      canadd: this.canaddDom.checked
    });
  },

  candelChange() {
    this.setState({
      candel: this.candelDom.checked
    });
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
    let oStyle = {
      border: '1px solid black',
      marginRight: '10px',
      display: 'inline-block',
      padding: '10px'
    };
    return (
      <div>
        <div style={oStyle}>
          align:
          <select onChange={this.alignChange} ref={(c) => { this.aselect = ReactDom.findDOMNode(c) }}>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="center">center</option>
          </select>
        </div>
        <div style={oStyle}>
          type:
          <select ref={(c) => { this.atype = ReactDom.findDOMNode(c) }} onChange={this.typeChange}>
            <option value="normal">normal</option>
            <option value="card">card</option>
            <option value="slider">slider</option>
          </select>
        </div>
        <div style={oStyle}>
          size:
          <select ref={(c) => { this.asize = ReactDom.findDOMNode(c) }} onChange={this.sizeChange}>
            <option value="normal">normal</option>
            <option value="huge">huge</option>
          </select>
        </div>
        <div style={oStyle}>
          canadd:
          <input type="checkbox" onChange={this.canaddChange} ref={(c) => { this.canaddDom = ReactDom.findDOMNode(c) }}></input>
          candel
          <input type="checkbox" onChange={this.candelChange} ref={(c) => { this.candelDom = ReactDom.findDOMNode(c) }}></input>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Tabs activeId="1" type="slider" >
            <TabPanel tab="sdfasf" id="1">
              <Tabs {...this.state} >
                {this.renderPanels()}
              </Tabs>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
});

export default Simple;
