import React, { Component } from 'react';
import 'zent/lib/index.css';
<%= imports %>

function RawHtmlRenderer(props) {
  return <props.tag dangerouslySetInnerHTML={{ __html: props.html }}></props.tag>;
}

<% sections.forEach(function(sec) { %>
  <% if (sec.type === 'demo') { %>
const <%= sec.id %> = <%= sec.body %>;
  <% } %>
<% }) %>

class DemoRenderer extends Component {
  state = {
    showCode: false
  };

  toggle = () => {
    this.setState({
      showCode: !this.state.showCode
    });
  };

  render() {
    const { showCode } = this.state;
    const { title, src, demo } = this.props;

    return (
      <div className="zent-doc-react-demo">
        {demo}
        <div className="zent-doc-react-demo--bottom">
          <div className="zent-doc-react-demo--title">{title}</div>
          <button onClick={this.toggle}>{showCode ? 'OFF' : 'ON'}</button>
        </div>
        {showCode && <RawHtmlRenderer tag="div" html={src} />}
      </div>
    )
  }
}

module.exports = class ZentDocContainer extends Component {
  render() {
    return (
      <div className="zent-doc-container">
        <% sections.forEach(function (sec) { %>
          <% if (sec && sec.type === 'style') { %>
            <RawHtmlRenderer tag="style" html="<%- sec.value %>" />
          <% } %>

          <% if (sec && sec.type === 'markdown') { %>
            <RawHtmlRenderer tag="div" html="<%= sec.value %>" />
          <% } %>

          <% if (sec && sec.type === 'demo') { %>
            <DemoRenderer title="<%= sec.title %>" src="<%- sec.src %>" demo={<%= sec.id %>}/>
          <% } %>
        <% }) %>
      </div>
    )
  }
}
