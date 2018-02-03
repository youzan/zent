---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Badge, Icon } from 'zent';

ReactDOM.render(
	<Badge count={5}>
		<Icon type="bell-o" className="demo-cont"/>
	</Badge>
	, mountNode
);
```

<style>
.zent-badge .demo-cont {
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	background: #38f;
	color: #fff;
	font-size: 20px;
}
.zent-badge {
	margin-right: 30px;
}
</style>
