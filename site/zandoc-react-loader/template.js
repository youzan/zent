import React, { Component } from 'react';
<%= imports %>

function RawHtmlRenderer(props) {
  return <props.tag dangerouslySetInnerHTML={{ __html: props.html }}></props.tag>;
}

export default class ZentDocContainer extends Component {
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
        <% }) %>
      </div>
    )
  }
}
