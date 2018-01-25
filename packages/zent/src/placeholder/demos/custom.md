---
order: 5
zh-CN:
	title: 自定义占位块
en-US:
	title: Custom placeholder
---

```js
import { Placeholder } from 'zent';

ReactDOM.render(
	<div style={{ display: 'flex', alignItems: 'center' }}>
		<Placeholder.Circle diameter={160} />
		<Placeholder.TextBlock rows={6} style={{ margin: '0 10px' }} />
		<Placeholder.Rectangle width={160} height={160} />
	</div>
	, mountNode
);
```
