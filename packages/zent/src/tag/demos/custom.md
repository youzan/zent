---
order: 3
zh-CN:
	title: 支持自定义色彩，非圆角，标签大小
	color: 自定义色彩
	style: 非圆角
	size: 自定义大小
en-US:
	title: Support custom color, rectangle style and custom size
	color: custom color
	style: rectangle
	size: custom size
---

```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag color="#9370db">#9370db</Tag>
		<Tag color="#9370db" outline>#9370db</Tag>
		<Tag borderColor="#87d068" bgColor="#cfefdf" fontColor="#00a854">{i18n.color}</Tag>
		<Tag color="#778899" rounded={false}>{i18n.style}</Tag>
		<Tag color="#48d1cc" style={{ fontSize: 20 }}>{i18n.size}</Tag>
	</div>
	, mountNode
);
```
