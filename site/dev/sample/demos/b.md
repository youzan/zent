---
order: 1
zh-CN: 中文标题B
en-US: Title in English B
---

```js
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button type="primary">一级按钮</Button>
		<Button type="primary" outline>二级按钮</Button>
		<Button type="danger">一级按钮</Button>
		<Button type="danger" outline>二级按钮</Button>
		<Button type="success">一级按钮</Button>
		<Button type="success" outline>二级按钮</Button>
		<Button>三级按钮</Button>
	</div>
	, mountNode //eslint-disable-line
);
```
