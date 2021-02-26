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
import { Button, Pop, Radio, Checkbox, Input } from 'zent';

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
			trigger="hover"
			position="top-center"
			content="{i18n.content}"
		>
			<Input disabled className="zent-pop-disabled-mr" />
		</Pop>
		<Pop
			trigger="hover"
			position="top-center"
			content="{i18n.content}"
			fixTooltipOnDisabledChildren
		>
			<Button type="primary" disabled className="zent-pop-disabled-mr">
				Button
			</Button>
		</Pop>
		<Pop
			trigger="hover"
			position="top-center"
			content="{i18n.content}"
			fixTooltipOnDisabledChildren
		>
			<Button.Directive type="primary" disabled>
				<a href=""> ButtonDirective </a>
			</Button.Directive>
		</Pop>
	</div>,
	mountNode
);
```

<style type="text/css">
	.zent-pop-disabled-mr {
		margin-right:12px;
	}
</style>
