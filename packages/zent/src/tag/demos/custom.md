---
order: 3
zh-CN:
	title: 支持自定义色彩，非圆角，标签大小
	color: 自定义色彩
	style: 非圆角
	size: 大标签
en-US:
	title: Support custom color, rectangle style and custom size
	color: custom color
	style: rectangle
	size: Large size
---

```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag
			style={{
				borderColor: '#9370db',
				backgroundColor: '#9370db',
			}}
		>
			#9370db
		</Tag>
		<Tag
			style={{
				borderColor: '#9370db',
				color: '#9370db',
			}}
			outline
		>
			#9370db
		</Tag>
		<Tag
			style={{
				borderColor: '#87d068',
				backgroundColor: '#cfefdf',
				color: '#00a854',
			}}
		>
			{i18n.color}
		</Tag>
		<Tag
			style={{
				borderColor: '#778899',
				backgroundColor: '#778899',
			}}
			rounded={false}
		>
			{i18n.style}
		</Tag>
		<Tag
			style={{
				borderColor: '#48d1cc',
				backgroundColor: '#48d1cc',
				fontSize: 14,
			}}
		>
			{i18n.size}
		</Tag>
	</div>,
	mountNode
);
```
