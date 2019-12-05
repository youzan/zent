---
order: 1
zh-CN:
	title: "三种触发方式: 点击，鼠标移入，获得输入焦点"
	hoverContent: 鼠标移入触发方式
	hoverText: 移入鼠标
	clickContent: 鼠标点击触发方式
	clickText: 点击鼠标
	focusContent: 获得输入焦点触发方式
	focusText: 点击获取焦点
en-US:
	title: "Three trigger modes: click, hover and focus"
	hoverContent: Hover Trigger
	hoverText: Hover
	clickContent: Click Trigger
	clickText: Click
	focusContent: Focus Trigger
	focusText: Focus
---

```jsx
import { Tooltip, Button, Input } from 'zent';

ReactDOM.render(
	<div className="zent-doc-tooltip-container">
		<Tooltip trigger="hover" title="{i18n.hoverContent}">
			<Button type="primary">{i18n.hoverText}</Button>
		</Tooltip>
		<Tooltip trigger="click" title="{i18n.clickContent}">
			<Button type="primary">{i18n.clickText}</Button>
		</Tooltip>
		<Tooltip trigger="focus" title="{i18n.focusContent}">
			<Input defaultValue="{i18n.focusText}" />
		</Tooltip>
	</div>
	, mountNode
)
```

<style>
	.zent-doc-tooltip-container {
	    display: flex;
        justify-content: center;
		.zent-tooltip-wrapper {
			margin-right: 10px;
		}

		.zent-doc-tooltip-tag {
			border: 1px solid #e5e5e5;
			border-radius: 20%;
			padding: 3px;
			font-size: 12px;
			cursor: default;
		}
	}
</style>
