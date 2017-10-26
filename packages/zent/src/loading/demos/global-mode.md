---
order: 2
zh-CN: 全局模式
en-US: Global Mode
---

```js
import { Loading, Button } from 'zent';

const Global = () => {
	return (
		<div>
			<Button onClick={() => { Loading.on() }}>
				全局开启
			</Button>
			<Button
				onClick={() => { Loading.off() }}
				style={{ zIndex: 9999, position: 'relative' }}
			>
				全局关闭
			</Button>
		</div>
	);
}

ReactDOM.render(<Global />, mountNode);
```
