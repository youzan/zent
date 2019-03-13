---
title: Sortable
subtitle: 拖拽排序
path: component/sortable
group: 展示
---

## Sortable 拖拽排序

Sortable 主要用于一个容器内元素的拖拽排序

### API

#### **`基础API`**

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| tag | 容器元素的HTML标签名           | string              | `'div'`            |                    一切合法的HTML标签名                       |
| items       | 被排序元素的数组                   | array                |           |  							  			         |
| onChange           | 排序完成时的回调函数									| (newItems: array): void | `noop`           |                         |
| filterClass | 禁用排序元素的类名 | string | | |
| className          | 自定义额外类名                  | string              | `''`						 |                             |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |	|

⚠️注意：基础API可以满足绝大多数的拖拽需求，items和onChange必须同时出现，作为一个受控组件，你需要在onChange中拿到新的数组，然后自己更新数据，如果有更复杂的需求，也可以不用items和onChange，而使用下面的进阶API实现更复杂的功能。

#### **`进阶API`**

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| sort | 是否支持拖拽 | bool | `true` | `true`, `false` |
| group | 用于多容器拖拽的分组(详见[Group](#group)) | string or object |  |  |
| delay | 拖拽时延迟的时间(ms) | number | 0 | |
| animation | 拖拽时的动画持续时间(ms) | number | 0 | |
| handle | 拖动柄的选择器(比如 '.sortable-handle') | string | | |
| ghostClass | 拖拽目标处填充元素的类名 | string | `'zent-ghost'` | |
| chosenClass | 被选中的元素的类名 | string | `'zent-chosen'` | |
| dragClass | 正在被拖拽的元素的类名 | string | `'zent-drag'` | |
| forceFallback | 是否忽略HTML5的拖拽行为并强制回退 | bool | `false` | `false`, `true` |
| fallbackClass | 使用forceFallback时克隆的DOM元素的类名 | string | `'zent-fallback'` | |
| fallbackOnBody | 是否将克隆的DOM元素附加到Body中 | bool | `false` | `false`, `true` |
| fallbackTolerance | 拖动行为生效前鼠标移动的距离(px) | number | 0 | |
| scroll | 拖拽过程中是否允许屏幕滚动 | bool | `true` | `true`, `false` |
| scrollFn | 如果你有自定义滚动条，该方法可用于自动滚动 | (offsetX: number, offsetY: number, originalEvent: Event): void | | |
| scrollSensitivity | 触发滚动时鼠标距离边缘的像素值(px) | number | 30 | |
| scrollSpeed | 滚动速度(px/s) | number | 10 | |

#### **`进阶事件API`**

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| setData | 用于调用HTML5原生的DataTransfer.setData方法 | (dataTransfer: object, dragEl: HTMLElement): void | || ||
| onChoose | 元素被选中时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onStart | 元素开始拖拽时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onEnd | 元素结束拖拽时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onAdd | 元素从另一个容器被拖拽到当前容器的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onUpdate | 元素被重新排序时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onSort | 当有元素被排序时的回调函数(例如新增，更新，删除) | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onRemove | 当元素从当前容器拖拽至其他容器时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onFilter | 当尝试拖拽一个被禁用拖拽的元素时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onMove | 当在一个容器内或者不同容器之间拖拽元素时的回调函数 | (e: Event, originEvent: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |
| onClone | 当复制元素时的回调函数 | (e: Event) (详见[事件回调](#shi-jian-hui-diao)) | | |

### Group
要将元素从一个列表拖到另一个列表中，这两个列表必须具有相同的分组名称(Group值)。 你还可以定义列表是否可以放弃，给予和保留元素的副本（clone），或接收元素。

- name: `string` 分组的名称
- pull: `true | false | 'clone' | function` 从列表中拖出的能力，如果设置为 `'clone'` 则不会移动元素，而是复制。
- put: `true | false | ['foo', 'bar'] | function` 是否可以从其他列表添加元素，还是可以设置为可接受元素的列表的一组组名。
- revertClone: `boolean` 当移动到另一个列表后，将克隆的元素还原到初始位置。

### 事件回调

- onChoose, onStart:

```js
	function (/**Event*/evt) {
		evt.oldIndex;  // 元素在父元素中的下标(number)
	},
```

- onEnd, onAdd, onUpdate, onSort, onRemove:

```js
	function (/**Event*/evt) {
		evt.item;  // 被拖拽的元素(HTMLElement)
		evt.to;    // 元素在拖拽开始前所在的列表(HTMLElement)
		evt.from;  // 元素在拖拽结束后所在的列表(HTMLElement)
		evt.oldIndex;  // 元素在拖拽开始前的父元素中的下标(number)
		evt.newIndex;  // 元素在拖拽结束后的父元素中的下标(number)
	},
```

- onFilter:

```js
	function (/**Event*/evt) {
		evt.item;  // 接收到 `mousedown|tapstart` 事件的元素(HTMLElement)
	},
```

- onMove:

```js
	function (/**Event*/evt， /**Event*/originalEvent) {
		evt.dragged; // 被拖拽的元素(HTMLElement)
		evt.draggedRect; // 被拖拽元素的TextRectangle {left, top, right, bottom}
		evt.related; // 拖拽的目标元素(HTMLElement)
		evt.relatedRect; // 拖拽的目标元素的TextRectangle {left, top, right, bottom}
		originalEvent.clientY; // 鼠标所在的位置(number)
		// return false; — 用于取消拖拽
	},
```

- onClose:

```js
	function (/**Event*/evt) {
		evt.item;  // 原始元素(HTMLElement)
		evt.clone // 被复制的元素(HTMLElement)
	},
```

<style>
	.demo-sortable {
		padding: 0 140px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.zent-card:not(:last-child) {
		margin-bottom: 4px;
	}

	.demo-sortable-item,
	.demo-sortable-add {
		position: relative;
		text-align: center;
		line-height: 100px;
		border: 1px solid #dcdde0;
		border-radius: 4px;
		flex: 0 0 100px;
		height: 100px;
		margin: 0 20px 20px 0;
	}

	.demo-sortable-add {
		cursor: pointer;
	}

	.demo-sortable-item:hover {
		.demo-sortable-icon {
			display: block;
		}
	}

	.demo-sortable-drag {
		.demo-sortable-icon {
			display: none !important;
		}
	}

	.demo-sortable-icon {
		display: none;
		cursor: pointer;
		font-size: 10px;
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
