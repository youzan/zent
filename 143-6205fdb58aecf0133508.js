(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{689:function(n,a,s){"use strict";s.r(a),s.d(a,"default",(function(){return y}));var t=s(20),e=s.n(t),p=s(0),o=s(1),c=s.n(o),l=s(46);function u(n,a){var s=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable}))),s.push.apply(s,t)}return s}function i(n){for(var a=1;a<arguments.length;a++){var s=null!=arguments[a]?arguments[a]:{};a%2?u(Object(s),!0).forEach((function(a){e()(n,a,s[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(s,a))}))}return n}var r=function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)("h3",{children:"Horizontal"}),Object(p.jsx)(l.ac.Legend,{children:"Sample"}),Object(p.jsxs)(l.ac,{type:"horizontal",children:[Object(p.jsx)(l.ac.Item,{label:"Time 1"}),Object(p.jsx)(l.ac.Item,{label:"Time 2",tip:"hello"}),Object(p.jsx)(l.ac.Item,{label:"Time 3"}),Object(p.jsx)(l.ac.Item,{size:0,label:"Custom length"})]}),Object(p.jsx)("h3",{children:"Vertical"}),Object(p.jsx)(l.ac.Legend,{children:"Sample"}),Object(p.jsxs)(l.ac,{type:"vertical",children:[Object(p.jsx)(l.ac.Item,{label:"Time 1"}),Object(p.jsx)(l.ac.Item,{label:"Time 2",tip:"hello"}),Object(p.jsx)(l.ac.Item,{label:"Time 3"}),Object(p.jsx)(l.ac.Item,{label:"No dot, custom color",showDot:!1,lineColor:"red"}),Object(p.jsx)(l.ac.Item,{label:"No label",showLabel:!1}),Object(p.jsx)(l.ac.Item,{label:"Custom dot color",dotColor:"#5197FF"}),Object(p.jsx)(l.ac.Item,{size:0,label:"Custom length"})]})]})},k=function(){return Object(p.jsx)("div",{children:Object(p.jsx)(l.ac,{type:"horizontal",timeline:["hello","world",{label:"blue",dotColor:"#5197FF"},{label:"red",lineColor:"#E70000"},{label:"color",color:"#E70000"}]})})},d=function(){var n=[{label:"online",color:"#00b90e",percent:.3},{label:"unknown",percent:.2,showDot:!1,showLabel:!1},{label:"offline",color:"#E70000",percent:.5}];class a extends c.a.Component{constructor(...n){super(...n),e()(this,"state",{size:500}),e()(this,"onChange",n=>{this.setState({size:n})})}render(){var a=this.state.size;return Object(p.jsxs)("div",{children:[Object(p.jsx)(l.yb,{value:a,onChange:this.onChange,showStepper:!0}),Object(p.jsx)(l.ac,{size:a,timeline:n})]})}}return Object(p.jsx)(a,{})};function m(n){return Object(p.jsx)(n.tag,i(i({},n.attributes),{},{dangerouslySetInnerHTML:{__html:n.html}}))}function h(n){return Object(p.jsx)(m,{tag:"section",html:n.html,attributes:{className:"zandoc-react-markdown"}})}function g(n){return Object(p.jsx)(m,{tag:"style",html:n.style})}class b extends o.Component{constructor(...n){super(...n),e()(this,"state",{showCode:!1}),e()(this,"toggle",()=>{this.setState({showCode:!this.state.showCode})})}render(){var n=this.state.showCode,a=this.props,s=a.title,t=a.src,e=a.children;return Object(p.jsxs)("div",{className:"zandoc-react-demo",children:[Object(p.jsx)("div",{className:"zandoc-react-demo__preview",children:e}),Object(p.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[Object(p.jsx)("div",{className:"zandoc-react-demo__title",children:Object(p.jsx)("p",{children:s||""})}),Object(p.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(n?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),n&&Object(p.jsx)("pre",{className:"zandoc-react-demo__code",children:Object(p.jsx)(m,{tag:"code",html:t,attributes:{className:"language-jsx"}})})]})}}class y extends o.Component{componentDidMount(){var n=location.hash;if(n){var a=document.querySelector('a[href="'.concat(n,'"]'));a&&Object(l.rc)(document.documentElement,0,function n(a,s){for(;a;)return a.offsetTop&&"static"!==getComputedStyle(a).position&&(s+=a.offsetTop),n(a.parentNode,s);return s}(a,-9))}}render(){return c.a.createElement("div",{className:"zandoc-react-container",key:null},c.a.createElement(g,{style:""}),c.a.createElement(h,{html:'<h2 class="anchor-heading"><a href="#timeline">¶</a><a href="javascript:void(0)" id="timeline" class="anchor-point"></a>Timeline</h2>\n<h3 class="anchor-heading"><a href="#demos">¶</a><a href="javascript:void(0)" id="demos" class="anchor-point"></a>Demos</h3>'}),c.a.createElement(b,{title:"Basic usage",id:"Demobasic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Timeline</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span><span class="token maybe-class-name">Horizontal</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Legend</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">Sample</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Timeline.Legend</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>horizontal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 2<span class="token punctuation">"</span></span> <span class="token attr-name">tip</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hello<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 3<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">size</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Custom length<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Timeline</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span><span class="token maybe-class-name">Vertical</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Legend</span></span><span class="token punctuation">></span></span><span class="token maybe-class-name">Sample</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Timeline.Legend</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vertical<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 2<span class="token punctuation">"</span></span> <span class="token attr-name">tip</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hello<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Time 3<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>No dot, custom color<span class="token punctuation">"</span></span> <span class="token attr-name">showDot</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span> <span class="token attr-name">lineColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>No label<span class="token punctuation">"</span></span> <span class="token attr-name">showLabel</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Custom dot color<span class="token punctuation">"</span></span> <span class="token attr-name">dotColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#5197FF<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline.Item</span></span> <span class="token attr-name">size</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Custom length<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Timeline</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(r)),c.a.createElement(b,{title:"Use Array",id:"Demoarray",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Timeline</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> timeline <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token string">\'hello\'</span><span class="token punctuation">,</span>\n  <span class="token string">\'world\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'blue\'</span><span class="token punctuation">,</span>\n    dotColor<span class="token operator">:</span> <span class="token string">\'#5197FF\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'red\'</span><span class="token punctuation">,</span>\n    lineColor<span class="token operator">:</span> <span class="token string">\'#E70000\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'color\'</span><span class="token punctuation">,</span>\n    color<span class="token operator">:</span> <span class="token string">\'#E70000\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>horizontal<span class="token punctuation">"</span></span> <span class="token attr-name">timeline</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>timeline<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(k)),c.a.createElement(b,{title:"Dynamic Size",id:"Demodynamic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">Timeline</span><span class="token punctuation">,</span> <span class="token maybe-class-name">NumberInput</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> timeline <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'online\'</span><span class="token punctuation">,</span>\n    color<span class="token operator">:</span> <span class="token string">\'#00b90e\'</span><span class="token punctuation">,</span>\n    percent<span class="token operator">:</span> <span class="token number">0.3</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'unknown\'</span><span class="token punctuation">,</span>\n    percent<span class="token operator">:</span> <span class="token number">0.2</span><span class="token punctuation">,</span>\n    showDot<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    showLabel<span class="token operator">:</span> <span class="token boolean">false</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span>\n    label<span class="token operator">:</span> <span class="token string">\'offline\'</span><span class="token punctuation">,</span>\n    color<span class="token operator">:</span> <span class="token string">\'#E70000\'</span><span class="token punctuation">,</span>\n    percent<span class="token operator">:</span> <span class="token number">0.5</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span>\n    size<span class="token operator">:</span> <span class="token number">500</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function-variable function">onChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">size</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      size<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> size <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">state</span><span class="token punctuation">;</span>\n\n    <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">NumberInput</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>size<span class="token punctuation">}</span></span> <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">onChange</span><span class="token punctuation">}</span></span> <span class="token attr-name">showStepper</span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Timeline</span></span> <span class="token attr-name">size</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>size<span class="token punctuation">}</span></span> <span class="token attr-name">timeline</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>timeline<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>\n  mountNode\n<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(d)),c.a.createElement(h,{html:'<h2 class="anchor-heading"><a href="#api">¶</a><a href="javascript:void(0)" id="api" class="anchor-point"></a>API</h2>\n<h3 class="anchor-heading"><a href="#timeline">¶</a><a href="javascript:void(0)" id="timeline" class="anchor-point"></a>Timeline</h3>\n<table class="table">\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n<th>Alternative</th>\n<th>Optional</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>horizontal or vertical</td>\n<td>string</td>\n<td><code>\'horizontal\'</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>size</td>\n<td>size</td>\n<td>number</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>timeline</td>\n<td>pass an array as data</td>\n<td>Array</td>\n<td></td>\n<td>yes</td>\n<td>yes</td>\n</tr>\n<tr>\n<td>className</td>\n<td>custom className</td>\n<td>string</td>\n<td><code>\'\'</code></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>style</td>\n<td>custom style</td>\n<td>object</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n</tbody>\n</table>\n<h3 class="anchor-heading"><a href="#timeline-item">¶</a><a href="javascript:void(0)" id="timeline-item" class="anchor-point"></a>Timeline Item</h3>\n<table class="table">\n<thead>\n<tr>\n<th>Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Default</th>\n<th>Alternative</th>\n<th>Optional</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>label</td>\n<td>label</td>\n<td>node</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>tip</td>\n<td>hover pop content</td>\n<td>node</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>color</td>\n<td>color, higher priority than \n<code>lineColor</code>\n and \n<code>dotColor</code></td>\n<td>string</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>lineColor</td>\n<td>line color</td>\n<td>string</td>\n<td><code>#999</code></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>dotColor</td>\n<td>dot color</td>\n<td>string</td>\n<td><code>#00B90E</code></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>type</td>\n<td>horizontal or vertical</td>\n<td>string</td>\n<td><code>\'horizontal\'</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>showLabel</td>\n<td>should display the label</td>\n<td>boolean</td>\n<td><code>true</code></td>\n<td><code>true | false</code></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>showDot</td>\n<td>should display the dot</td>\n<td>boolean</td>\n<td><code>true</code></td>\n<td><code>true | false</code></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>size</td>\n<td>size</td>\n<td>number</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>className</td>\n<td>custom className</td>\n<td>string</td>\n<td><code>\'\'</code></td>\n<td></td>\n<td>yes</td>\n</tr>\n<tr>\n<td>style</td>\n<td>custom style</td>\n<td>object</td>\n<td></td>\n<td></td>\n<td>yes</td>\n</tr>\n</tbody>\n</table>\n<h3 class="anchor-heading"><a href="#timeline-array">¶</a><a href="javascript:void(0)" id="timeline-array" class="anchor-point"></a>Timeline Array</h3>\n<p>Support all properties of <code>Timeline Item</code>.</p>\n<table class="table">\n<thead>\n<tr>\n<th>Extra Property</th>\n<th>Description</th>\n<th>Type</th>\n<th>Optional</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>id</td>\n<td>default \n<code>key</code>\n, or the array index will be used as \n<code>key</code></td>\n<td>string</td>\n<td>yes</td>\n</tr>\n<tr>\n<td>percent</td>\n<td>percent of total size when using dynamic size (0 &#x3C;= percent &#x3C;= 1)</td>\n<td>number</td>\n<td>yes</td>\n</tr>\n</tbody>\n</table>'}))}}}}]);