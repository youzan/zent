---
order: 2
zh-CN:
	title: 两种风格和五种预定样式：`red`，`green`，`yellow`，`blue`，`grey`
	colorRed: 红色
	colorGreen: 绿色
	colorYellow: 黄色
	colorBlue: 蓝色
	colorGrey: 灰色
en-US:
	title: Two styles and five default colors
	colorRed: red
	colorGreen: green
	colorYellow: yellow
	colorBlue: blue
	colorGrey: grey
---

```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag theme="grey">{i18n.colorGrey}</Tag>
		<Tag theme="red">{i18n.colorRed}</Tag>
		<Tag theme="green">{i18n.colorGreen}</Tag>
		<Tag theme="yellow">{i18n.colorYellow}</Tag>
		<Tag theme="blue">{i18n.colorBlue}</Tag>
		<Tag theme="grey" outline>
			{i18n.colorGrey}
		</Tag>
		<Tag theme="red" outline>
			{i18n.colorRed}
		</Tag>
		<Tag theme="green" outline>
			{i18n.colorGreen}
		</Tag>
		<Tag theme="yellow" outline>
			{i18n.colorYellow}
		</Tag>
		<Tag theme="blue" outline>
			{i18n.colorBlue}
		</Tag>
	</div>,
	mountNode
);
```
