---
order: 6
zh-CN:
	title: 自定义偏移量
en-US:
	title: Custom offset
---

```jsx
import { Badge } from 'zent';

ReactDOM.render(
	<div>
		<Badge count={5} offset={[-8, -6]}>
			<div className="zent-badge-demo-square" />
		</Badge>
		<Badge dot offset={[-2, -2]}>
			<div className="zent-badge-demo-square" />
		</Badge>
	</div>,
	mountNode
);
```

<style>
.zent-badge-demo-square {
	width: 40px;
	height: 40px;
	border-radius: 4px;
	background: #eee;
}
</style>
