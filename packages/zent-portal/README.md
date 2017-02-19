<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-portal

[![npm version](https://img.shields.io/npm/v/zent-portal.svg?style=flat)](https://www.npmjs.com/package/zent-portal) [![downloads](https://img.shields.io/npm/dt/zent-portal.svg)](https://www.npmjs.com/package/zent-portal)

基础弹出组件

## 组件原理

-   Portal 组件是绝大部分弹出式组件的实现基础, 如 zent-dialog, zent-tooltip, zent-datetimepicker等.

-   组件的主要功能是把其 `child` 插入到一个给定的 DOM node中, 并且在组件被 `unmount` 的时候将其 `child` 属性对应的 DOM 节点删除.

-   任意 props 被修改后会触发一定程度的重绘, `children`, `selector`被修改会导致组件 `unmount` 再 `mount`；其它props被修改仅更新现有 DOM node 的属性.

## 已知问题

1.  在 Portal 的 `children` 上使用字符串形式的 `ref` 会报错, 可以使用函数形式的 `ref` 绕过这个问题. 其原因是 Portal 的 `children` 没有owner, 使用函数形式的`ref`可以绕过这个问题的原因参见[ Here](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18). 此外官方也不鼓励使用字符串形式的 `ref`.

2.  `15.0.2` 版本的 React 有个 bug 会导致某些情况下依赖 `state` 的 `context` 不更新 (参考02-context这个例子), 请升级 React 到`15.2.1`以上.

## API

| 参数        | 说明                                              | 类型                    | 默认值      | 备选值                      |     |
| --------- | ----------------------------------------------- | --------------------- | -------- | ------------------------ | --- |
| children  | 必填参数, 只支持一个child                                | string                |          |                          |     |
| selector  | 可选参数, 渲染child的DOM节点                             | string or DOM Element | `'body'` | 合法的CSS selector或者某个DOM节点 |     |
| visible   | 可选参数, 是否渲染child                                 | bool                  | `true`   |                          |     |
| className | 可选参数, 自定义额外类名                                   | string                | `''`     |                          |     |
| css       | 可选参数, 额外的css样式. 例如, `{ 'margin-left': '10px' }` | object                | `{}`     |                          |     |
| prefix    | 可选参数, 自定义前缀                                     | string                | `'zent'` |                          |     |

## withESCToClose

一个HOC, 封装了按ESC关闭的逻辑.

```js
import _Portal from 'zent-portal';
import { withESCToClose } from 'zent-portal';
const Portal = withESCToClose(_Portal);
```

HOC除了支持上面Portal所有的属性外, 还支持另外的参数.

| 参数      | 说明                        | 类型   | 默认值    |
| ------- | ------------------------- | ---- | ------ |
| visible | 必填参数, 注意这个属性原始的Portal是可选的 | bool | `true` |
| onClose | 必填参数, ESC按下是的回调函数         | func |        |

## withNonScrollable

封装了禁止container滚动的逻辑.

```js
import _Portal from 'zent-portal';
import { withNonScrollable } from 'zent-portal';
const Portal = withNonScrollable(_Portal);
```

HOC支持上面Portal所有的属性, 另外, visible是必填项.

| 参数      | 说明                        | 类型   | 默认值    |
| ------- | ------------------------- | ---- | ------ |
| visible | 必填参数, 注意这个属性原始的Portal是可选的 | bool | `true` |
