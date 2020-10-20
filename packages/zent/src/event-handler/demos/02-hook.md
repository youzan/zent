---
order: 2
zh-CN:
	title: useEventHandler Hook
	msg: 点击页面
en-US:
	title: useEventHandler Hook
	msg: Click on page
---

```jsx
import { useEventHandler } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageClick = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	useEventHandler(window, 'click', onPageClick);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
