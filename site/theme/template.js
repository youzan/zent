import React, { Component } from 'react';
import 'zent/lib/index.css';
IMPORTS

DEMO_DECLARATIONS

function RawHtmlRenderer(props) {
  return <props.tag dangerouslySetInnerHTML={{ __html: props.html }}></props.tag>;
}

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
    return React.createElement(
      'div',
      {
        className: 'zandoc-react-container'
      },
      SECTIONS
    );
  }
}
