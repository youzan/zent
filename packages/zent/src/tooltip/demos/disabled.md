---
order: 5
zh-CN:
	title: 禁用元素
	content: 内容

en-US:
	title: Disabled elements
	content: Content
---

```jsx
import { Button, Input, Radio, Tooltip } from 'zent';

ReactDOM.render(
	<div className="zent-doc-tooltip-container">
		<Tooltip
			trigger="hover"
			title="{i18n.content}"
			fixMouseEventsOnDisabledChildren
		>
			<Button type="primary" disabled>
				Button
			</Button>
		</Tooltip>
		<Tooltip trigger="hover" title="{i18n.content}">
			<Input disabled />
		</Tooltip>
		<Tooltip trigger="hover" title="{i18n.content}">
			<Radio disabled style={{ marginLeft: '12px' }} />
		</Tooltip>
		<Tooltip
			trigger="hover"
			title="{i18n.content}"
			fixMouseEventsOnDisabledChildren
		>
			<Button.Directive type="primary" disabled>
				<a href=""> ButtonDirective </a>
			</Button.Directive>
		</Tooltip>
	</div>,
	mountNode
);
```
