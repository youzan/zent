---
order: 1
zh-CN:
	title: 链接
	index: 有赞首页
en-US:
	title: Link
	index: Index
---

```jsx
import { Link } from 'zent';

ReactDOM.render(
	<div>
		<Link href="https://youzan.com" target="_blank">{i18n.index}</Link>
		<Link href="https://youzan.com" disabled>
			{i18n.index}
		</Link>
	</div>,
	mountNode
);
```

<style>
  .zent-link {
    margin-left: 10px;
  }
</style>
