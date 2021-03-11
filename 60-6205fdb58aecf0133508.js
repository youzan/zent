(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{586:function(n,a,s){"use strict";s.r(a),s.d(a,"default",(function(){return v}));var t=s(20),p=s.n(t),e=s(0),o=s(1),c=s.n(o),u=s(46);function l(n,a){var s=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable}))),s.push.apply(s,t)}return s}function i(n){for(var a=1;a<arguments.length;a++){var s=null!=arguments[a]?arguments[a]:{};a%2?l(Object(s),!0).forEach((function(a){p()(n,a,s[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(s,a))}))}return n}var k=function(){class n extends o.Component{constructor(...n){super(...n),p()(this,"state",{}),p()(this,"handleChange",(n,a)=>{this.setState({value:n,chosenDays:a})}),p()(this,"handleChange1",(n,a)=>{this.setState({value1:n,chosenDays1:a})})}render(){var n=this.state,a=n.value,s=n.chosenDays,t=n.value1,p=n.chosenDays1;return Object(e.jsxs)("div",{children:[Object(e.jsx)(u.w,{onChange:this.handleChange,value:a,format:"YYYY-MM-DD HH:mm:ss",valueType:"number",chosenDays:s}),Object(e.jsx)("br",{}),Object(e.jsx)(u.w,{onChange:this.handleChange1,value:t,format:"YYYY-MM-DD HH:mm:ss",chosenDays:p,preset:[{text:"今天",value:0},{text:"昨天",value:1},{text:"近7天",value:7},{text:"近30天",value:30}]})]})}}return Object(e.jsx)(n,{})},r=function(){class n extends o.Component{constructor(...n){super(...n),p()(this,"state",{}),p()(this,"handleChange",(n,a)=>{this.setState({value:n,chosenDays:a})}),p()(this,"handleChange1",(n,a)=>{this.setState({value1:n,chosenDays1:a})}),p()(this,"handleChange2",(n,a)=>{this.setState({value2:n,chosenDays2:a})})}render(){var n=this.state,a=n.value,s=n.chosenDays,t=n.value1,p=n.chosenDays1,o=n.value2,c=n.chosenDays2;return Object(e.jsxs)("div",{children:[Object(e.jsx)(u.w,{onChange:this.handleChange,value:a,format:"YYYY-MM-DD HH:mm:ss",valueType:"number",chosenDays:s}),Object(e.jsx)("br",{}),Object(e.jsx)(u.w,{onChange:this.handleChange1,value:t,format:"YYYY-MM-DD HH:mm:ss",chosenDays:p,preset:[{text:"上一周期",value:["2019-01-01","2019-01-02"]},{text:"一月",value:["2019-01-01","2019-01-31"]}]}),Object(e.jsx)("br",{}),Object(e.jsx)(u.w,{onChange:this.handleChange2,value:o,format:"YYYY-MM-DD HH:mm:ss",valueType:"number",chosenDays:c,defaultSelectedPresetIndex:1})]})}}return Object(e.jsx)(n,{})};function d(n){return Object(e.jsx)(n.tag,i(i({},n.attributes),{},{dangerouslySetInnerHTML:{__html:n.html}}))}function h(n){return Object(e.jsx)(d,{tag:"section",html:n.html,attributes:{className:"zandoc-react-markdown"}})}function m(n){return Object(e.jsx)(d,{tag:"style",html:n.style})}class g extends o.Component{constructor(...n){super(...n),p()(this,"state",{showCode:!1}),p()(this,"toggle",()=>{this.setState({showCode:!this.state.showCode})})}render(){var n=this.state.showCode,a=this.props,s=a.title,t=a.src,p=a.children;return Object(e.jsxs)("div",{className:"zandoc-react-demo",children:[Object(e.jsx)("div",{className:"zandoc-react-demo__preview",children:p}),Object(e.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[Object(e.jsx)("div",{className:"zandoc-react-demo__title",children:Object(e.jsx)("p",{children:s||""})}),Object(e.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(n?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),n&&Object(e.jsx)("pre",{className:"zandoc-react-demo__code",children:Object(e.jsx)(d,{tag:"code",html:t,attributes:{className:"language-jsx"}})})]})}}class v extends o.Component{componentDidMount(){var n=location.hash;if(n){var a=document.querySelector('a[href="'.concat(n,'"]'));a&&Object(u.rc)(document.documentElement,0,function n(a,s){for(;a;)return a.offsetTop&&"static"!==getComputedStyle(a).position&&(s+=a.offsetTop),n(a.parentNode,s);return s}(a,-9))}}render(){return c.a.createElement("div",{className:"zandoc-react-container",key:null},c.a.createElement(m,{style:""}),c.a.createElement(h,{html:'<h2 class="anchor-heading"><a href="#daterangequickpicker">¶</a><a href="javascript:void(0)" id="daterangequickpicker" class="anchor-point"></a>DateRangeQuickPicker</h2>\n<p>简单的时间范围选择组件, 提供前 7 天和前 30 天的快速选项.</p>\n<h3 class="anchor-heading"><a href="#shi-yong-chang-jing">¶</a><a href="javascript:void(0)" id="shi-yong-chang-jing" class="anchor-point"></a>使用场景</h3>\n<p>快速选择日期区间</p>\n<h3 class="anchor-heading"><a href="#dai-ma-yan-shi">¶</a><a href="javascript:void(0)" id="dai-ma-yan-shi" class="anchor-point"></a>代码演示</h3>'}),c.a.createElement(g,{title:"基础用法",id:"Demobasic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">DateRangeQuickPicker</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Simple</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> chosenDays</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      value<span class="token punctuation">,</span>\n      chosenDays<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleChange1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> chosenDays</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      value1<span class="token operator">:</span> value<span class="token punctuation">,</span>\n      chosenDays1<span class="token operator">:</span> chosenDays<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> value<span class="token punctuation">,</span> chosenDays<span class="token punctuation">,</span> value1<span class="token punctuation">,</span> chosenDays1 <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">state</span><span class="token punctuation">;</span>\n\n    <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DateRangeQuickPicker</span></span>\n          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">handleChange</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>value<span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YYYY-MM-DD HH:mm:ss<span class="token punctuation">"</span></span>\n          <span class="token attr-name">valueType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>number<span class="token punctuation">"</span></span>\n          <span class="token attr-name">chosenDays</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>chosenDays<span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DateRangeQuickPicker</span></span>\n          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">handleChange1</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>value1<span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YYYY-MM-DD HH:mm:ss<span class="token punctuation">"</span></span>\n          <span class="token attr-name">chosenDays</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>chosenDays1<span class="token punctuation">}</span></span>\n          <span class="token attr-name">preset</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'今天\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'昨天\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'近7天\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'近30天\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Simple</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(k)),c.a.createElement(g,{title:"快速选择时间范围",id:"Demopreset",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">DateRangeQuickPicker</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Simple</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> chosenDays</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      value<span class="token punctuation">,</span>\n      chosenDays<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleChange1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> chosenDays</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      value1<span class="token operator">:</span> value<span class="token punctuation">,</span>\n      chosenDays1<span class="token operator">:</span> chosenDays<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleChange2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> chosenDays</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token method function property-access">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      value2<span class="token operator">:</span> value<span class="token punctuation">,</span>\n      chosenDays2<span class="token operator">:</span> chosenDays<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>\n      value<span class="token punctuation">,</span>\n      chosenDays<span class="token punctuation">,</span>\n      value1<span class="token punctuation">,</span>\n      chosenDays1<span class="token punctuation">,</span>\n      value2<span class="token punctuation">,</span>\n      chosenDays2<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">state</span><span class="token punctuation">;</span>\n\n    <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DateRangeQuickPicker</span></span>\n          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">handleChange</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>value<span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YYYY-MM-DD HH:mm:ss<span class="token punctuation">"</span></span>\n          <span class="token attr-name">valueType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>number<span class="token punctuation">"</span></span>\n          <span class="token attr-name">chosenDays</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>chosenDays<span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DateRangeQuickPicker</span></span>\n          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">handleChange1</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>value1<span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YYYY-MM-DD HH:mm:ss<span class="token punctuation">"</span></span>\n          <span class="token attr-name">chosenDays</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>chosenDays1<span class="token punctuation">}</span></span>\n          <span class="token attr-name">preset</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'上一周期\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'2019-01-01\'</span><span class="token punctuation">,</span> <span class="token string">\'2019-01-02\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n              text<span class="token operator">:</span> <span class="token string">\'一月\'</span><span class="token punctuation">,</span>\n              value<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'2019-01-01\'</span><span class="token punctuation">,</span> <span class="token string">\'2019-01-31\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">DateRangeQuickPicker</span></span>\n          <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token property-access">handleChange2</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>value2<span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YYYY-MM-DD HH:mm:ss<span class="token punctuation">"</span></span>\n          <span class="token attr-name">valueType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>number<span class="token punctuation">"</span></span>\n          <span class="token attr-name">chosenDays</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>chosenDays2<span class="token punctuation">}</span></span>\n          <span class="token attr-name">defaultSelectedPresetIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Simple</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},c.a.createElement(r)),c.a.createElement(h,{html:"<h3 class=\"anchor-heading\"><a href=\"#api\">¶</a><a href=\"javascript:void(0)\" id=\"api\" class=\"anchor-point\"></a>API</h3>\n<table class=\"table\">\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>备选值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>onChange</td>\n<td>时间变更回调函数</td>\n<td><code>(value, chosenDay) => void</code></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>value</td>\n<td>起始、结束时间</td>\n<td>array</td>\n<td><code>[]</code></td>\n<td></td>\n</tr>\n<tr>\n<td>preset</td>\n<td>自定义快捷选项</td>\n<td>array</td>\n<td><code>[{text: '最近7天', value: 7}, {text: '最近30天', value: 30}]</code></td>\n<td></td>\n</tr>\n<tr>\n<td>defaultSelectedPresetIndex</td>\n<td>默认选中的 preset 元素数组下标</td>\n<td><code>number</code></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>valueType</td>\n<td>设置 onChange 的返回值</td>\n<td><code>string</code></td>\n<td><code>''</code></td>\n<td><code>'date'</code>\n, \n<code>'number'</code>\n, \n<code>'string'</code></td>\n</tr>\n<tr>\n<td>format</td>\n<td>返回日期字符串格式</td>\n<td><code>string</code></td>\n<td><code>'YYYY-MM-DD'</code>\n 或 \n<code>'YYYY-MM-DD HH:mm:ss'</code></td>\n<td></td>\n</tr>\n<tr>\n<td>chosenDays</td>\n<td>选择天数</td>\n<td><code>number</code>\n \n|\n \n<code>array</code></td>\n<td></td>\n<td></td>\n</tr>\n<tr>\n<td>min</td>\n<td>可选日期的最小值</td>\n<td><code>string</code>\n \n|\n \n<code>Date</code></td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n<tr>\n<td>max</td>\n<td>可选日期的最大值</td>\n<td><code>string</code>\n \n|\n \n<code>Date</code></td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n<tr>\n<td>className</td>\n<td>自定义类名</td>\n<td><code>string</code></td>\n<td><code>''</code></td>\n<td></td>\n</tr>\n</tbody>\n</table>"}))}}}}]);