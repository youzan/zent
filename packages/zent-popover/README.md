## Popover 弹层

通用的触发式弹层组件, 可以自定义定位算法、触发方式以及弹层显示方式。

**这个组件不提供样式**。气泡提示组件请使用 `Pop`。

### 使用场景

如果 `Pop` 提供的功能无法满足你的需求，需要实现自定义的触发式弹层时可以使用 `Popover` 来简化开发。

`Popover` 封装了常用的逻辑：

* 三种触发方式：鼠标点击，鼠标移入以及获取输入焦点
* 12种定位 (4 x 3, 每个方位三种)
* 以及一个基于 `Portal` 的弹层实现

如果这些内置的逻辑无法满足你的需求，你还可以用自己的实现来替换它们，所有这些都很容易实现。

### 代码演示

:::demo 基本使用方式
```js
import { Popover, Button } from 'zent';

ReactDOM.render(
	<Popover 
		className="zent-doc-popover" 
		position={Popover.Position.BottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Click>
			<Button type="primary">点击打开</Button>
		</Popover.Trigger.Click>
		<Popover.Content>
			<div>Popover 弹层内容</div>
			<div>可以添加任意内容</div>
		</Popover.Content>
	</Popover>
	, mountNode
);
```
:::

:::demo 外部控制打开／关闭
```js
import { Popover, Button } from 'zent';

class PopoverDemo extends Component {
	state = {
		visible: false
	};

	render() {
		return (
			<div className="zent-doc-popover-container">
				<Popover
					className="zent-doc-popover"
					visible={this.state.visible} 
					onVisibleChange={v => this.setState({ visible: v })}
					position={Popover.Position.BottomLeft} 
					display="inline"
					cushion={5}>
					<Popover.Trigger.Base>
						<Button type="primary" onClick={() => this.setState({ visible: true })}>点击打开</Button>
					</Popover.Trigger.Base>
					<Popover.Content>
						<div>Popover 弹层内容</div>
						<div>可以添加任意内容</div>
					</Popover.Content>
				</Popover>

				<Button onClick={() => this.setState({ visible: false })}>关闭</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<PopoverDemo />
	, mountNode
);
```
:::

### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| position | 定位的方式, 参见 `Popover.Positon` | Positon | | |
| cushion | 可选, 定位的偏移量, 通常用来预留空间给小箭头等东西 | number | `0` | |
| display | 可选, 在文档流里的出现形式 | string | `'block'` | 所有CSS中合法的 `display` 值 |
| onShow | 可选, 弹层显示后的回调函数 | func | `noop` | |
| onClose | 可选, 弹层关闭后的回调函数 | func | `noop` | |
| onBeforeShow | 可选, 弹层打开前的回调函数, 只有用户触发的打开操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | |
| onBeforeClose | 可选, 弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | |
| containerSelector | 可选, 弹层的父节点CSS selector | string | `'body'` | 所有合法的CSS selector |
| visible | 可选, 手动控制弹层的显示隐藏, 必须和 `onVisibleChange` 一起使用 | bool | | |
| onVisibleChange | 可选, 手动控制时的回调函数, 必须和`visible`一起使用, 只有用户手动触发的打开／关闭操作才会调用 | func | | |
| className | 可选, 自定义额外类名 | string | `''` |  |
| wrapperClassName | 可选, trigger外层包裹div的类名 | string | `''` |  |
| prefix | 可选, 自定义前缀 | string | `'zent'` |  |

`onBeforeShow` 和 `onBeforeClose` 可以返回一个 `Promise`，`Popover` 会在 `Promise` resolve 后关闭／打开。

如果你不使用 `Promise`，`onBeforeShow` 和 `onBeforeClose` 也提供一个可选的参数 `callback`，如果有这个参数的话，你必须在 `onBeforeShow` 和 `onBeforeClose` 里面手动调用 `callback` 才会关闭／打开。

每种 trigger 都有特有的 API 来控制组件行为, 自定义 trigger 可以按需指定 trigger 的参数.

#### Trigger.Click

| 参数        | 说明                                               | 类型                   | 默认值           |
| --------- | ------------------------------------------------ | -------------------- | ------------- |
| autoClose | 可选, 是否点击‘外面’自动关闭弹层                                   | bool                 | `true`        |
| isOutside | 可选, 判断一个节点是否在‘外面’, 点击在外面会关闭弹层。默认trigger和弹层以外的节点都是‘外面’ | func: (node) => bool | `() => false` |

#### Trigger.Hover

| 参数        | 说明        | 类型                   | 默认值           |
| --------- | ---------------------------------------- | -------------------- | ------------- |
| showDelay | 可选, 打开弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标移出弹层范围, 弹层不会打开   | number   | `150`  |
| hideDelay | 可选, 关闭弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标重新移入弹层范围, 弹层不会关闭 | number    | `150` |
| isOutside | 可选, 判断一个节点是否在‘外面’。默认trigger和弹层以外的节点都是‘外面’  | func: (node) => bool |  |

#### Trigger.Base

所有trigger的基类, 实现自定义 trigger 需继承这个类, 继承时一般需要重写 `getTriggerProps` 方法给 trigger 添加事件, 然后在事件
处理函数控制弹层的开/闭.

| 参数                 | 说明                                               | 类型                     |
| ------------------ | ------------------------------------------------ | ---------------------- |
| getTriggerNode     | 获取trigger的DOM node                               | func: () => node       |
| getContentNode     | 获取弹层的DOM node                                    | func: () => node       |
| open               | 打开弹层                                             | func                   |
| close              | 关闭弹层                                             | func                   |
| contentVisible     | 弹层当前是否打开                                         | bool                   |
| onTriggerRefChange | trigger的ref改变的时候需要调用的回掉函数, 只有在重写 render 函数的时候需要这个函数 | func:(instance) |

### Position API

Positon用于给弹层提供定位的, 内置12种定位, 可以添加自定义定位算法. Popover 上的 `cushion` 参数会影响定位, 通常用来提供一定量的偏移量。

```text
                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

#### Position.create

通过这个工厂函数创建自定义的 position, 这个函数接受一个函数作为参数，示例：

```js
const position = Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  return {
    getCSSStyle() {
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        opacity: 0
      };
    },

    name: 'position-example'
  };
});
```

#### withPopover 高阶组件

这个高阶组件暴露了 `Popover` 内部的几个重要方法, 可能的使用场景: 在 `Content` 内部手动关闭弹层.

| 参数             | 说明                    | 类型               |
| -------------- | --------------------- | ---------------- |
| getTriggerNode | 获取 trigger 的 DOM node | func: () => node |
| getContentNode | 获取弹层的 DOM node        | func: () => node |
| open           | 打开弹层                  | func             |
| close          | 关闭弹层                  | func             |

示例：

```js
// 点击close按钮可以关闭弹层
const HoverContent = withPopover(function HoverContent({ popover }) {
  return (
    <div>
      <div>popover content</div>
      <button onClick={popover.close}>close</button>
    </div>
  );
});

<Popover position={Popover.Position.RightTop} display="inline">
  <Popover.Trigger.Hover showDelay={500} hideDelay={200}>
    <button style={{ marginLeft: 100 }}>hover on me</button>
  </Popover.Trigger.Hover>
  <PopoverContent>
    <HoverContent />
  </PopoverContent>
</Popover>
```

<style>
.zent-doc-popover {
	border: 1px solid #e5e5e5;
	padding: 10px;
	border-radius: 4px;
	background: #fff;
	font-size: 14px;
}

.zent-doc-popover-container {
	.zent-popover-wrapper {
		margin-right: 10px;
	}
}
</style>
