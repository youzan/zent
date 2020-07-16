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
import { Pop, Button, Input } from 'zent';

ReactDOM.render(
	<div className="zent-doc-pop-container">
		<Pop trigger="hover" content="{i18n.hoverContent}">
			<Button type="primary">{i18n.hoverText}</Button>
		</Pop>
		<Pop trigger="click" content="{i18n.clickContent}">
			<Button type="primary">{i18n.clickText}</Button>
		</Pop>
		<Pop trigger="focus" content="{i18n.focusContent}">
			<Input defaultValue="{i18n.focusText}" inline />
		</Pop>
	</div>
	, mountNode
)
```

<style>
	.zent-doc-pop-container {
		display: flex;
		align-items: center;

		.zent-input-wrapper {
			margin-left: 10px;
		}
	}
</style>
