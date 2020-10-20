---
order: 1
zh-CN:
	title: addEventListener 函数
	msg: 点击页面
en-US:
	title: addEventListener function
	msg: Click on page
---

```jsx
import { addEventListener } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageClick = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	React.useLayoutEffect(() => {
		return addEventListener(window, 'click', onPageClick);
	}, [onPageClick]);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
