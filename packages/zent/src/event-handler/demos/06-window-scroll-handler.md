---
order: 5
zh-CN:
	title: WindowScrollHandler 组件
	msg: 请尝试滚动页面
en-US:
	title: WindowScrollHandler component
	msg: Try to scroll on page
---

```jsx
import { WindowScrollHandler } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageScroll = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
			<WindowScrollHandler onScroll={onPageScroll} />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
