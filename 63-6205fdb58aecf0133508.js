(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{636:function(a,n,s){"use strict";s.r(n),s.d(n,"default",(function(){return h}));var t=s(20),p=s.n(t),e=s(0),c=s(1),o=s.n(c),l=s(46);function u(a,n){var s=Object.keys(a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(a);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable}))),s.push.apply(s,t)}return s}function k(a){for(var n=1;n<arguments.length;n++){var s=null!=arguments[n]?arguments[n]:{};n%2?u(Object(s),!0).forEach((function(n){p()(a,n,s[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(n){Object.defineProperty(a,n,Object.getOwnPropertyDescriptor(s,n))}))}return a}var i=function(){return Object(e.jsxs)("div",{className:"disabled-component-demo",children:[Object(e.jsxs)(l.y,{children:[Object(e.jsx)(l.e,{}),Object(e.jsx)(l.k,{type:"primary",children:"Disabled"}),Object(e.jsx)(l.pb,{href:"https://www.youzan.com/",target:"_blank",children:"www.youzan.com"}),Object(e.jsx)(l.n,{children:"Checkbox"}),Object(e.jsx)(l.kb,{}),Object(e.jsx)(l.kb,{type:"textarea"}),Object(e.jsx)(l.yb,{}),Object(e.jsxs)(l.Hb.Group,{children:[Object(e.jsx)(l.Hb,{value:"A",children:"A"}),Object(e.jsx)(l.Hb,{value:"B",children:"B"}),Object(e.jsx)(l.Hb.Button,{value:"C",children:"C"})]}),Object(e.jsx)(l.Jb,{}),Object(e.jsx)(l.Lb,{options:[]}),Object(e.jsx)(l.tb,{}),Object(e.jsx)(l.Vb,{}),Object(e.jsx)(l.Nb,{}),Object(e.jsx)(l.Tb,{}),Object(e.jsx)(l.Pb,{children:"SplitButton"}),Object(e.jsxs)(l.p,{children:[Object(e.jsx)(l.p.Panel,{title:"Collapse 1",children:"Collapse 1"},"1"),Object(e.jsx)(l.p.Panel,{title:"Collapse 1",children:"Collapse 2"},"2"),Object(e.jsx)(l.p.Panel,{title:"Collapse 1",disabled:!0,children:"Collapse 3"},"3")]}),Object(e.jsx)(l.q,{color:"#5197FF"})]}),Object(e.jsx)(l.k,{type:"primary",children:"Not Disabled"})]})},r=function(){return Object(e.jsx)(l.y,{children:Object(e.jsx)(l.k,{type:"primary",disabled:!1,children:"Button"})})};function m(a){return Object(e.jsx)(a.tag,k(k({},a.attributes),{},{dangerouslySetInnerHTML:{__html:a.html}}))}function d(a){return Object(e.jsx)(m,{tag:"section",html:a.html,attributes:{className:"zandoc-react-markdown"}})}function b(a){return Object(e.jsx)(m,{tag:"style",html:a.style})}class g extends c.Component{constructor(...a){super(...a),p()(this,"state",{showCode:!1}),p()(this,"toggle",()=>{this.setState({showCode:!this.state.showCode})})}render(){var a=this.state.showCode,n=this.props,s=n.title,t=n.src,p=n.children;return Object(e.jsxs)("div",{className:"zandoc-react-demo",children:[Object(e.jsx)("div",{className:"zandoc-react-demo__preview",children:p}),Object(e.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[Object(e.jsx)("div",{className:"zandoc-react-demo__title",children:Object(e.jsx)("p",{children:s||""})}),Object(e.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(a?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),a&&Object(e.jsx)("pre",{className:"zandoc-react-demo__code",children:Object(e.jsx)(m,{tag:"code",html:t,attributes:{className:"language-jsx"}})})]})}}class h extends c.Component{componentDidMount(){var a=location.hash;if(a){var n=document.querySelector('a[href="'.concat(a,'"]'));n&&Object(l.rc)(document.documentElement,0,function a(n,s){for(;n;)return n.offsetTop&&"static"!==getComputedStyle(n).position&&(s+=n.offsetTop),a(n.parentNode,s);return s}(n,-9))}}render(){return o.a.createElement("div",{className:"zandoc-react-container",key:null},o.a.createElement(b,{style:".disabled-component-demo {\n\tdisplay: inline-flex;\n\tflex-direction: column;\n}\n\n.disabled-component-demo > * {\n\tmargin-bottom: 10px;\n}"}),o.a.createElement(d,{html:'<h2 class="anchor-heading"><a href="#disabled">¶</a><a href="javascript:void(0)" id="disabled" class="anchor-point"></a>Disabled</h2>\n<p>Child Zent components will be disabled. The <code>disabled</code> property of component itself has a higher priority.</p>\n<h3 class="anchor-heading"><a href="#demos">¶</a><a href="javascript:void(0)" id="demos" class="anchor-point"></a>Demos</h3>'}),o.a.createElement(g,{title:"Basic Usage",id:"Demo1",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span>\n  <span class="token maybe-class-name">AutoComplete</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Disabled</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Button</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Link</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">MenuCascader</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">TabsCascader</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Checkbox</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Collapse</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Input</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">NumberInput</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Radio</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Rate</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Select</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Slider</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">Switch</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">SplitButton</span><span class="token punctuation">,</span>\n  <span class="token maybe-class-name">ColorPicker</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>disabled-component-demo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Disabled</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AutoComplete</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">Disabled</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Link</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.youzan.com/<span class="token punctuation">"</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        www<span class="token punctuation">.</span><span class="token property-access">youzan</span><span class="token punctuation">.</span><span class="token property-access">com</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Link</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Checkbox</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">Checkbox</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Checkbox</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>textarea<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">NumberInput</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Radio.Group</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Radio</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>A<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">A</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Radio</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Radio</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>B<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">B</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Radio</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Radio.Button</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>C<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">C</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Radio.Button</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Radio.Group</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Rate</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Select</span></span> <span class="token attr-name">options</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MenuCascader</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabsCascader</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Slider</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Switch</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SplitButton</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">SplitButton</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">SplitButton</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Collapse</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Collapse.Panel</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Collapse 1<span class="token punctuation">"</span></span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n          <span class="token maybe-class-name">Collapse</span> <span class="token number">1</span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Collapse.Panel</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Collapse.Panel</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Collapse 1<span class="token punctuation">"</span></span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n          <span class="token maybe-class-name">Collapse</span> <span class="token number">2</span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Collapse.Panel</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Collapse.Panel</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Collapse 1<span class="token punctuation">"</span></span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span> <span class="token attr-name">disabled</span><span class="token punctuation">></span></span>\n          <span class="token maybe-class-name">Collapse</span> <span class="token number">3</span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Collapse.Panel</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Collapse</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ColorPicker</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#5197FF<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Disabled</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">Not</span> <span class="token maybe-class-name">Disabled</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},o.a.createElement(i)),o.a.createElement(g,{title:"Priority",id:"Demo2",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Disabled</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Disabled</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span> <span class="token attr-name">disabled</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n      <span class="token maybe-class-name">Button</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Disabled</span></span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},o.a.createElement(r)),o.a.createElement(d,{html:'<h3 class="anchor-heading"><a href="#api">¶</a><a href="javascript:void(0)" id="api" class="anchor-point"></a>API</h3>\n<table class="table">\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Required</th>\n<th>Default</th>\n<th>Alternative</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>value</td>\n<td></td>\n<td>bool</td>\n<td>No</td>\n<td>true</td>\n<td></td>\n</tr>\n</tbody>\n</table>'}))}}}}]);