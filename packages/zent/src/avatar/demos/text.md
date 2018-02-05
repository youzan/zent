---
order: 2
zh-CN:
	title: 自适应文字大小
en-US:
	title: Fit text automatically
---

```jsx
import { Avatar } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-avatar-list">
			<Avatar>MJ</Avatar>
			<Avatar>Billie</Avatar>
			<Avatar>Jean</Avatar>

			<Avatar shape="square">MJ</Avatar>
			<Avatar shape="square">Beat</Avatar>
			<Avatar shape="square">It</Avatar>
		</div>
	</div>
	, mountNode
);
```
