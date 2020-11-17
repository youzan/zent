---
order: 3
zh-CN:
	title: EventHandler 组件
	msg: 点击页面
en-US:
	title: EventHandler component
	msg: Click on page
---

```jsx
import { EventHandler } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageClick = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
			<EventHandler target={window} eventName="click" listener={onPageClick} />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
