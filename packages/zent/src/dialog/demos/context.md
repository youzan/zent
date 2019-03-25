---
order: 3
zh-CN:
	title: openDialog 支持 context
	show: 显示
	title1: openDialog 支持 context
en-US:
	title: openDialog with context
	show: Show
	title1: openDialog support context
---

```js
import { Dialog, Button } from 'zent';

const { openDialog } = Dialog;

const DemoContext = React.createContext({
	shared: 'This is from context',
});

class Example extends React.Component {
	open = () => {
		openDialog({
			parentComponent: this,
			title: '{i18n.title1}',
			children: (
				<DemoContext.Consumer>
					{({ shared }) => <span>{shared}</span>}
				</DemoContext.Consumer>
			),
		});
	};

	render() {
		return (
			<Button type="primary" onClick={this.open}>
				{i18n.show}
			</Button>
		);
	}
}

ReactDOM.render(
	<DemoContext.Provider>
		<Example />
	</DemoContext.Provider>,
	mountNode
);
```
