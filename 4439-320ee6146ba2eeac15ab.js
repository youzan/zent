(self.webpackChunkzent_docs=self.webpackChunkzent_docs||[]).push([[4439],{84439:(n,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>g});var s=a(73450),e=a(27378),o=a(57318),c=a(89522),p=a(96681),r=a(24246);function l(n,t){var a=Object.keys(n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.push.apply(a,s)}return a}function i(n){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){(0,s.Z)(n,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(a,t))}))}return n}var u=function(){return(0,r.jsx)(c.q,{text:"basic usage"})},d=function(){return(0,r.jsx)(c.q,{text:"customize usage",onCopySuccess:"复制成功啦！",children:(0,r.jsx)(p.z,{type:"primary",children:"点我"})})};function h(n){return(0,r.jsx)(n.tag,i(i({},n.attributes),{},{dangerouslySetInnerHTML:{__html:n.html}}))}function m(n){return(0,r.jsx)(h,{tag:"section",html:n.html,attributes:{className:"zandoc-react-markdown"}})}function k(n){return(0,r.jsx)(h,{tag:"style",html:n.style})}function y(n,t){for(;n;)return n.offsetTop&&"static"!==getComputedStyle(n).position&&(t+=n.offsetTop),y(n.parentNode,t);return t}class f extends e.Component{constructor(...n){super(...n),(0,s.Z)(this,"state",{showCode:!1}),(0,s.Z)(this,"toggle",(()=>{this.setState({showCode:!this.state.showCode})}))}render(){var n=this.state.showCode,t=this.props,a=t.title,s=t.src,e=t.children;return(0,r.jsxs)("div",{className:"zandoc-react-demo",children:[(0,r.jsx)("div",{className:"zandoc-react-demo__preview",children:e}),(0,r.jsxs)("div",{className:"zandoc-react-demo__bottom",onClick:this.toggle,children:[(0,r.jsx)("div",{className:"zandoc-react-demo__title",children:(0,r.jsx)("p",{children:a||""})}),(0,r.jsx)("i",{className:"zenticon zenticon-caret-up zandoc-react-demo__toggle ".concat(n?"zandoc-react-demo__toggle-on":"zandoc-react-demo__toggle-off")})]}),n&&(0,r.jsx)("pre",{className:"zandoc-react-demo__code",children:(0,r.jsx)(h,{tag:"code",html:s,attributes:{className:"language-jsx"}})})]})}}class g extends e.Component{componentDidMount(){var n=location.hash;if(n){var t=document.querySelector('a[href="'.concat(n,'"]'));t&&(0,o.l)(document.documentElement,0,y(t,-9))}}render(){return e.createElement("div",{className:"zandoc-react-container"},e.createElement(k,{style:""}),e.createElement(m,{html:'<h2 class="anchor-heading"><a href="#copybutton-fu-zhi-an-niu">¶</a><a href="javascript:void(0)" id="copybutton-fu-zhi-an-niu" class="anchor-point"></a>CopyButton 复制按钮</h2>\n<p>复制按钮，点击后复制指定的文本到系统剪贴板中。</p>\n<h3 class="anchor-heading"><a href="#shi-yong-zhi-nan">¶</a><a href="javascript:void(0)" id="shi-yong-zhi-nan" class="anchor-point"></a>使用指南</h3>\n<ul>\n<li>当需要复制某些文本的时候，可以使用此组件</li>\n<li>不依赖 Flash，所以在某些老版本浏览器上可能失败</li>\n</ul>\n<h3 class="anchor-heading"><a href="#dai-ma-yan-shi">¶</a><a href="javascript:void(0)" id="dai-ma-yan-shi" class="anchor-point"></a>代码演示</h3>'}),e.createElement(f,{title:"基础用法",id:"Demobasic",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">CopyButton</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CopyButton</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>basic usage<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},e.createElement(u)),e.createElement(f,{title:"自定义组件",id:"Democustomize",src:'<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">CopyButton</span><span class="token punctuation">,</span> <span class="token maybe-class-name">Button</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">\'zent\'</span><span class="token punctuation">;</span>\n\n<span class="token maybe-class-name">ReactDOM</span><span class="token punctuation">.</span><span class="token method function property-access">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CopyButton</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>customize usage<span class="token punctuation">"</span></span> <span class="token attr-name">onCopySuccess</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>复制成功啦！<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点我<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">CopyButton</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span><span class="token punctuation">;</span>'},e.createElement(d)),e.createElement(m,{html:'<h3 class="anchor-heading"><a href="#api">¶</a><a href="javascript:void(0)" id="api" class="anchor-point"></a>API</h3>\n<table class="table">\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>text</td>\n<td>需要复制的文本</td>\n<td><code>string</code>\n \n|\n \n<code>() => string</code></td>\n<td></td>\n</tr>\n<tr>\n<td>onCopySuccess</td>\n<td>复制成功后的回调函数，如果是字符串则使用 \n<code>Notify.info</code>\n 提示</td>\n<td>function \n|\n string</td>\n<td><code>\'复制成功\'</code></td>\n</tr>\n<tr>\n<td>onCopyError</td>\n<td>复制失败后的回调函数，如果是字符串则使用 \n<code>Notify.error</code>\n 提示</td>\n<td>function \n|\n string</td>\n<td><code>\'复制失败\'</code></td>\n</tr>\n</tbody>\n</table>'}))}}},89522:(n,t,a)=>{"use strict";a.d(t,{q:()=>h});var s=a(59312),e=a(24246),o=a(27378),c=a(90347),p=a(23476),r=a(52074),l=a(42690),i=a(14805),u=function(n){var t,a,s,e,o=!1;try{if(t=function(){var n=document.getSelection();if(!n.rangeCount)return l.Z;for(var t=document.activeElement,a=[],s=0;s<n.rangeCount;s++)a.push(n.getRangeAt(s));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return n.removeAllRanges(),function(){"Caret"===n.type&&n.removeAllRanges(),n.rangeCount||a.forEach((function(t){n.addRange(t)})),t&&t.focus()}}(),a=document.createRange(),s=document.getSelection(),(e=(0,i.Z)("span")).textContent=n,e.style.all="unset",e.style.position="fixed",e.style.top="0",e.style.clip="rect(0, 0, 0, 0)",e.style.whiteSpace="pre",e.style.webkitUserSelect="text",e.style.MozUserSelect="text",e.style.msUserSelect="text",e.style.userSelect="text",document.body.appendChild(e),a.selectNodeContents(e),s.addRange(a),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");o=!0}catch(t){try{window.clipboardData.setData("text",n),o=!0}catch(n){console.error(n)}}finally{s&&("function"==typeof s.removeRange?s.removeRange(a):s.removeAllRanges()),e&&document.body.removeChild(e),t()}return o},d=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.onClick=function(n){var a=t.props,s=a.text,e=a.onCopy,c=a.children,p=o.Children.only(c),r=u(s);e&&e(s,r),p&&p.props&&"function"==typeof p.props.onClick&&p.props.onClick(n)},t}return(0,s.ZT)(t,n),t.prototype.render=function(){var n=this.props,t=(n.text,n.onCopy,n.children),a=(0,s._T)(n,["text","onCopy","children"]),e=o.Children.only(t);return(0,o.cloneElement)(e,(0,s.pi)((0,s.pi)({},a),{onClick:this.onClick}))},t}(o.Component),h=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.onCopyCallback=function(n,t){"string"==typeof t?p.Z[n](t):t()},t.onCopy=function(n){return function(a,s){var e=t.props,o=e.onCopySuccess,c=e.onCopyError;s?t.onCopyCallback("success",o||n.success):t.onCopyCallback("error",c||n.error)}},t}return(0,s.ZT)(t,n),t.prototype.render=function(){var n=this,t=this.props,a=t.text,p=t.children,l=t.onClick,i="function"==typeof a?a():a;return(0,e.jsx)(r.Z,(0,s.pi)({componentName:"CopyButton"},{children:function(t){return(0,e.jsx)(d,(0,s.pi)({text:i,onCopy:n.onCopy(t)},{children:p?o.Children.only(p):(0,e.jsx)(c.ZP,(0,s.pi)({onClick:l,type:"primary"},{children:t.copy}),void 0)}),void 0)}}),void 0)},t.defaultProps={onCopySuccess:"",onCopyError:""},t}(o.Component)}}]);