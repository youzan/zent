---
title: Pop
path: component/pop
group: Feedback
---

## Pop

A floating card opened by clicking, hovering or focusing.

### Guides

- Triggers: click, hover and focus
- Can be used as tooltip
- Supports arbitary content in popup

### Demos

### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| content | 弹层的内容 | node | | |
| trigger | 可选，触发方式 | string | `'none'` | `'click'`, `'hover'`, `'focus'` |
| position | 可选，弹出框的位置，命名规则：相对触发元素的位置+箭头相对于Pop的位置 | string | `'top-center'` |  |
| centerArrow | 可选，是否按小箭头居中对齐trigger来定位 | bool | `false` |  |
| header | 可选，用户可以自定义头部 | node | | |
| block | 可选，弹层在文档流里是否以块级元素出现 | bool | `false` |  |
| onShow | 可选，弹层打开后的回调函数 | func | `noop` | |
| onClose | 可选，弹层关闭后的回调函数 | func | `noop` | |
| onBeforeShow | 可选，弹层打开前的回调函数，只有用户触发的打开操作才会调用，外部设置`visible`不会调用 | func | `noop` | |
| onBeforeClose | 可选，弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用，外部设置`visible`不会调用 | func | `noop` | |
| onConfirm | 可选，用户自定义回调，设置以后pop 表现为confirm | func |  |  |
| onCancel | 可选，用户使用 confirm 的时候可自定义取消的回调 | func |  |  |
| confirmText | 可选，用户自定义按钮名 | string | `'确定'` |  |
| cancelText | 可选，用户自定义取消按钮 | string | `'取消'` |  |
| type | 可选，影响确定按钮的样式 | string | `'primary'` | `'default'`, `'danger'`, `'success'` |
| visible | 可选，外部维护 `Pop` 的显示状态，此时外部拥有 `Pop` 的全部控制权，必须和 `onVisibleChange` 一起使用 | bool | | |
| onVisibleChange | 可选，和 `visible` 一起使用 | func | | |
| className | 可选，自定义类名 | string | `''` |  |
| wrapperClassName | 可选，自定义trigger包裹节点的类名 | string | `''` |  |
| prefix | 可选，自定义前缀 | string | `'zent'` |  |

根据trigger值的不同, Pop 提供了一些额外的控制参数.

#### Click

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| closeOnClickOutside | 点击弹层和trigger节点外部时自动关闭 | bool | `true` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | |

#### Hover

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mouseEnterDelay | hover打开的延迟（单位：毫秒） | number | `200` |
| mouseLeaveDelay | 关闭的的延迟（单位：毫秒） | number | `200` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | |
| quirk | 开启 Popover 的 quirk 模式，该模式下判断关闭条件时不需要先从内部移动出去 | bool | `true` |

#### None

这种模式下 `onConfirm` 和 `onCancel` 不会自动关闭Pop, 需要使用者自己在回调中控制 `visible` 来关闭Pop.

#### withPop 高阶组件

这个高阶组件暴露了 `Pop` 内部的几个重要方法, 可能的使用场景: 在 `content` 内部手动关闭弹层.

| 参数             | 说明                    | 类型               |
| -------------- | --------------------- | ---------------- |
| open           | 打开 Pop                  | func             |
| close          | 关闭 Pop                  | func             |

### FAQ

#### centerArrow

默认情况下, `Pop` 根据 `position` 对齐的是弹层和trigger的边缘, 除了 `postion` 为 `'*-center'` 的情况下, 弹层上的小箭头和弹层边缘的间距是固定的, 因而在 trigger 特别小的情况下箭头会对齐到 trigger 外部. 这种情况下可以设置 `centerArrow` 为 `true`, 不管trigger大小如何, 箭头永远对齐在trigger中间, 弹层再相对箭头做定位.

#### onConfirm 和 onCancel

支持异步响应，此时按钮会变成loading状态。

- 如果返回 `Promise`, `Pop` 会在 `Promise` `resolve` 后关闭.
- 也支持参数形式的异步响应, 此时接受一个参数 `close`, 需要在函数内手动调用 `close` 函数.

<style>
.zent-doc-pop-container {
	.zent-pop-wrapper {
		margin-right: 10px;
	}

	.zent-doc-pop-tag {
		border: 1px solid #e5e5e5;
		border-radius: 20%;
		padding: 3px;
		font-size: 12px;
		cursor: default;
	}
}

.zent-doc-pop-positions {
	position: relative;
	
	&-top-row, &-bottom-row {
		text-align: center;

		.zent-pop-wrapper:not(:last-child) {
			margin-right: 10px
		}
	}

	&-bottom-row {
		margin-top: 200px;
	}

	&-left-col, &-right-col {
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 100%;

		.zent-pop-wrapper:not(:last-child) {
			margin-bottom: 10px
		}
	}

	&-left-col {
		left: 0;
	}

	&-right-col {
		right: 0;
	}

	.zent-pop-wrapper {
		.zent-btn {
			width: 100px;
		}
	}
}

.zent-doc-pop-none-trigger-container {
	.zent-pop-wrapper {
		margin-right: 10px;
	}
}
</style>
