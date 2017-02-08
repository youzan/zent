# @youzan/zent-portal

这个组件是绝大部分弹出式组件的实现基础，如`dialog`, `tooltip`, `datetime-picker`等。这个
组件做的事情很简单，就是把它的`child` render到一个给定的DOM node下面，组件被unmount的时候
负责把它的`child`一起清理掉。

任意props被修改后会触发一定程度的重绘，`children`, `selector`被修改会导致unmount再mount；
其它props被修改仅更新现有DOM node的属性。

[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-portal.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-portal.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-portal

# 已知问题

1. 在`Portal`的`children`上使用字符串形式的`ref`会报错，可以使用函数形式的`ref`绕过这个问题。
字符串形式的`ref`会报错是因为`Portal`的`children`没有owner，为什么函数形式的`ref`可以绕过这个问题呢？
看[React的代码](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18)就知道了。
另外官方也不鼓励使用字符串形式的`ref`了。

2. 我们用的15.0.2版本的React有个bug会导致某些情况下依赖`state`的`context`不更新（参考02-context这个例子）。
请升级React到15.2.1以上。

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| children | 必填参数，只支持一个child | string | | |
| selector | 可选参数，渲染child的DOM节点 | string or DOM Element | `'body'` | 合法的CSS selector或者某个DOM节点 |
| visible | 可选参数，是否渲染child | bool | `true` | `true`, `false` |
| className | 可选参数，自定义额外类名 | string | `''` | `''` |
| css | 可选参数，额外的css样式。例如，`{ 'margin-left': '10px' }` | object | `{}` | | |
| prefix | 可选参数，自定义前缀 | string | `'zent'` | | |

## withESCToClose

一个HOC，封装了按ESC关闭的逻辑。

```
import _Portal from '@youzan/zent-portal';
import { withESCToClose } from '@youzan/zent-portal';
const Portal = withESCToClose(_Portal);
```

HOC除了支持上面Portal所有的属性外，还支持另外的参数。

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| visible | 必填参数，注意这个属性原始的Portal是可选的 | bool | `true` | `true`, `false` |
| onClose | 必填参数，ESC按下是的回调函数 | function(): void | | |

## withNonScrollable

封装了禁止container滚动的逻辑。

```
import _Portal from '@youzan/zent-portal';
import { withNonScrollable } from '@youzan/zent-portal';
const Portal = withNonScrollable(_Portal);
```

HOC支持上面Portal所有的属性，另外，visible是必填项。

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| visible | 必填参数，注意这个属性原始的Portal是可选的 | bool | `true` | `true`, `false` |
