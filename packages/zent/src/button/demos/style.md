---
order: 2
zh-CN:
	title: 按钮类型
	button1: 主按钮
	button2: 文字按钮
	button3: 次按钮
  button4: 图标按钮
en-US:
	title: Style
	button1: Filled
	button2: text
	button3: Normal
	button4: icon
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<div>
			<Button type="primary">{i18n.button1}</Button>
			<Button>{i18n.button3}</Button>
			<Button type="text">{i18n.button2}</Button>
			<Button type='icon' icon='search'></Button>
		</div>
	</div>,
	mountNode
);
```
