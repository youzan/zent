---
order: 2
zh-CN:
	title: 标签尺寸
	small: 小标签
	medium: 中标签
	large: 大标签
en-US:
	title: Tag Size
	small: small tag
	medium: medium tag
	large: large tag
---

```jsx
import { Tag } from 'zent';

ReactDOM.render(
	<div>
		<Tag outline>{i18n.small}</Tag>
		<Tag outline size="medium">{i18n.medium}</Tag>
		<Tag outline size="large">{i18n.large}</Tag>
	</div>
	, mountNode
);
```

<style>
.zent-tag{
	margin: 0 10px 5px 0;
}
</style>
