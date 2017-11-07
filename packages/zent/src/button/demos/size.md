---
order: 5
zh-CN:
	title: 按钮大小
	normalButton: 正常按钮
	bigButton: 大号按钮
	smallButton: 小号按钮
en-US:
	title: Size of the buttonf
	normalButton: Normal Button
	bigButton: Big Button
	smallButton: Small Button
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button size="large">{i18n.bigButton}</Button>
		<Button>{i18n.normalButton}</Button>
		<Button size="small">{i18n.smallButton}</Button>
	</div>
	, mountNode
);
```
