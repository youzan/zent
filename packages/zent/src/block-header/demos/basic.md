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
					content={<a href="/">content</a>}
					position="top-center"
				/>
				<br />
				<BlockHeader
					className="test-class"
					title="{i18n.content}"
					position="top-center"
				>
					<a href="/">children</a>
				</BlockHeader>
				<br />
				<BlockHeader
					title="{i18n.content}"
					tooltip={
						<div>
							<p>test1</p>
							<p>test2</p>
						</div>
					}
					content={<a href="/">content</a>}
					position="top-center"
					childAlign="right"
				/>
				<br />
				<BlockHeader
					className="test-class"
					title="{i18n.content}"
					tooltip={<span>test</span>}
					position="top-center"
					childAlign="right"
				>
					<a href="/">children</a>
				</BlockHeader>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
