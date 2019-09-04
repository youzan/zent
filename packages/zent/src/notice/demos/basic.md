---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic Usage
---

```jsx
import { Button, Notice } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notice.push('hello')}>Right Top</Button>
		<Button>Right Top</Button>
		<Button>Right Top</Button>
		<Button>Right Top</Button>
	</div>,
	mountNode
);
```
