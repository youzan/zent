---
order: 6
zh-CN:
	title: 按钮大小
	normalButton: 正常按钮
	bigButton: 大号按钮
	smallButton: 小号按钮
  textButton: 文字按钮
en-US:
	title: Button sizes
	normalButton: Normal
	bigButton: Big
	smallButton: Small
	textButton: text
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button size="large">{i18n.bigButton}</Button>
		<Button>{i18n.normalButton}</Button>
		<Button size="small">{i18n.smallButton}</Button>
		<Button type="icon" icon="search" size="large"></Button>
		<Button type="icon" icon="search"></Button>
		<Button type="icon" icon="search" size="small"></Button>
		<Button type="text">{i18n.textButton}</Button>
	</div>
	, mountNode
);
```
