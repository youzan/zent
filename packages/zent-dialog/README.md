## Dialog 对话框

对话框，通过打开一个浮层的方式，避免打扰用户的操作流程。

### 使用指南

-  命令式, 直接调用 `openDialog` 函数, **不支持 `context`。**

-  组件式, 通过控制 `visible` 来显示／隐藏对话框, **支持 `context`。**

-  推荐使用命令式, 不需要在外部维护一个 `visible` 属性, 更加方便。

### 代码演示

:::demo 基础用法
```js
import { Dialog } from 'zent';

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
				<button
					className="zent-btn zent-btn-primary"
					onClick={() => this.triggerDialog(true)}
				>
					显示
				</button>
				{dialog}
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo 使用 openDialog 开启对话框
```js
import { Dialog, Button } from 'zent';

const { openDialog } = Dialog;

const open = () => {
	const close = openDialog({
		title: '使用openDialog直接打开对话框',
		children: <div>Hello World</div>,
		footer: <Button onClick={() => close()}>关闭</Button>,
		onClose() {
			console.log('outer dialog closed');
		}
	});
};

ReactDOM.render(<Button onClick={open}>打开</Button>, mountNode);
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

**`options` 参数支持组件除 `visible` 以外的所有属性.**

如果需要组件实例的引用, 可以传一个函数形式的 `ref` 给 `openDialog`, **不支持字符串形式的 `ref`.**

返回值是一个手动关闭 Dialog 的函数 `closeDialog()`, `closeDialog(false)` 将不会触发Dialog的 `onClose` 方法

重复调用 `closeDialog` 等效于执行 `noop` 函数.



#### 指定Dialog宽度

在 `style` 中可以指定弹出窗口的宽度, e.g. `style={{ width: '600px' }}`.

默认情况下弹出窗口会自适应内容的宽度, 同时有最小宽度和最大宽度.

