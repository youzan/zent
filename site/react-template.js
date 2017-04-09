import React, { Component } from 'react';
IMPORTS

DEMO_DECLARATIONS

function RawHtmlRenderer(props) {
  return <props.tag {...props.attributes} dangerouslySetInnerHTML={{ __html: props.html }}></props.tag>;
}

function Markdown(props) {
  return <RawHtmlRenderer tag="section" html={props.html} />;
}

function Style(props) {
  return <RawHtmlRenderer tag="style" html={props.style} />;
}

class Demo extends Component {
  state = {
    showCode: true
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
      <div className="zandoc-react-demo">
        <div className="zandoc-react-demo__preview">
          {demo}
        </div>
        <div className="zandoc-react-demo__bottom" onClick={this.toggle}>
          <i
            className={`zenticon zenticon-right zandoc-react-demo__toggle ${showCode ? 'zandoc-react-demo__toggle-on' : 'zandoc-react-demo__toggle-off'}`}
          />
          <RawHtmlRenderer
            tag="div"
            attributes={{
              className: 'zandoc-react-demo__title'
            }}
            html={title}
          />
        </div>
        {showCode && <RawHtmlRenderer
          tag="pre"
          html={src}
          attributes={{
            className: 'zandoc-react-demo__code'
          }}
        />}
      </div>
    )
  }
}

module.exports = class ZentDocContainer extends Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'zandoc-react-container '
      },
      SECTIONS
    );
  }
}
