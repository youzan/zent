import React, { Component } from 'react';
import 'zent/lib/index.css';
import { Button } from "zent";

const ReactDemo__1490063760519__1 = (function () {
  return <Button type="primary" disabled>确认付款</Button>;
})();

const ReactDemo__1490063760528__2 = (function () {
  return <div className="button-group">
		<Button type="primary" size="small">确认付款</Button>
		<Button size="small">确认收货</Button>
		<Button size="small">取消订单</Button>
	</div>;
})();

function RawHtmlRenderer(props) {
  return <props.tag dangerouslySetInnerHTML={{
    __html: props.html
  }}></props.tag>;
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
    const {
      showCode
    } = this.state;
    const {
      title,
      src,
      demo
    } = this.props;
    return <div className="zent-doc-react-demo">
        {demo}
        <div className="zent-doc-react-demo--bottom">
          <div className="zent-doc-react-demo--title">{title}</div>
          <button onClick={this.toggle}>{showCode ? 'OFF' : 'ON'}</button>
        </div>
        {showCode && <RawHtmlRenderer tag="div" html={src} />}
      </div>;
  }

}

module.exports = class ZentDocContainer extends Component {
  render() {
    return React.createElement('div', {
      className: 'zandoc-react-container---11'
    }, React.createElement(RawHtmlRenderer, {
      tag: "style",
      html: ".button-group .zent-btn {\n    margin-right: 10px;\n}"
    }), React.createElement(RawHtmlRenderer, {
      tag: "div",
      html: "<h2>Button\u7EC4\u4EF6</h2>\n<h3>\u793A\u4F8B</h3>\n"
    }), React.createElement(DemoRenderer, {
      title: "\u7981\u7528\u72B6\u6001",
      src: "<span class=\"hljs-keyword\">import</span> { Button } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'zent'</span>;\n\nReactDOM.render(\n\t<span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"primary\"</span> <span class=\"hljs-attr\">disabled</span>&gt;</span>\u786E\u8BA4\u4ED8\u6B3E<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">Button</span>&gt;</span></span>\n\t, mountNode);",
      demo: ReactDemo__1490063760519__1
    }), React.createElement(DemoRenderer, {
      title: "\u6309\u94AE\u5206\u7EC4",
      src: "<span class=\"hljs-keyword\">import</span> { Button } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'zent'</span>;\n\nReactDOM.render(\n\t<span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">className</span>=<span class=\"hljs-string\">\"button-group\"</span>&gt;</span>\n\t\t<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"primary\"</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"small\"</span>&gt;</span>\u786E\u8BA4\u4ED8\u6B3E<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">Button</span>&gt;</span>\n\t\t<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"small\"</span>&gt;</span>\u786E\u8BA4\u6536\u8D27<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">Button</span>&gt;</span>\n\t\t<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">Button</span> <span class=\"hljs-attr\">size</span>=<span class=\"hljs-string\">\"small\"</span>&gt;</span>\u53D6\u6D88\u8BA2\u5355<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">Button</span>&gt;</span>\n\t<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span></span>\n\t, mountNode);",
      demo: ReactDemo__1490063760528__2
    }), React.createElement(RawHtmlRenderer, {
      tag: "div",
      html: "<h3>API</h3>\n<table>\n<thead>\n<tr>\n<th>\u53C2\u6570</th>\n<th>\u8BF4\u660E</th>\n<th>\u7C7B\u578B</th>\n<th>\u9ED8\u8BA4\u503C</th>\n<th>\u53EF\u9009\u503C</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>\u6309\u94AE\u7C7B\u578B</td>\n<td>string</td>\n<td>'default'</td>\n<td>'primary', 'danger'</td>\n</tr>\n<tr>\n<td>size</td>\n<td>\u6309\u94AE\u5C3A\u5BF8</td>\n<td>string</td>\n<td>'normal'</td>\n<td>'large', 'small', 'mini'</td>\n</tr>\n<tr>\n<td>tag</td>\n<td>\u6309\u94AE\u6807\u7B7E</td>\n<td>string</td>\n<td>'button'</td>\n<td>'a', 'span', ...</td>\n</tr>\n<tr>\n<td>diabled</td>\n<td>\u6309\u94AE\u662F\u5426\u7981\u7528</td>\n<td>Boolean</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>block</td>\n<td>\u6309\u94AE\u662F\u5426\u663E\u793A\u4E3A\u5757\u7EA7\u5143\u7D20</td>\n<td>Boolean</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n"
    }));
  }

};