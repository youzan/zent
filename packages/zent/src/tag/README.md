## Tag 标签

标签，进行标记和分类的小标签。

### 使用指南

-  用于添加特殊标记或者分类记号。
-  可添加多个标签。
-  标签内字数建议不超过四个字。

### 代码演示

:::demo 基础用法
```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag>标签内容</Tag>
		<Tag><a href="#">链接</a></Tag>
	</div>
	, mountNode
);
```
:::

:::demo 两种风格和五种预定样式：`red`，`green`，`yellow`，`blue`，`darkgreen`
```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag color="red">红色</Tag>
		<Tag color="green">绿色</Tag>
		<Tag color="yellow">黄色</Tag>
		<Tag color="blue">蓝色</Tag>
		<Tag color="darkgreen">深绿</Tag>
		<Tag color="red" outline>红色</Tag>
		<Tag color="green" outline>绿色</Tag>
		<Tag color="yellow" outline>黄色</Tag>
		<Tag color="blue" outline>蓝色</Tag>
		<Tag color="darkgreen" outline>深绿</Tag>
	</div>
	, mountNode
);
```
:::

:::demo 支持自定义色彩
```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag color="#ff1493">#ff1493</Tag>
		<Tag color="#ff1493" outline>#ff1493</Tag>
		<Tag color="#778899">#778899</Tag>
		<Tag color="#778899" outline>#778899</Tag>
		<Tag color="#48d1cc">#48d1cc</Tag>
		<Tag color="#48d1cc" outline>#48d1cc</Tag>
		<Tag color="#9370db">#9370db</Tag>
		<Tag color="#9370db" outline>#9370db</Tag>
	</div>
	, mountNode
);
```
:::

:::demo 关闭标签，支持添加关闭事件
```jsx
import { Tag } from 'zent';

const closeCallback = (e) => {
	console.log(e);
}

const closeCallback2 = (e) => {
	console.log(e.target);
}

ReactDOM.render(
	<div>
		<Tag closable onClose={closeCallback} outline>清新</Tag>
		<Tag closable onClose={closeCallback2}>文艺</Tag>
		<Tag closable>个性</Tag>
	</div>
	, mountNode
);
```
:::

### API

| 参数    |   说明          | 类型     | 默认值        | 备选值            |
| ------- | -------------  | ------  | -------------|----------------- |
| color   | 标签颜色        | string  | `'red'`      | `'red'`, `'green'`, `'yellow'`, `'blue'`, `'darkgreen'` |
| outline | 边框有颜色，无底色| bool    | `'false'`    |`true`,`false`    |
| closable| 是否可以关闭     | bool    | `false`      | `true`,`false`   |
| onClose | 关闭时的回调     | func    | `noop`       |                  |
| className| 自定义额外类名  | string   | `''`         |                  |
| prefix  | 自定义前缀      | string   | `'zent'`     |                  |

