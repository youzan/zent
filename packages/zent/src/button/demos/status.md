---
order: 7
zh-CN:
	title: 按钮状态
	button1: 主按钮
	button3: 次按钮
	button2: 文字按钮
en-US:
	title: Loading
	button1: Filled
	button3: Normal
	button2: text
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<div>
			<Button type="primary">
				{i18n.button1}
			</Button>
			<Button disabled type="primary">
				{i18n.button1}
			</Button>
			<Button loading type="primary">
				{i18n.button1}
			</Button>
			<Button icon="search" type="primary">
				{i18n.button1}
			</Button>
		</div>
		<div style={{ marginTop: 36 }}>
			<Button>
				{i18n.button3}
			</Button>
			<Button disabled>
				{i18n.button3}
			</Button>
			<Button loading>
				{i18n.button3}
			</Button>
			<Button icon="search">
				{i18n.button3}
			</Button>
		</div>
		<div style={{ marginTop: 36 }}>
			<Button type="text">
				{i18n.button2}
			</Button>
			<Button disabled type="text">
				{i18n.button2}
			</Button>
			<Button loading type="text">
				{i18n.button2}
			</Button>
		</div>
		<div style={{ marginTop: 36 }}>
			<Button type="icon" icon="search" />
			<Button disabled type="icon" icon="search" />
			<Button loading type="icon" icon="search" />
		</div>
	</div>,
	mountNode
);
```
