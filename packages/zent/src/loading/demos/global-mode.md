---
order: 2
zh-CN:
	title: 全局模式
	open: 全局开启
	close: 全局关闭
en-US:
	title: Global Mode
	open: Global Open
	close: Global Shutdown
---

```js
import { Loading, Button } from 'zent';

const Global = () => {
	return (
		<div>
			<Button onClick={() => { Loading.on() }}>
				{i18n.open}
			</Button>
			<Button
				onClick={() => { Loading.off() }}
				style={{ zIndex: 9999, position: 'relative' }}
			>
				{i18n.close}
			</Button>
		</div>
	);
}

ReactDOM.render(<Global />, mountNode);
```
