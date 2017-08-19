## Dialog

Dialog creates a new floating layer over the current page to avoid interrupting the user's workflow.

### Usage guide

-  Command method, call the `openDialog` function directly.

-  Component method, Display/hide the dialog by controlling `visible`.

-  Command method is recommended, it's simpler because you don't need to maintain a `visible` property.

### Code demo

:::demo Basic usage
```jsx
import { Dialog, Button } from 'zent';

class Example extends React.Component {
	state = { visible: false }

	triggerDialog = visible => {
		this.setState({ visible });
	};

	render() {
		let dialog;
		if (this.state.visible) {
			dialog = (
				<Dialog
					visible={this.state.visible}
					onClose={() => this.triggerDialog(false)}
					title="Dialog"
				>
					<p>Dialog content</p>
					<p>Dialog other content</p>
				</Dialog>);
		}

		return (
			<div>
				<Button
					type="primary"
					onClick={() => this.triggerDialog(true)}
				>
					Display
				</Button>
				{dialog}
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo Use `openDialog` to open the Dialog
```jsx
import { Dialog, Button } from 'zent';

const { openDialog, closeDialog } = Dialog;
const id = 'my_dialog';

const open = () => {
	openDialog({
		dialogId: id, // Close the Dialog by dialogId
		title: 'Use `openDialog` to open the Dialog directly',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => closeDialog(id)}>Close</Button>,
		onClose() {
			console.log('outer dialog closed');
		}
	});
};

ReactDOM.render(<Button type="primary" onClick={open}>Open</Button>, mountNode);
```
:::

:::demo `openDialog` supports context
```jsx
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
			title: 'openDialog supports context',
			children: <ContextConsumer />
		})
	}

	render() {
		return <Button type="primary" onClick={this.open}>Display</Button>
	}
}

ReactDOM.render(
	<ContextProvider>
		<Example />
	</ContextProvider>
	, mountNode);
```
:::


### API

| Property     | Description                                              | Type   | Default  |
| ------------ | -------------------------------------------------------- | ------ | -------- |
| title        | Dialog title                                             | node   | `''`     |
| children     | Dialog content: `<Dialog>xxxx</Dialog>`                  | node   | `null`   |
| footer       | Footer content                                           | node   | `null`   |
| visible      | Whether Dialog is visible                                | bool   | `false`  |
| closeBtn     | Whether a close button is visible on top right of Dialog | bool   | `true`   |
| onClose      | Callback when close Dialog                               | func   | `noop`   |
| mask         | Whether to show the mask                                 | bool   | `true`   |
| maskClosable | Whether to close Dialog when clicked mask                | bool   | `true`   |
| className    | The custom class name                                    | string | `''`     |
| prefix       | The custom prefix                                        | string | `'zent'` |
| style        | The custom style                                         | object | `{}`     |


#### openDialog

`openDialog(options: object): function`

**`options` property supports all the propertys except the `visible`, and plus the following parameters:**

| Property        | Description                                                        | Type   | Default                      |
| --------------- | -----------------------------------------------------------------  | ------ | ---------------------------- |
| dialogId        | Optional, Dialog ID, use `closeDialog(dialogId)` to close Dialog   | string | Unique ID generated randomly |
| parentComponent | Optional, A reference to a parent component associates the context | object | `null`                       |

If you need a reference to component instance, you can pass a functional `ref` to `openDialog`, **and `ref` can't be a string.**

> The return value of `openDialog` is a function for closing Dialog, `close(false)` will not trigger Dialog's `onClose` function.**`closeDialog` is recommended to close Dialog**


#### closeDialog

`closeDialog(dialogId: string, options: object): void`

`dialogId` is the parameter of `openDialog` when it's called.

If `options.triggerOnClose` is `true`, `onClose` callback will be triggered when close Dialog, and will not when `false`.


#### Set Dialog width

In `style`, you can set the Dialog width, e.g. `style={{ width: '600px' }}`.

By default, the Dialog width will adapt to the content, while the minimum width and maximum width.

