(self.webpackChunkzent_docs=self.webpackChunkzent_docs||[]).push([[1846],{31846:(e,t,n)=>{"use strict";n.d(t,{D:()=>m,Z:()=>h});var o=n(59312),r=n(24246),i=n(60042),u=n.n(i),l=n(27378),s=n(86446),a=n(36831),c=n(79352),p=n(17127),f=window.ResizeObserver,v=n(14322),d=n(27468),m=(0,l.forwardRef)((function(e,t){var n=e.className,i=e.placeholderClassName,m=e.children,h=e.offsetTop,w=e.offsetBottom,b=e.getAffixContainer,y=e.zIndex,T=void 0===y?10:y,g=e.onPin,B=e.onUnpin,z=(0,l.useState)(1),x=z[0],C=z[1],S=(0,l.useState)(),P=S[0],E=S[1],k=(0,l.useState)(),O=k[0],R=k[1],N=(0,l.useRef)((0,l.createRef)()),A=(0,a.W)(g),Z=(0,a.W)(B),L="number"==typeof h,j="number"==typeof w,W=(0,l.useState)(null),M=W[0],F=W[1],U=(0,l.useState)(0),D=U[0],H=U[1],I=(0,l.useState)(0),V=I[0],$=I[1],X=(0,l.useState)(0),Y=X[0],_=X[1],q=(0,l.useCallback)((function(e){var t=e.getBoundingClientRect();L&&H(t.top),j&&$(t.bottom)}),[L,j]),G=function(e){var t=(0,l.useRef)(null),n=(0,l.useCallback)((function(){return f&&new f((0,p.$j)(e))}),[e]);(0,l.useEffect)((function(){t.current=n()}),[n]);var o=(0,l.useCallback)((function(e,n){var o;e&&(null===(o=t.current)||void 0===o||o.observe(e,n))}),[t]),r=(0,l.useCallback)((function(e){var n;null===(n=t.current)||void 0===n||n.unobserve(e)}),[t]),i=(0,l.useCallback)((function(){var e;null===(e=t.current)||void 0===e||e.disconnect()}),[t]);return{observer:t,observe:o,unobserve:r,disconnect:i}}((0,l.useCallback)((function(e){var t=e[0],n=t.borderBoxSize,o=t.contentRect;if(n&&n.length>0){var r=n[0],i=r.inlineSize,u=r.blockSize;E(i),R(u)}else{var l=o.width,s=o.height;E(l),R(s)}}),[])),J=G.observe,K=G.disconnect,Q=(0,l.useCallback)((function(e){return function(t){var n,o,r=t.currentPosition;if(r===e){var i=null===(n=N.current)||void 0===n?void 0:n.current;i&&(E(i.offsetWidth),R(i.offsetHeight)),J(i),C(r),null===(o=A.current)||void 0===o||o.call(A)}}}),[A,J]),ee=(0,l.useCallback)((function(e){return function(t){var n,o=t.currentPosition;t.previousPosition===e&&(E(void 0),R(void 0),K(),C(o),null===(n=Z.current)||void 0===n||n.call(Z))}}),[Z,K]),te=(0,l.useMemo)((function(){return[Q(0),ee(0)]}),[Q,ee]),ne=te[0],oe=te[1],re=(0,l.useMemo)((function(){return[Q(2),ee(2)]}),[Q,ee]),ie=re[0],ue=re[1],le=(0,l.useMemo)((function(){return 1===x?{}:{height:O}}),[O,x]),se=(0,l.useMemo)((function(){if(0===x||2===x){var e={position:"fixed",zIndex:T,width:P};return M?0===x?e.top=h+D:e.bottom=w+(Y-V):0===x?e.top=h:e.bottom=w,e}return{position:"static"}}),[M,w,h,D,V,Y,x,P,T]),ae=(0,l.useCallback)((function(){M&&q(M)}),[M,q]);(0,l.useEffect)((function(){var e=null==b?void 0:b();e&&(F(e),q(e),_((0,d.mP)()))}),[b,q]);var ce=(0,l.useCallback)((function(){_((0,d.mP)())}),[]);(0,l.useImperativeHandle)(t,(function(){return{updatePosition:ae}}));var pe=(0,l.useMemo)((function(){return null!=M?M:c.Z?window:void 0}),[M]);return(0,r.jsxs)(r.Fragment,{children:[L&&(0,r.jsx)(s.h,{scrollableAncestor:pe,onEnter:oe,onLeave:ne,topOffset:h},void 0),(0,r.jsx)("div",(0,o.pi)({className:u()("zent-affix-placeholder",i),style:le,ref:N.current,"data-zv":"10.0.10"},{children:(0,r.jsx)("div",(0,o.pi)({className:u()("zent-affix",n),style:se,"data-zv":"10.0.10"},{children:m}),void 0)}),void 0),j&&(0,r.jsx)(s.h,{scrollableAncestor:pe,onEnter:ue,onLeave:ie,bottomOffset:w},void 0),M&&(0,r.jsx)(v.w,{onResize:ce,disableThrottle:!0},void 0)]},void 0)}));m.displayName="ZentAffix";var h=m},14322:(e,t,n)=>{"use strict";n.d(t,{w:()=>a});var o=n(24246),r=n(27378),i=n(27468),u=n(80186),l=n(17127),s={passive:!0},a=function(e){var t=e.disableThrottle,n=void 0!==t&&t,a=e.onResize,c=(0,r.useRef)(null),p=(0,r.useRef)(a);p.current=a;var f=(0,r.useCallback)((function(e){var t=(0,i.ZP)();c.current||(c.current=t);var n=c.current,o={deltaX:t.width-n.width,deltaY:t.height-n.height};0===o.deltaX&&0===o.deltaY||(p.current(e,o),c.current=t)}),[]),v=(0,l.BN)(f,n);return(0,r.useEffect)((function(){return c.current=(0,i.ZP)(),v.cancel}),[v]),(0,o.jsx)(u.ZP,{eventName:"resize",listener:v,options:s},void 0)}},55978:(e,t,n)=>{"use strict";function o(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var o=setTimeout((function(){return e.apply(void 0,t)}),1);return{cancel:function(){clearTimeout(o)}}}n.d(t,{Z:()=>o})},36831:(e,t,n)=>{"use strict";n.d(t,{W:()=>r});var o=n(27378);function r(e){var t=(0,o.useRef)(e);return t.current=e,t}},86446:(e,t,n)=>{"use strict";n.d(t,{h:()=>w});var o=n(59312),r=n(24246),i=n(27378),u=n(49744),l=n(19185);function s(e){return(0,l.isElement)(e)&&"string"==typeof e.type}function a(e){return e.viewportBottom-e.viewportTop==0?3:e.viewportTop<=e.waypointTop&&e.waypointTop<=e.viewportBottom||e.viewportTop<=e.waypointBottom&&e.waypointBottom<=e.viewportBottom||e.waypointTop<=e.viewportTop&&e.viewportBottom<=e.waypointBottom?1:e.viewportBottom<e.waypointTop?2:e.waypointTop<e.viewportTop?0:3}var c=n(79352),p=n(55978);function f(e){return m(e.toLowerCase())}function v(e,t,n){var o=m(e=e.toLowerCase());return null!==o?o:function(e,t,n){var o=h.exec(e);if(o){var r=parseFloat(o[1]);switch(o[2]){case"em":return null!==(i=t())?i*r:null;case"rem":var i;return null!==(i=n())?i*r:null;default:return null}}return null}(e,t,n)}var d=/(^-?\d*\.?\d+)(cm|mm|in|px|pt|pc)$/;function m(e){var t=d.exec(e);if(t){var n=parseFloat(t[1]);switch(t[2]){case"cm":return 9600*n/254;case"mm":return 960*n/254;case"in":return 96*n;case"pt":return 4*n/3;case"pc":return 16*n;case"px":return n;default:return null}}return null}var h=/(^-?\d*\.?\d+)(em|rem)$/,w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.refElement=(0,i.createRef)(),t.previousPosition=4,t.handleScroll=function(e){if(t.refElement.current){var n=t.getBounds(),o=a(n),r=t.previousPosition,i=t.props,u=i.onPositionChange,l=i.onEnter,s=i.onLeave,c=i.fireOnRapidScroll;if(t.previousPosition=o,r!==o){var p={currentPosition:o,previousPosition:r,event:e,waypointTop:n.waypointTop,waypointBottom:n.waypointBottom,viewportTop:n.viewportTop,viewportBottom:n.viewportBottom};null==u||u(p),1===o?null==l||l(p):1!==r&&4!==r||null==s||s(p),c&&(2===r&&0===o||0===r&&2===o)&&(null==l||l({currentPosition:1,previousPosition:r,event:e,waypointTop:n.waypointTop,waypointBottom:n.waypointBottom,viewportTop:n.viewportTop,viewportBottom:n.viewportBottom}),null==s||s({currentPosition:o,previousPosition:1,event:e,waypointTop:n.waypointTop,waypointBottom:n.waypointBottom,viewportTop:n.viewportTop,viewportBottom:n.viewportBottom}))}}},t}return(0,o.ZT)(t,e),t.prototype.componentDidMount=function(){var e=this;c.Z&&(this.cancelOnNextTick=(0,p.Z)((function(){e.cancelOnNextTick=null,function(e,t){if(e&&!s(e)&&!t)throw new Error("<Waypoint> needs a DOM element to compute boundaries. The child you passed is neither a DOM element (e.g. <div>) nor does it use the innerRef prop.\n")}(e.props.children,e.refElement.current),e.scrollableAncestor=e.findScrollableAncestor(),e.scrollEventListenerUnsubscribe=(0,u.Oo)(e.scrollableAncestor,"scroll",e.handleScroll,{passive:!0}),e.resizeEventListenerUnsubscribe=(0,u.Oo)(window,"resize",e.handleScroll,{passive:!0}),e.handleScroll(null)})))},t.prototype.componentDidUpdate=function(){var e=this;c.Z&&this.scrollableAncestor&&(this.cancelOnNextTick||(this.cancelOnNextTick=(0,p.Z)((function(){e.cancelOnNextTick=null,e.handleScroll(null)}))))},t.prototype.componentWillUnmount=function(){var e,t,n;c.Z&&(null===(e=this.scrollEventListenerUnsubscribe)||void 0===e||e.call(this),null===(t=this.resizeEventListenerUnsubscribe)||void 0===t||t.call(this),null===(n=this.cancelOnNextTick)||void 0===n||n.cancel())},t.prototype.findScrollableAncestor=function(){var e=this.props,t=e.horizontal,n=e.scrollableAncestor;if(n)return n;for(var o=this.refElement.current;o.parentNode;){if((o=o.parentNode)===document.body)return window;var r=getComputedStyle(o),i=(t?r.getPropertyValue("overflow-x"):r.getPropertyValue("overflow-y"))||r.getPropertyValue("overflow");if("auto"===i||"scroll"===i)return o}return window},t.prototype.getBounds=function(){var e,t,n=this.props.horizontal,o=this.refElement.current.getBoundingClientRect(),r=o.left,i=o.top,u=o.right,l=o.bottom,s=n?r:i,a=n?u:l;if(this.scrollableAncestor===window)e=n?window.innerWidth:window.innerHeight,t=0;else{var c=this.scrollableAncestor.getBoundingClientRect();e=n?c.width:c.height,t=n?c.left:c.top}return{waypointTop:s,waypointBottom:a,viewportTop:t+this.getOffset("top",e),viewportBottom:t+e-this.getOffset("bottom",e)}},t.prototype.getOffset=function(e,t){var n,o,r=this.props.horizontal,i=e+"Offset",u="top"===e?"border"+(r?"Left":"Top")+"Width":"border"+(r?"Right":"Bottom")+"Width",l=this.props[i];if("auto"!==l)return function(e,t){var n=function(e){var t;if(t="number"==typeof e?e:parseFloat(e),!Number.isNaN(t)&&Number.isFinite(t))return t}(e);if("number"==typeof n)return n;if("string"==typeof e){var o=function(e){if("%"===e.slice(-1))return parseFloat(e.slice(0,-1))/100}(e);if("number"==typeof o)return o*t}}(l,t);if(this.scrollableAncestor===window){var s=getComputedStyle(document.documentElement),a=function(){return f(s.fontSize)};return null!==(n=v(s[u],a,a))&&void 0!==n?n:0}var c=getComputedStyle(this.scrollableAncestor);return a=function(){return f(c.fontSize)},null!==(o=v(c[u],a,(function(){return f(getComputedStyle(document.documentElement).fontSize)})))&&void 0!==o?o:0},t.prototype.render=function(){var e=this,t=this.props.children;if(!t)return(0,r.jsx)("span",{ref:this.refElement,style:{fontSize:0},className:"zent-waypoint-marker","data-zv":"10.0.10"},void 0);var n=i.Children.only(t);return s(n)||(0,l.isForwardRef)(n)?(0,i.cloneElement)(n,{ref:function(t){e.refElement.current=t;var o=n.ref;o&&("function"==typeof o?o(t):o.current=t)}}):(0,i.cloneElement)(n,{innerRef:this.refElement})},t.defaultProps={topOffset:0,bottomOffset:0,horizontal:!1,fireOnRapidScroll:!0},t}(i.PureComponent)}}]);