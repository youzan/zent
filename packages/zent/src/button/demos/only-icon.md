---
order: 4
zh-CN:
	title: 图标按钮
	button: 按钮
en-US:
	title: icon
	button: icon Button
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
  <div>
		<Button type='icon' icon='search' size='small'></Button>
		<Button type='icon' icon='search'></Button>
		<Button type='icon' icon='search' size='large'></Button>
		<Button type='icon' icon='search' loading></Button>
		<Button type='icon' icon='search' disabled></Button>
	</div>
	, mountNode
);
```
