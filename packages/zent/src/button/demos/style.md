---
order: 2
zh-CN:
	title: 风格
	button1: 主按钮
	button2: 描边按钮
	button3: 次按钮
en-US:
	title: Style
	button1: Filled
	button2: Outline
	button3: Normal
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<div>
			<Button type="primary">{i18n.button1}</Button>
		</div>
		<div style={{ marginTop: 10 }}>
			<Button>{i18n.button3}</Button>
		</div>
	</div>,
	mountNode
);
```
