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
import PropTypes from 'prop-types';

const { openDialog } = Dialog;

class ContextProvider extends React.Component {
	static childContextTypes = {
		shared: PropTypes.string
	};

	getChildContext() {
		return {
			shared: 'This is from context'
		};
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}

class ContextConsumer extends React.Component {
	static contextTypes = {
		shared: PropTypes.string
	};

	render() {
		return <span>{this.context.shared}</span>;
	}
}

class Example extends React.Component {
	open = () => {
		openDialog({
			parentComponent: this,
			title: '{i18n.title1}',
			children: <ContextConsumer />
		})
	}

	render() {
		return <Button type="primary" onClick={this.open}>{i18n.show}</Button>
	}
}

ReactDOM.render(
	<ContextProvider>
		<Example />
	</ContextProvider>
	, mountNode
);
```
