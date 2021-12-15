---
order: 9
zh-CN:
	title: 提供了三种默认的提示类型
	content: 通知提示文案
	link: 文字链接
	button: 按钮
en-US:
	title: Three default prompt types are provided
	content: Info Alert Text
	link: Text Link
	button: Button
---

```jsx
import { Prompt } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Prompt 
			type="warning" 
			extraContent={<Button type="primary">{i18n.button}</Button>}
		>
			<span>{i18n.content}</span>
			<a href="javascript:;" className="zent-alert-demo-text">
				{i18n.link}
			</a>
		</Prompt>
		<Prompt 
			type="strongHint" 
			description="{i18n.content}" 
			extraContent={<Button>{i18n.button}</Button>} 
		/>
		<Prompt 
			type="weakHint" 
			description="{i18n.content}" 
			extraContent={<Button>{i18n.button}</Button>} 
		/>
	</div>,
	mountNode
);
```

<style>
.zent-alert-demo-text {
	margin-left: 8px;
}
</style>
