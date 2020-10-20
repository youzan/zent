---
order: 4
zh-CN:
	title: WindowEventHandler 组件
	msg: 点击页面
en-US:
	title: WindowEventHandler component
	msg: Click on page
---

```jsx
import { WindowEventHandler } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageClick = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
			<WindowEventHandler eventName="click" listener={onPageClick} />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
