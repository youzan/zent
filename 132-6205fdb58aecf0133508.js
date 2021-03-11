(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{625:function(n,s,a){"use strict";a.r(s),a.d(s,"default",(function(){return j}));var t=a(20),p=a.n(t),o=a(0),e=a(1),c=a.n(e),l=a(46);function u(n,s){var a=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);s&&(t=t.filter((function(s){return Object.getOwnPropertyDescriptor(n,s).enumerable}))),a.push.apply(a,t)}return a}function r(n){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?u(Object(a),!0).forEach((function(s){p()(n,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(s){Object.defineProperty(n,s,Object.getOwnPropertyDescriptor(a,s))}))}return n}var i=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"showAlertInfo",()=>{l.Rb.alert({content:"这个是具体内容",parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.showAlertInfo,children:"消息对话框"})}}return Object(o.jsx)(n,{})},k=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"onConfirm",()=>{l.xb.success("我真的知道了")}),p()(this,"onCancel",()=>{l.xb.error("我真的取消了")}),p()(this,"showAlertConfirm",()=>{l.Rb.confirm({content:Object(o.jsx)("p",{children:"这个是内容"}),onConfirm:this.onConfirm,onCancel:this.onCancel,parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.showAlertConfirm,children:"消息对话框"})}}return Object(o.jsx)(n,{})},d=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"autoCloseConfirm",()=>{var n=l.Rb.confirm({content:Object(o.jsx)("p",{children:"一秒后自动关闭"}),parentComponent:this});setTimeout(n,1e3)})}render(){return Object(o.jsx)(l.k,{onClick:this.autoCloseConfirm,children:"自动关闭对话框"})}}return Object(o.jsx)(n,{})},m=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"promiseConfirm",()=>{l.Rb.confirm({content:"点击确定后三秒自动关闭",title:"onConfirm返回Promise",onConfirm:()=>new Promise(n=>{setTimeout(()=>{n()},3e3)}),parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.promiseConfirm,children:"自动关闭对话框(Promise)"})}}return Object(o.jsx)(n,{})},h=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"showAlertInfo",()=>{l.Rb.alert({type:"info",content:"这个是具体内容",title:"这是一个消息标题",parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.showAlertInfo,children:"含有图标消息对话框"})}}return Object(o.jsx)(n,{})},f=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"showAlertConfirm",()=>{l.Rb.confirm({confirmType:"danger",confirmText:"删除",cancelText:"取消",content:"确认删除吗？",title:"请确认",parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.showAlertConfirm,type:"danger",children:"删除"})}}return Object(o.jsx)(n,{})},y=function(){class n extends c.a.Component{constructor(...n){super(...n),p()(this,"showAlertInfo",()=>{l.Rb.alert({closeBtn:!0,maskClosable:!0,content:"这个是具体内容",parentComponent:this})})}render(){return Object(o.jsx)(l.k,{onClick:this.showAlertInfo,children:"带有关闭按钮"})}}return Object(o.jsx)(n,{})};function g(n){return Object(o.jsx)(n.tag,r(r({},n.attributes),{},{dangerouslySetInnerHTML:{__html:n.html}}))}function w(n){return Object(o.jsx)(g,{tag:"section",html:n.html,attributes:{className:"zandoc-react-markdown"}})}function b(n){return Object(o.jsx)(g,{tag:"style",html:n.style})}class C extends e.Component{constructor(...n){super(...n),p()(this,"state",{showCode:!1}),p()(this,"toggle",()=>{this.setState({showCode:!this.state.showCode})})}render(){var n=this.state.showCode,s=this.props,a=s.title,t=s.src,p=s.children;return Object(o.jsxs)("div",{className:"zandoc-react-demo",children:[Object(o.jsx)("div",{className:"zandoc-react-demo__preview",children:p}),Object(o.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[Object(o.jsx)("div",{className:"zandoc-react-demo__title",children:Object(o.jsx)("p",{children:a||""})}),Object(o.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(n?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),n&&Object(o.jsx)("pre",{className:"zandoc-react-demo__code",children:Object(o.jsx)(g,{tag:"code",html:t,attributes:{className:"language-jsx"}})})]})}}class j extends e.Component{componentDidMount(){var n=location.hash;if(n){var s=document.querySelector('a[href="'.concat(n,'"]'));s&&Object(l.rc)(document.documentElement,0,function n(s,a){for(;s;)return s.offsetTop&&"static"!==getComputedStyle(s).position&&(a+=s.offsetTop),n(s.parentNode,a);return a}(s,-9))}}render(){return c.a.createElement("div",{className:"zandoc-react-container",key:null},c.a.createElement(b,{style:""}),c.a.createElement(w,{html:'<h2 class="anchor-heading"><a href="#sweetalert-kuai-jie-dui-hua-kuang">¶</a><a href="javascript:void(0)" id="sweetalert-kuai-jie-dui-hua-kuang" class="anchor-point"></a>Sweetalert 快捷对话框</h2>\n<p>快速唤起 Dialog 组件</p>\n<h3 class="anchor-heading"><a href="#shi-yong-zhi-nan">¶</a><a href="javascript:void(0)" id="shi-yong-zhi-nan" class="anchor-point"></a>使用指南</h3>\n<ul>\n<li>组件不提供个性化选项，如有需要请使用 Dialog 组件。</li>\n</ul>\n<h3 class="anchor-heading"><a href="#dai-ma-yan-shi">¶</a><a href="javascript:void(0)" id="dai-ma-yan-shi" class="anchor-point"></a>代码演示</h3>'}),c.a.createElement(C,{title:"基础用法",id:"Demobasic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showAlertInfo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      content<span class="token operator">:</span> <span class="token string">\'这个是具体内容\'</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">showAlertInfo</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>消息对话框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(i)),c.a.createElement(C,{title:"带有确认和取消按钮",id:"Demowithbuttons",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Notify</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">onConfirm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Notify</span><span class="token punctuation">.</span><span class="token method function property-access">success</span><span class="token punctuation">(</span><span class="token string">\'我真的知道了\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function-variable function">onCancel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Notify</span><span class="token punctuation">.</span><span class="token method function property-access">error</span><span class="token punctuation">(</span><span class="token string">\'我真的取消了\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function-variable function">showAlertConfirm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">confirm</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      content<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>这个是内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n      onConfirm<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">onConfirm</span><span class="token punctuation">,</span>\n      onCancel<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">onCancel</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">showAlertConfirm</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>消息对话框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(k)),c.a.createElement(C,{title:"自动关闭",id:"Democlosedexternal",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">autoCloseConfirm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> close <span class="token operator">=</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">confirm</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      content<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>一秒后自动关闭<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span>close<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">autoCloseConfirm</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>自动关闭对话框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(d)),c.a.createElement(C,{title:"回调返回 Promise",id:"Demoreturnpromise",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">promiseConfirm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">confirm</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      content<span class="token operator">:</span> <span class="token string">\'点击确定后三秒自动关闭\'</span><span class="token punctuation">,</span>\n      title<span class="token operator">:</span> <span class="token string">\'onConfirm返回Promise\'</span><span class="token punctuation">,</span>\n      <span class="token function-variable function">onConfirm</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">promiseConfirm</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token function">自动关闭对话框</span><span class="token punctuation">(</span><span class="token known-class-name class-name">Promise</span><span class="token punctuation">)</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(m)),c.a.createElement(C,{title:"标题旁带有 icon 的 Dialog",id:"Demowithicon",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showAlertInfo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      type<span class="token operator">:</span> <span class="token string">\'info\'</span><span class="token punctuation">,</span>\n      content<span class="token operator">:</span> <span class="token string">\'这个是具体内容\'</span><span class="token punctuation">,</span>\n      title<span class="token operator">:</span> <span class="token string">\'这是一个消息标题\'</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">showAlertInfo</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>含有图标消息对话框<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(h)),c.a.createElement(C,{title:"支持设置 Dialog 中的 button 类型",id:"Demobuttontype",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showAlertConfirm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">confirm</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      confirmType<span class="token operator">:</span> <span class="token string">\'danger\'</span><span class="token punctuation">,</span>\n      confirmText<span class="token operator">:</span> <span class="token string">\'删除\'</span><span class="token punctuation">,</span>\n      cancelText<span class="token operator">:</span> <span class="token string">\'取消\'</span><span class="token punctuation">,</span>\n      content<span class="token operator">:</span> <span class="token string">\'确认删除吗？\'</span><span class="token punctuation">,</span>\n      title<span class="token operator">:</span> <span class="token string">\'请确认\'</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">showAlertConfirm</span><span class="token punctuation">}</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>danger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>删除<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(f)),c.a.createElement(C,{title:"带有右上角的关闭按钮",id:"Demowithclosebtn",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showAlertInfo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token maybe-class-name">Sweetalert</span><span class="token punctuation">.</span><span class="token method function property-access">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      closeBtn<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      maskClosable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      content<span class="token operator">:</span> <span class="token string">\'这个是具体内容\'</span><span class="token punctuation">,</span>\n      parentComponent<span class="token operator">:</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">showAlertInfo</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>带有关闭按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrapper</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(y)),c.a.createElement(w,{html:"<h3 class=\"anchor-heading\"><a href=\"#api\">¶</a><a href=\"javascript:void(0)\" id=\"api\" class=\"anchor-point\"></a>API</h3>\n<h4 class=\"anchor-heading\"><a href=\"#alert\">¶</a><a href=\"javascript:void(0)\" id=\"alert\" class=\"anchor-point\"></a>alert</h4>\n<table class=\"table\">\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>备选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>content</td>\n<td>弹窗中的内容</td>\n<td>node</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>type</td>\n<td>弹窗的类型, 设置会在 title 左边显示一个小图标, 不传不会显示图标</td>\n<td>string</td>\n<td>-</td>\n<td><code>'info'</code>\n, \n<code>'success'</code>\n, \n<code>'error'</code>\n, \n<code>'warning'</code></td>\n</tr>\n<tr>\n<td>title</td>\n<td>弹窗的标题</td>\n<td>node</td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n<tr>\n<td>onConfirm</td>\n<td>确定操作回调函数</td>\n<td>func</td>\n<td><code>noop</code></td>\n<td></td>\n</tr>\n<tr>\n<td>confirmText</td>\n<td>确定按钮文案</td>\n<td>string</td>\n<td><code>'我知道了'</code></td>\n<td></td>\n</tr>\n<tr>\n<td>confirmType</td>\n<td>确定按钮的类型</td>\n<td>string</td>\n<td><code>'primary'</code></td>\n<td><code>'default'</code>\n、\n<code>'primary'</code>\n、\n<code>'danger'</code>\n、\n<code>'success'</code></td>\n</tr>\n<tr>\n<td>closeBtn</td>\n<td>是否显示右上角关闭按钮</td>\n<td>bool</td>\n<td><code>false</code></td>\n<td></td>\n</tr>\n<tr>\n<td>maskClosable</td>\n<td>点击遮罩是否可以关闭</td>\n<td>bool</td>\n<td><code>false</code></td>\n<td></td>\n</tr>\n<tr>\n<td>parentComponent</td>\n<td>父级组件实例，i18n 需要通过这个传递 context</td>\n<td>ReactInstance</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>className</td>\n<td>额外的 className</td>\n<td>string</td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<h4 class=\"anchor-heading\"><a href=\"#confirm\">¶</a><a href=\"javascript:void(0)\" id=\"confirm\" class=\"anchor-point\"></a>confirm</h4>\n<table class=\"table\">\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>备选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>content</td>\n<td>弹窗中的内容</td>\n<td>node</td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>type</td>\n<td>弹窗的类型, 设置会在 title 左边显示一个小图标, 不传不会显示图标</td>\n<td>string</td>\n<td>-</td>\n<td><code>'info'</code>\n, \n<code>'success'</code>\n, \n<code>'error'</code>\n, \n<code>'warning'</code></td>\n</tr>\n<tr>\n<td>title</td>\n<td>弹窗的标题</td>\n<td>node</td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n<tr>\n<td>onCancel</td>\n<td>取消操作回调函数</td>\n<td>func</td>\n<td><code>noop</code></td>\n<td></td>\n</tr>\n<tr>\n<td>onConfirm</td>\n<td>确定操作回调函数</td>\n<td>func</td>\n<td><code>noop</code></td>\n<td></td>\n</tr>\n<tr>\n<td>cancelText</td>\n<td>取消按钮文案</td>\n<td>string</td>\n<td><code>'取消'</code></td>\n<td></td>\n</tr>\n<tr>\n<td>confirmText</td>\n<td>确定按钮文案</td>\n<td>string</td>\n<td><code>'确定'</code></td>\n<td></td>\n</tr>\n<tr>\n<td>confirmType</td>\n<td>确定按钮的类型</td>\n<td>string</td>\n<td><code>'primary'</code></td>\n<td><code>'default'</code>\n、\n<code>'primary'</code>\n、\n<code>'danger'</code>\n、\n<code>'success'</code></td>\n</tr>\n<tr>\n<td>closeBtn</td>\n<td>是否显示右上角关闭按钮</td>\n<td>bool</td>\n<td><code>false</code></td>\n<td></td>\n</tr>\n<tr>\n<td>maskClosable</td>\n<td>点击遮罩是否可以关闭</td>\n<td>bool</td>\n<td><code>false</code></td>\n<td></td>\n</tr>\n<tr>\n<td>className</td>\n<td>额外的 className</td>\n<td>string</td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n</tbody>\n</table>\n<ul>\n<li><code>Sweetalert.alert</code> 和 <code>Sweetalert.confirm</code> 的返回值是可以用来手动关闭对话框的函数。</li>\n<li>如果 <code>onConfirm</code> 的返回值是 <code>Promise</code>, 对应的按钮会在 <code>Promise</code> pending 时保持在 loading 状态；如果 <code>Promise</code> reject，对话框不会关闭，如果 <code>Promise</code> resolve 对话框关闭。</li>\n<li>如果 <code>onConfirm</code> 没有参数并且返回值是 <code>false</code> 对话框不会关闭。</li>\n<li>如果 <code>onConfirm</code> 有一个参数的话，需要手动调用 <code>close</code> 这个参数来关闭对话框。</li>\n</ul>"}))}}}}]);