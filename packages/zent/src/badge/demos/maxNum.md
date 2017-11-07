---
order: 2
zh-CN:
	title: 设置最大显示信息数
en-US:
	title: Set the max number to show
---

```jsx
import { Badge,Icon } from 'zent';

ReactDOM.render(
	<div>
		<Badge count={99}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={120}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={120} maxCount={10}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={1200} maxCount={999}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
	</div>
	, mountNode
);
```
