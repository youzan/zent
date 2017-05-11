## Button 按钮

按钮, 提供基础样式及基础状态.

### 使用指南

-   通过 `type` 来控制按钮的样式
-   通过 `size` 控制按钮的大小.
-   提供 `'block'`、`'disabled'`、`'loading'` 等修饰状态.
-   传入 `href/target`, Button 将渲染为a标签, 仍然支持以其他属性控制样式及状态.

### 代码演示

:::demo 基础用法
```jsx
import { Button } from 'zent';

ReactDOM.render(
	<Button>按钮</Button>
	, mountNode
);
```
:::

:::demo 风格
```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button type="primary">一级按钮</Button>
		<Button type="primary" outline>二级按钮</Button>
		<Button type="danger">一级按钮</Button>
		<Button type="danger" outline>二级按钮</Button>
		<Button type="success">一级按钮</Button>
		<Button type="success" outline>二级按钮</Button>
		<Button>三级按钮</Button>
	</div>
	, mountNode
);
```
:::

:::demo 正在加载的状态
```jsx
import { Button } from 'zent';

ReactDOM.render(
	<Button loading>Loading</Button>
	, mountNode
);
```
:::

:::demo 不可用的状态
```jsx
import { Button } from 'zent';

ReactDOM.render(
	<Button disabled>不可用的按钮</Button>
	, mountNode
);
```
:::

:::demo 按钮大小
```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button size="large">大号按钮</Button>
		<Button>正常按钮</Button>
		<Button size="small">小号按钮</Button>
	</div>
	, mountNode
);
```
:::

:::demo 无边框按钮，一般在背景色比较深的地方使用
```jsx
import { Button, Alert } from 'zent';

ReactDOM.render(
	<Alert type="warning">
		<Button type="danger" bordered={false}>一级按钮</Button>
	</Alert>
	, mountNode
);
```
:::

:::demo 将按钮变成链接, 只需要提供`href`属性，并可以通过`target`属性控制打开方式
```jsx
import { Button, Alert } from 'zent';

ReactDOM.render(
	<div>
		<Button href="https://youzan.com">有赞首页</Button>
		<Button href="https://youzan.com" target="_blank">新窗口打开</Button>
	</div>
	, mountNode
);
```
:::

### API

| 参数        | 说明                          | 类型     | 默认值         | 备选值                                |
| --------- | --------------------------- | ------ | ----------- | ---------------------------------- |
| type      | 风格                          | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| size      | 尺寸                          | string | `'medium'`  | `'large'`、`'small'`                |
| htmlType  | button标签原生type属性          | string | `'button'`  |  `submit`、`reset`、`button`           |
| block     | 是否以块级元素的形式展开                | bool   | `false`     |                                    |
| disabled  | 状态控制                        | bool   | `false`     |                                    |
| loading   | 状态控制                        | bool   | `false`     |                                    |
| outline   | 边框有颜色，内部没有颜色                | bool   | `false`     |                              |
| bordered  | 边框透明控制                      | bool   | `true`      |                                    |
| 其他参数      |                             |        |             |                                    |
| component | 自定义组件标签类型                   | string\|func |             |                                    |
| href      | 可选，如果设置的话会用a标签而不是button     | string |             |                           |
| target    | 可选，和href一起使用，就是a标签的target属性 | string | `''`        | `'_blank'`                  |
| className | 自定义类名                       | string |             |                                    |
| style     | 自定style                      | object |             |                                    |
| prefix    | 自定义前缀                       | string | `'zent'`    |                                    |
