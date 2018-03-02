---
order: 5
zh-CN:
	title: 受控形式
	content: 标签内容
en-US:
	title: Controlled
	content: tag content
---

```jsx
import { Tag, Notify } from 'zent';

class Demo extends React.Component {
	state = {
		visible: true
	};

	onVisibleChange = visible => {
		this.setState({
			visible
		});
	};

	onClose() {
		Notify.success('Tag closed');
	}

	render() {
		return (
			<div>
				<Tag 
					closable 
					visible={this.state.visible} 
					onVisibleChange={this.onVisibleChange}
					onClose={this.onClose}
				>
					{i18n.content}
				</Tag>
			</div>
		)
	}
}

ReactDOM.render(
	<Demo />
	, mountNode
);
```
