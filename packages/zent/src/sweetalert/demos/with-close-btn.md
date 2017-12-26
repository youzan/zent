---
order: 6
zh-CN:
	title: 带有右上角的关闭按钮
	text1: 这个是具体内容
	button: 带有关闭按钮
en-US:
	title: With close button
	text1: Here comes the main content
	button: With close button
---

```js
import { Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	showAlertInfo = () => {
		Sweetalert.alert({
			closeBtn: true,
			maskClosable: true,
			content: '{i18n.text1}',
			parentComponent: this
		});
	}

	render() {
		return <Button onClick={this.showAlertInfo}>{i18n.button}</Button>;
	}
}

ReactDOM.render(
	<Wrapper />,
	mountNode
);
```
