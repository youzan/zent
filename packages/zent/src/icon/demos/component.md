---
order: 1
zh-CN:
	title: React组件方式使用
en-US:
	title: Used as a React component
---

```jsx
import { Icon } from 'zent';

ReactDOM.render(
	<Icon type="youzan" className="zenticon-demo" />
	, mountNode
);
```

<style>
	.zenticon-demo {
		font-size: 40px;
	}

	.zenticon-youzan.zenticon-demo {
		color: #EB0B19;
	}
</style>
