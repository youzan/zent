---
order: 3
zh-CN:
	title: 自定义样式
en-US:
	title: Custom styles
---

```jsx
import { Avatar, Badge } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-avatar-list">
			<Avatar style={{ backgroundColor: '#a1b56c' }}>MJ</Avatar>
			<Avatar style={{ backgroundColor: '#f7ca88' }}>Billie</Avatar>
			<Avatar style={{ backgroundColor: '#ab4642' }}>Jean</Avatar>

			<Badge dot>
				<Avatar style={{ backgroundColor: '#ba8baf' }}>MJ</Avatar>
			</Badge>

			<Badge count={3}>
				<Avatar style={{ backgroundColor: '#7cafc2' }}>Beat</Avatar>
			</Badge>
			<Avatar
				size={48}
				style={{ fontSize: 30, backgroundColor: '#e8e8e8', color: '#dc9656' }}
			>
				IT
			</Avatar>
		</div>
	</div>,
	mountNode
);
```
