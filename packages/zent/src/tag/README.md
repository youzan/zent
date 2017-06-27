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

:::demo 支持自定义色彩，非圆角，标签大小
```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag color="#9370db">#9370db</Tag>
		<Tag color="#9370db" outline>#9370db</Tag>
		<Tag borderColor="#87d068" bgColor="#cfefdf" fontColor="#00a854">自定义色彩</Tag>
		<Tag color="#778899" rounded={false}>非圆角</Tag>
		<Tag color="#48d1cc" style={{ fontSize: 20 }}>自定义大小</Tag>
	</div>
	, mountNode
);
```
:::

:::demo 关闭标签，支持添加关闭事件
```jsx
import { Tag } from 'zent';

const closeCallback = (e) => {
	alert("cloase tag")
}

const closeCallback2 = (e) => {
	alert("cloase tag2")
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
| color   | 标签颜色        | string  | `'red'`      | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'darkgreen'` |
| outline | 边框有颜色，无底色| bool    | `'false'`    |`true` \| `false`    |
| rounded | 是否有圆角 | bool | `true` | `true` \| `false` |
| closable| 是否可以关闭     | bool    | `false`      | `true` \| `false`   |
| onClose | 关闭时的回调     | func    | `noop`       |                  |
| borderColor | 边框颜色 | string | | |
| bgColor | 背景颜色 | string | | |
| fontColor | 文字颜色 | string | | |
| className| 自定义额外类名  | string   | `''`         |                  |
| prefix  | 自定义前缀      | string   | `'zent'`     |                  |


<style>
.zent-tag{
	margin: 0 10px 5px 0; 
}
</style>
