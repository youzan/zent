---
order: 1
zh-CN:
	title: 基础用法
	top: 回到顶部
	bottom: 回到底部
en-US:
	title: Basic usage
	top: Goto Top
	bottom: Goto Bottom
---

```jsx
import { smoothScroll, Button } from 'zent';

const MAX_HEIGHT = 500;
const SIZE = 20;

class Test extends React.Component {
	box = React.createRef();

	render() {
		return (
			<div
				ref={this.box}
				style={{
					height: MAX_HEIGHT,
					border: '1px solid #114db4',
					overflowY: 'scroll',
					padding: 16,
				}}
			>
				<div style={{ height: MAX_HEIGHT * 3, position: 'relative' }}>
					<Button
						style={{ position: 'absolute', top: 0, left: 0 }}
						onClick={this.toBottom}
					>
						{i18n.bottom}
					</Button>
					<Button
						style={{ position: 'absolute', bottom: 0, left: 0, margin: 0 }}
						onClick={this.toTop}
					>
						{i18n.top}
					</Button>
				</div>
			</div>
		);
	}

	toTop = evt => {
		smoothScroll(this.box.current, 0, 0);
	};

	toBottom = () => {
		smoothScroll(this.box.current, 0, MAX_HEIGHT * 2);
	};
}

ReactDOM.render(<Test />, mountNode);
```
