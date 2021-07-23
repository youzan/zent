---
order: 3
zh-CN:
	title: 正在加载的状态
	button1: 实心按钮
	button2: 描边按钮
	button3: 普通按钮
en-US:
	title: Loading
	button1: Filled
	button2: Outline
	button3: Normal
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<div>
			<Button loading type="primary">
				{i18n.button1}
			</Button>
		</div>
		<div style={{ marginTop: 10 }}>
			<Button loading>{i18n.button3}</Button>
		</div>
	</div>,
	mountNode
);
```
