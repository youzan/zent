---
order: 1
zh-CN:
	title: 基本使用方式
	click: 点击打开
	msg1: Popover 弹层内容
	msg2: 可以添加任意内容
en-US:
	title: Basic usage
	click: Click to Open
	msg1: Popover content
	msg2: You can add anything here
---

```jsx
import { Popover, Button } from 'zent';

ReactDOM.render(
	<Popover 
		className="zent-doc-popover" 
		position={Popover.Position.BottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Click>
			<Button type="primary">{i18n.click}</Button>
		</Popover.Trigger.Click>
		<Popover.Content>
			<div>{i18n.msg1}</div>
			<div>{i18n.msg2}</div>
		</Popover.Content>
	</Popover>
	, mountNode
);
```
