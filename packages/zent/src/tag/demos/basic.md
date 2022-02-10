---
order: 1
zh-CN:
	title: 基础用法
	content: 标签内容
	link: 链接
en-US:
	title: Basic usage
	content: tag content
	link: link
---

```jsx
import { Tag, LinkTag } from 'zent';

ReactDOM.render(
	<div>
		<Tag outline>{i18n.content}</Tag>
		<LinkTag><a href="#">{i18n.link}</a></LinkTag>
	</div>
	, mountNode
);
```

<style>
.zent-tag{
	margin: 0 10px 5px 0;
}
</style>
