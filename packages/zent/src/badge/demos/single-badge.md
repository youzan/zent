---
order: 2
zh-CN:
	title: 独立徽标，展示在文字右侧
	content: 店铺消息
en-US:
	title: Standalone badge, in the right of text
	content: shop messages
---

```jsx
import { Badge } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-badge-demo-wrapper">
			<span>{i18n.content}</span>
			<Badge count={100}/ >
		</div>
	</div>
	, mountNode
);
```

<style>
.zent-badge-demo-wrapper {
	display: flex;
	align-items: center;
}
</style>
