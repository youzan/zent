---
order: 6
zh-CN:
	title: 延迟打开／关闭
	close: 延迟500ms关闭
	open: 延迟500ms打开
en-US:
	title: Delayed open / close
	close: Delay 500ms to close
	open: Delay 500ms to open

---

```jsx
import { Pop, Button } from 'zent';

class Controlled extends Component {
	state = {
		visible: false
	};

	onBeforeShow = (cont) => {
		setTimeout(cont, 500);
	};

	onBeforeClose = () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
	};

	render() {
		return (
			<Pop
				content="{i18n.close}"
				trigger="click"
				onBeforeShow={this.onBeforeShow}
				onBeforeClose={this.onBeforeClose}
			>
				<Button type="primary">{i18n.open}</Button>
			</Pop>
    	);
  }
}

ReactDOM.render(
	<Controlled />
	, mountNode
);
```
