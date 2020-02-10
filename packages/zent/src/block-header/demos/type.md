---
order: 2
zh-CN:
	title: 风格
	ribbonContent: ribbon (默认)
	minimumContent: minimum
en-US:
	title: type
	ribbonContent: ribbon (default)
	minimumContent: minimum
---

```js
import { BlockHeader } from 'zent';

class Type extends React.Component {
	render() {
		return (
			<div>
				<BlockHeader title="{i18n.ribbonContent}" />
				<br />
				<BlockHeader
					type="minimum"
					title="{i18n.minimumContent}"
				/>
			</div>
		);
	}
}

ReactDOM.render(<Type />, mountNode);
```
