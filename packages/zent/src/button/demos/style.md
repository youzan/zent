---
order: 2
zh-CN:
	title: 风格
	secondary: 次级按钮
	button1: 实心按钮
	button2: 描边按钮
	button3: 普通按钮
en-US:
	title: Style
	secondary: Secondary
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
			<Button type="secondary">{i18n.secondary}</Button>
			<Button type="danger">{i18n.button1}</Button>
			<Button type="success">{i18n.button1}</Button>
		</div>
		<div style={{ marginTop: 10 }}>
			<Button type="primary" outline>
				{i18n.button2}
			</Button>
			<Button type="danger" outline>
				{i18n.button2}
			</Button>
			<Button type="success" outline>
				{i18n.button2}
			</Button>
			<Button>{i18n.button3}</Button>
		</div>
	</div>,
	mountNode
);
```
