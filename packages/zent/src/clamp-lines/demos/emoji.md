---
order: 8
zh-CN:
	title: Emoji
en-US:
	title: Emoji
---

```jsx
import { ClampLines } from 'zent';

class Demo extends React.Component {
	render() {
		return (
			<div
				style={{
					width: 180,
					border: '1px solid #dcdee0 ',
				}}
			>
				<ClampLines text="🇨🇳🇺🇸🇯🇵🇬🇧🇩🇪🇫🇷🇮🇹🇮🇸🍎😄💰✈️🚢🚀🐛🐼🐧" lines={1} />
			</div>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
