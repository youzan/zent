---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic Usage
---

```jsx
import { Button, Notice } from 'zent';

const showNotice = (text, position) => () => {
	Notice.push(<Notice title={text} position={position}>{text}</Notice>);
};

ReactDOM.render(
	<div>
		<Button onClick={showNotice('Right Top', 'right-top')}>Right Top</Button>
		<Button onClick={showNotice('Right Bottom', 'right-bottom')}>
			Right Bottom
		</Button>
		<Button onClick={showNotice('Left Top', 'left-top')}>Left Top</Button>
		<Button onClick={showNotice('Left Bottom', 'left-bottom')}>
			Left Bottom
		</Button>
	</div>,
	mountNode
);
```
