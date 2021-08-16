(self.webpackChunkzent_docs=self.webpackChunkzent_docs||[]).push([[4947],{84947:(n,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>w});var t=s(73450),p=s(73118),e=s(27378),o=s(57318),c=s(32415),l=s(39215),i=s(14623),u=s(24246);function r(n,a){var s=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable}))),s.push.apply(s,t)}return s}function k(n){for(var a=1;a<arguments.length;a++){var s=null!=arguments[a]?arguments[a]:{};a%2?r(Object(s),!0).forEach((function(a){(0,t.Z)(n,a,s[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(s,a))}))}return n}var d=function(){function n(n){var s=e.useState(null),t=(0,p.Z)(s,2),o=t[0],l=t[1],i=e.useCallback((()=>l("Waypoint 进入屏幕")),[]),r=e.useCallback((()=>l("Waypoint 离开屏幕")),[]);return(0,u.jsxs)("div",{className:"waypoint-demo-basic",children:[o?(0,u.jsx)("div",{className:"waypoint-demo-basic__message",children:o}):null,(0,u.jsxs)("div",{className:"waypoint-demo-basic__scrollable-parent",children:[(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)("div",{className:"waypoint-demo-basic__waypoint-line"}),(0,u.jsx)(c.h,{onEnter:i,onLeave:r}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{}),(0,u.jsx)(a,{})]})]})}function a(){return(0,u.jsx)("div",{className:"waypoint-demo-basic__spacer",children:(0,u.jsx)(l.J,{type:"down"})})}return(0,u.jsx)(n,{})},m=function(){function n(n){var a=e.useState(!1),s=(0,p.Z)(a,2),t=s[0],o=s[1],l=e.useCallback((()=>o(!0)),[]),r=e.useCallback((()=>o(!1)),[]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c.h,{onEnter:l,onLeave:r}),(0,u.jsx)(i.Z,{in:t,timeout:500,classNames:"waypoint-demo-reveal",unmountOnExit:!0,children:n.children})]})}function a(a){return(0,u.jsx)("div",{className:"waypoint-demo-reveal",children:(0,u.jsxs)("div",{className:"waypoint-demo-reveal__scrollable-parent",children:[(0,u.jsx)(s,{}),(0,u.jsx)(s,{}),(0,u.jsx)(s,{}),(0,u.jsx)(n,{children:(0,u.jsx)("p",{className:"waypoint-demo-reveal-text",children:"Surely You're Joking, Mr. Feynman!"})}),(0,u.jsx)(s,{}),(0,u.jsx)(s,{}),(0,u.jsx)(s,{})]})})}function s(){return(0,u.jsx)("div",{className:"waypoint-demo-reveal__spacer",children:(0,u.jsx)(l.J,{type:"down",className:"waypoint-demo-reveal-pulse"})})}return(0,u.jsx)(a,{})};function g(n){return(0,u.jsx)(n.tag,k(k({},n.attributes),{},{dangerouslySetInnerHTML:{__html:n.html}}))}function f(n){return(0,u.jsx)(g,{tag:"section",html:n.html,attributes:{className:"zandoc-react-markdown"}})}function y(n){return(0,u.jsx)(g,{tag:"style",html:n.style})}function v(n,a){for(;n;)return n.offsetTop&&"static"!==getComputedStyle(n).position&&(a+=n.offsetTop),v(n.parentNode,a);return a}class h extends e.Component{constructor(...n){super(...n),(0,t.Z)(this,"state",{showCode:!1}),(0,t.Z)(this,"toggle",(()=>{this.setState({showCode:!this.state.showCode})}))}render(){var n=this.state.showCode,a=this.props,s=a.title,t=a.src,p=a.children;return(0,u.jsxs)("div",{className:"zandoc-react-demo",children:[(0,u.jsx)("div",{className:"zandoc-react-demo__preview",children:p}),(0,u.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[(0,u.jsx)("div",{className:"zandoc-react-demo__title",children:(0,u.jsx)("p",{children:s||""})}),(0,u.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(n?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),n&&(0,u.jsx)("pre",{className:"zandoc-react-demo__code",children:(0,u.jsx)(g,{tag:"code",html:t,attributes:{className:"language-jsx"}})})]})}}class w extends e.Component{componentDidMount(){var n=location.hash;if(n){var a=document.querySelector('a[href="'.concat(n,'"]'));a&&(0,o.l)(document.documentElement,0,v(a,-9))}}render(){return e.createElement("div",{className:"zandoc-react-container"},e.createElement(y,{style:".waypoint-demo-basic {\n  position: relative;\n}\n\n.waypoint-demo-basic__scrollable-parent {\n  max-height: 400px;\n  overflow: scroll;\n  position: relative;\n}\n\n.waypoint-demo-basic__spacer {\n  color: #969799;\n  font-size: 40px;\n  line-height: 200px;\n  text-align: center;\n}\n\n.waypoint-demo-basic__waypoint-line {\n  border-top: 2px dashed #d40000;\n}\n\n.waypoint-demo-basic__message {\n\tbox-sizing: border-box;\n  background-color: #f2f3f5;\n  color: #323233;\n  left: 0;\n  opacity: 0.8;\n  padding: 10px 0;\n  pointer-events: none;\n  position: absolute;\n  text-align: center;\n  top: 0;\n  width: 100%;\n}\n\n.waypoint-demo-reveal {\n  position: relative;\n}\n\n.waypoint-demo-reveal__scrollable-parent {\n  max-height: 400px;\n  overflow: scroll;\n  position: relative;\n}\n\n.waypoint-demo-reveal__spacer {\n  color: #969799;\n  font-size: 40px;\n  line-height: 200px;\n  text-align: center;\n}\n\n.waypoint-demo-reveal-text {\n\ttransition: opacity 500ms, transform 500ms;\n\ttext-align: center;\n\tpadding: 10px 0;\n}\n\n.waypoint-demo-reveal-enter {\n\topacity: 0;\n\ttransform: scale(0.1);\n}\n\n.waypoint-demo-reveal-enter-active {\n\topacity: 1;\n\ttransform: scale(1);\n}\n\n.waypoint-demo-reveal-exit {\n\topacity: 1;\n\ttransform: scale(0.9);\n}\n\n.waypoint-demo-reveal-exit-active {\n\topacity: 0;\n\ttransform: scale(0);\n}"}),e.createElement(f,{html:'<h2 class="anchor-heading"><a href="#waypoint">¶</a><a href="javascript:void(0)" id="waypoint" class="anchor-point"></a>Waypoint</h2>\n<p>当滚动到某个 DOM 元素时执行一个函数，支持任意可滚动的容器。</p>\n<p><strong>常见使用场景：</strong></p>\n<ul>\n<li>懒加载图片</li>\n<li>无限滚动</li>\n<li>固钉</li>\n</ul>\n<h3 class="anchor-heading"><a href="#dai-ma-yan-shi">¶</a><a href="javascript:void(0)" id="dai-ma-yan-shi" class="anchor-point"></a>代码演示</h3>'}),e.createElement(h,{title:"基础用法",id:"Demo01basic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Waypoint</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Icon</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Demo</span></span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>msg<span class="token punctuation">,</span> setMsg<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useState</span><span class="token punctuation">(</span><span class="token keyword null nil">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> setEnterMsg <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setMsg</span><span class="token punctuation">(</span><span class="token string">\'Waypoint 进入屏幕\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> setLeaveMsg <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setMsg</span><span class="token punctuation">(</span><span class="token string">\'Waypoint 离开屏幕\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-basic<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token punctuation">{</span>msg <span class="token operator">?</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-basic__message<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> <span class="token operator">:</span> <span class="token keyword null nil">null</span><span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-basic__scrollable-parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-basic__waypoint-line<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Waypoint</span></span> <span class="token attr-name">onEnter</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>setEnterMsg<span class="token punctuation">}</span></span> <span class="token attr-name">onLeave</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>setLeaveMsg<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Spacer</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-basic__spacer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Icon</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>down<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Demo</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},e.createElement(d)),e.createElement(h,{title:"Reveal",id:"Demo02reveal",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Waypoint</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Icon</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">CSSTransition</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'react-transition-group\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Reveal</span></span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>revealed<span class="token punctuation">,</span> setRevealed<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> reveal <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setRevealed</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> hide <span class="token operator">=</span> <span class="token maybe-class-name">React</span><span class="token punctuation">.</span><span class="token method function property-access">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setRevealed</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Waypoint</span></span> <span class="token attr-name">onEnter</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>reveal<span class="token punctuation">}</span></span> <span class="token attr-name">onLeave</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>hide<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CSSTransition</span></span>\n        <span class="token attr-name">in</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>revealed<span class="token punctuation">}</span></span>\n        <span class="token attr-name">timeout</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">500</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">classNames</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal<span class="token punctuation">"</span></span>\n        <span class="token attr-name">unmountOnExit</span>\n      <span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span>props<span class="token punctuation">.</span><span class="token property-access">children</span><span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CSSTransition</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Demo</span></span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal__scrollable-parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Reveal</span></span><span class="token punctuation">></span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal-text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token maybe-class-name">Surely</span> <span class="token maybe-class-name">You</span>\'re <span class="token maybe-class-name">Joking</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Mr</span><span class="token punctuation">.</span> <span class="token property-access"><span class="token maybe-class-name">Feynman</span></span><span class="token operator">!</span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Reveal</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Spacer</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Spacer</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal__spacer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Icon</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>down<span class="token punctuation">"</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>waypoint-demo-reveal-pulse<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Demo</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},e.createElement(m)),e.createElement(f,{html:'<h3 class="anchor-heading"><a href="#api">¶</a><a href="javascript:void(0)" id="api" class="anchor-point"></a>API</h3>\n<table class="table">\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>是否必须</th>\n<th>默认值</th>\n<th>备选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>onEnter</td>\n<td>元素滚动到屏幕内时的回调函数</td>\n<td><code>(data: IWaypointCallbackData) => void</code></td>\n<td>否</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>onLeave</td>\n<td>元素滚动到屏幕外时的回调函数</td>\n<td><code>(data: IWaypointCallbackData) => void</code></td>\n<td>否</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>onPositionChange</td>\n<td>元素位置变化时的回调函数</td>\n<td><code>(data: IWaypointCallbackData) => void</code></td>\n<td>否</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>topOffset</td>\n<td>距离容器顶部的距离</td>\n<td><code>number</code>\n \n|\n \n<code>string</code></td>\n<td>否</td>\n<td><code>0px</code></td>\n<td></td>\n</tr>\n<tr>\n<td>bottomOffset</td>\n<td>距离容器底部的距离</td>\n<td><code>number</code>\n \n|\n \n<code>string</code></td>\n<td>否</td>\n<td><code>0px</code></td>\n<td></td>\n</tr>\n<tr>\n<td>horizontal</td>\n<td>是否使用水平滚动模式</td>\n<td><code>boolean</code></td>\n<td>否</td>\n<td><code>false</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td>scrollableAncestor</td>\n<td>指定滚动容器的 DOM 元素，一般当外层有多个滚动容器时才需要使用</td>\n<td><code>Element</code></td>\n<td>否</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>fireOnRapidScroll</td>\n<td>当快速滚动时是否触发 \n<code>onEnter</code>\n 和 \n<code>onLeave</code></td>\n<td><code>boolean</code></td>\n<td>否</td>\n<td><code>true</code></td>\n<td></td>\n</tr>\n<tr>\n<td>children</td>\n<td>待追踪的元素，不传时可以认为是追踪屏幕内一条线</td>\n<td><code>ReactNode</code></td>\n<td>否</td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<p><strong>几点说明</strong></p>\n<ul>\n<li><a href="../../apidoc/interfaces/iwaypointcallbackdata.html"><code>IWaypointCallbackData</code> 的定义</a></li>\n<li>快速滚动顾名思义就是滚动速度非常快，元素可能进入屏幕后立刻又出了屏幕</li>\n<li><code>topOffset</code> 和 <code>bottomOffset</code> 可正可负，正负数效果和 <code>margin</code> 一样，正数往屏幕内偏移，负数往屏幕外偏移</li>\n<li><code>topOffset</code> 和 <code>bottomOffset</code> 可以是一个百分比，这个百分比是相对滚动容器大小的</li>\n<li>开启 <code>horizontal</code> 后，<code>topOffset</code> 其实是 <code>leftOffset</code>，而 <code>bottomOffset</code> 其实是 <code>rightOffset</code>，参数名特意没有变</li>\n<li><code>children</code> 只能是<strong>一个</strong>元素，这个元素必须是原生组件、<code>React.forwardRef</code> 包装过的自定义组件，或者是接受一个 <code>innerRef</code> 参数的自定义组件，其中自定义组件必须把 <code>ref</code> 设置到需要跟踪位置的 DOM 元素上</li>\n</ul>'}))}}},55978:(n,a,s)=>{"use strict";function t(n){for(var a=[],s=1;s<arguments.length;s++)a[s-1]=arguments[s];var t=setTimeout((function(){return n.apply(void 0,a)}),1);return{cancel:function(){clearTimeout(t)}}}s.d(a,{Z:()=>t})},32415:(n,a,s)=>{"use strict";s.d(a,{h:()=>d});var t=s(59312),p=s(24246),e=s(27378),o=s(49744),c=s(19185);function l(n,a){var s=function(n){var a;if(a="number"==typeof n?n:parseFloat(n),!Number.isNaN(a)&&Number.isFinite(a))return a}(n);if("number"==typeof s)return s;if("string"==typeof n){var t=function(n){if("%"===n.slice(-1))return parseFloat(n.slice(0,-1))/100}(n);if("number"==typeof t)return t*a}}function i(n){return(0,c.isElement)(n)&&"string"==typeof n.type}function u(n){return n.viewportBottom-n.viewportTop==0?3:n.viewportTop<=n.waypointTop&&n.waypointTop<=n.viewportBottom||n.viewportTop<=n.waypointBottom&&n.waypointBottom<=n.viewportBottom||n.waypointTop<=n.viewportTop&&n.viewportBottom<=n.waypointBottom?1:n.viewportBottom<n.waypointTop?2:n.waypointTop<n.viewportTop?0:3}var r=s(79352),k=s(55978),d=function(n){function a(){var a=null!==n&&n.apply(this,arguments)||this;return a.refElement=(0,e.createRef)(),a.previousPosition=4,a.handleScroll=function(n){if(a.refElement.current){var s=a.getBounds(),t=u(s),p=a.previousPosition,e=a.props,o=e.onPositionChange,c=e.onEnter,l=e.onLeave,i=e.fireOnRapidScroll;if(a.previousPosition=t,p!==t){var r={currentPosition:t,previousPosition:p,event:n,waypointTop:s.waypointTop,waypointBottom:s.waypointBottom,viewportTop:s.viewportTop,viewportBottom:s.viewportBottom};null==o||o(r),1===t?null==c||c(r):1!==p&&4!==p||null==l||l(r),i&&(2===p&&0===t||0===p&&2===t)&&(null==c||c({currentPosition:1,previousPosition:p,event:n,waypointTop:s.waypointTop,waypointBottom:s.waypointBottom,viewportTop:s.viewportTop,viewportBottom:s.viewportBottom}),null==l||l({currentPosition:t,previousPosition:1,event:n,waypointTop:s.waypointTop,waypointBottom:s.waypointBottom,viewportTop:s.viewportTop,viewportBottom:s.viewportBottom}))}}},a}return(0,t.ZT)(a,n),a.prototype.componentDidMount=function(){var n=this;r.Z&&(this.cancelOnNextTick=(0,k.Z)((function(){n.cancelOnNextTick=null,function(n,a){if(n&&!i(n)&&!a)throw new Error("<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a DOM element (e.g. <div>) nor does it use the innerRef prop.\n")}(n.props.children,n.refElement.current),n.scrollableAncestor=n.findScrollableAncestor(),n.scrollEventListenerUnsubscribe=(0,o.Oo)(n.scrollableAncestor,"scroll",n.handleScroll,{passive:!0}),n.resizeEventListenerUnsubscribe=(0,o.Oo)(window,"resize",n.handleScroll,{passive:!0}),n.handleScroll(null)})))},a.prototype.componentDidUpdate=function(){var n=this;r.Z&&this.scrollableAncestor&&(this.cancelOnNextTick||(this.cancelOnNextTick=(0,k.Z)((function(){n.cancelOnNextTick=null,n.handleScroll(null)}))))},a.prototype.componentWillUnmount=function(){var n,a,s;r.Z&&(null===(n=this.scrollEventListenerUnsubscribe)||void 0===n||n.call(this),null===(a=this.resizeEventListenerUnsubscribe)||void 0===a||a.call(this),null===(s=this.cancelOnNextTick)||void 0===s||s.cancel())},a.prototype.findScrollableAncestor=function(){var n=this.props,a=n.horizontal,s=n.scrollableAncestor;if(s)return s;for(var t=this.refElement.current;t.parentNode;){if((t=t.parentNode)===document.body)return window;var p=getComputedStyle(t),e=(a?p.getPropertyValue("overflow-x"):p.getPropertyValue("overflow-y"))||p.getPropertyValue("overflow");if("auto"===e||"scroll"===e)return t}return window},a.prototype.getBounds=function(){var n,a,s=this.props.horizontal,t=this.refElement.current.getBoundingClientRect(),p=t.left,e=t.top,o=t.right,c=t.bottom,i=s?p:e,u=s?o:c;if(this.scrollableAncestor===window)n=s?window.innerWidth:window.innerHeight,a=0;else{var r=this.scrollableAncestor;n=s?r.offsetWidth:r.offsetHeight,a=s?r.getBoundingClientRect().left:r.getBoundingClientRect().top}var k=this.props,d=k.bottomOffset;return{waypointTop:i,waypointBottom:u,viewportTop:a+l(k.topOffset,n),viewportBottom:a+n-l(d,n)}},a.prototype.render=function(){var n=this,a=this.props.children;if(!a)return(0,p.jsx)("span",{ref:this.refElement,style:{fontSize:0},"data-zv":"9.9.2"},void 0);var s=e.Children.only(a);return i(s)||(0,c.isForwardRef)(s)?(0,e.cloneElement)(s,{ref:function(a){n.refElement.current=a;var t=s.ref;t&&("function"==typeof t?t(a):t.current=a)}}):(0,e.cloneElement)(s,{innerRef:this.refElement})},a.defaultProps={topOffset:"0px",bottomOffset:"0px",horizontal:!1,fireOnRapidScroll:!0},a}(e.PureComponent)}}]);