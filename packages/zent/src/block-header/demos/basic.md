---
order: 1
zh-CN:
	title: 基础用法
	content: 有赞微商城
en-US:
	title: Basic Usage
	content: Youzan wsc
---

```js
import { BlockHeader } from 'zent';

class Simple extends React.Component {
	render() {
		return (
			<div>
				<BlockHeader
					title="{i18n.content}"
					tooltip={<span>test</span>}
					position="top-center"
				/>
				<br />
				<BlockHeader
					className="test-class"
					title="{i18n.content}"
					position="top-center"
					leftContent={
						<a className="zent-link" href="/">
							left content
						</a>
					}
				/>
				<br />
				<BlockHeader
					title="{i18n.content}"
					tooltip={<span>test</span>}
					position="top-center"
					rightContent={
						<a className="zent-link" href="/">
							right content
						</a>
					}
				/>
				<br />
				<BlockHeader
					className="test-class"
					title="{i18n.content}"
					tooltip={<span>test</span>}
					position="top-center"
					leftContent={
						<a className="zent-link" href="/">
							left content
						</a>
					}
					rightContent={
						<a className="zent-link" href="/">
							right content
						</a>
					}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
