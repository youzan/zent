---
order: 2
zh-CN:
	title: 两种风格和六种预定样式：`red`，`green`，`yellow`，`blue`，`darkgreen`，`grey`
	colorRed: 红色
	colorGreen: 绿色
	colorYellow: 黄色
	colorBlue: 蓝色
	colorDarkgreen: 深绿
	colorGrey: 灰色
en-US:
	title: Two styles and five default colors
	colorRed: red
	colorGreen: green
	colorYellow: yellow
	colorBlue: blue
	colorDarkgreen: darkgreen
	colorGrey: grey
---

```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag color="grey">{i18n.colorGrey}</Tag>
		<Tag color="red">{i18n.colorRed}</Tag>
		<Tag color="green">{i18n.colorGreen}</Tag>
		<Tag color="yellow">{i18n.colorYellow}</Tag>
		<Tag color="blue">{i18n.colorBlue}</Tag>
		<Tag color="darkgreen">{i18n.colorDarkgreen}</Tag>
		<Tag color="grey" outline>{i18n.colorGrey}</Tag>
		<Tag color="red" outline>{i18n.colorRed}</Tag>
		<Tag color="green" outline>{i18n.colorGreen}</Tag>
		<Tag color="yellow" outline>{i18n.colorYellow}</Tag>
		<Tag color="blue" outline>{i18n.colorBlue}</Tag>
		<Tag color="darkgreen" outline>{i18n.colorDarkgreen}</Tag>
	</div>
	, mountNode
);
```
