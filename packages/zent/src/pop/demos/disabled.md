---
order: 9
zh-CN:
	title: 禁用表单元素
	content: 内容
en-US:
	title: Disabled form inputs
	content: content
---

```jsx
import { Pop, Radio, Checkbox, Input } from 'zent';

ReactDOM.render(
	<div className="zent-doc-pop-container">
		<Pop
			centerArrow
			trigger="hover"
			position="top-left"
			content="{i18n.content}"
		>
			<Radio disabled></Radio>
		</Pop>
		<Pop
			centerArrow
			trigger="hover"
			position="top-left"
			content="{i18n.content}"
		>
			<Checkbox disabled></Checkbox>
		</Pop>
		<Pop
			centerArrow
			trigger="hover"
			position="top-left"
			content="{i18n.content}"
		>
			<Input disabled />
		</Pop>
	</div>,
	mountNode
);
```
