## Dialog 对话框

对话框，通过打开一个浮层的方式，避免打扰用户的操作流程。

### 使用指南

-  命令式, 直接调用 `openDialog` 函数。

-  组件式, 通过控制 `visible` 来显示／隐藏对话框。

-  推荐使用命令式, 不需要在外部维护一个 `visible` 属性, 更加方便。

### 代码演示

:::demo 基础用法
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
					title="对话框"
				>
					<p>对话框内容</p>
					<p>对话框其他内容</p>
				</Dialog>);
		}

		return (
			<div>
				<Button
					type="primary"
					onClick={() => this.triggerDialog(true)}
				>
					显示
				</Button>
				{dialog}
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo 使用 openDialog 开启对话框
```jsx
import { Dialog, Button } from 'zent';

const { openDialog, closeDialog } = Dialog;
const id = 'my_dialog';

const open = () => {
	openDialog({
		dialogId: id, // 可以通过这个id关闭对话框
		title: '使用openDialog直接打开对话框',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => closeDialog(id)}>关闭</Button>,
		onClose() {
			console.log('outer dialog closed');
		}
	});
};

ReactDOM.render(<Button type="primary" onClick={open}>打开</Button>, mountNode);
```
:::

:::demo openDialog 支持 context
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
			title: 'openDialog 支持 context',
			children: <ContextConsumer />
		})
	}

	render() {
		return <Button type="primary" onClick={this.open}>显示</Button>
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

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| title        | 自定义弹框标题                       | node   | `''`     |
| children     | 弹框内容: `<Dialog>xxxx</Dialog>` | node   | `null`   |
| footer       | 底部内容                          | node   | `null`   |
| visible      | 是否打开对话框                       | bool   | `false`  |
| closeBtn     | 是否显示右上角关闭按钮                   | bool   | `true`   |
| onClose      | 关闭操作回调函数                      | func   | `noop`   |
| mask         | 是否显示遮罩                        | bool   | `true`   |
| maskClosable | 点击遮罩是否可以关闭                    | bool   | `true`   |
| className    | 自定义额外类名                       | string | `''`     |
| prefix       | 自定义前缀                         | string | `'zent'` |
| style        | 自定义样式                         | object | `{}`     |


#### openDialog

`openDialog(options: object): function`

**`options` 参数支持组件除 `visible` 以外的所有属性，外加以下参数：**

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| dialogId   | 可选，对话框的 ID，可以通过 `closeDialog(dialogId)` 来关闭对话框  | string | 随机生成的唯一ID  |
| parentComponent |  可选，父组件的引用, 用于关联 context   | object  | `null`     |

如果需要组件实例的引用, 可以传一个函数形式的 `ref` 给 `openDialog`, **不支持字符串形式的 `ref`.**

> `openDialog` 的返回值是一个手动关闭 Dialog 的函数, `close(false)` 将不会触发Dialog的 `onClose` 方法。**推荐使用 `closeDialog` 来关闭对话框。**


#### closeDialog

`closeDialog(dialogId: string, options: object): void`

`dialogId` 对应调用 `openDialog` 时传的参数。

`options.triggerOnClose` 如果是 `true`，关闭时会触发 `onClose` 回调，`false` 时不会触发。


#### 指定Dialog宽度

在 `style` 中可以指定弹出窗口的宽度, e.g. `style={{ width: '600px' }}`.

默认情况下弹出窗口会自适应内容的宽度, 同时有最小宽度和最大宽度.

