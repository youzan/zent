---
title: Sortable
path: component/sortable
group: Data Display
---

## Sortable

Sortable is used for drag and drop elements of a container

### API

#### **`Basic API`**

| Props | Description                          | Type                | Default       		 | Optional           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| tag | the HTML tagName of the container element | string              | `'div'`            |                    All legal HTML tagNames                       |
| items       | an array of sorted elements                   | array                |           |  							  			         |
| onChange           | callback function when sorting is completed									| (newItems: array): void | `noop`           |                         |
| filterClass | the className of the elements that can not be sort | string | | |
| className          | custom classname                  | string              | `''`						 |                             |
| prefix             | custom prefix                     | string              | `'zent'`				  |	|

⚠️Notice：basic api can fit almost all the demand,items and onChange must appear at the same time，as a controlled component,you need to update the data by yourself from the onChange callback function,if more complex needs,you can Instead of using items and onChange, use the advanced API below for more complex situation.

#### **`Advanced API`**

| Props             	 	| Description                          | Type                | Default       		 | Optional           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| sort | is support drag and drop sort | bool | `true` | `true`, `false` |
| group | grouping for multi-container dragging(see detail at [Group](#group)) | string or object |  |  |
| delay | time to define when the sorting should start(ms) | number | 0 | |
| animation | animation speed moving items when sorting(ms) | number | 0 | |
| handle | drag handle selector within list items | string | | |
| ghostClass | class name for the drop placeholder | string | `'zent-ghost'` | |
| chosenClass | class name for the chosen item | string | `'zent-chosen'` | |
| dragClass | class name for the dragging item | string | `'zent-drag'` | |
| forceFallback | ignore the HTML5 DnD behaviour and force the fallback to kick in | bool | `false` | `false`, `true` |
| fallbackClass | class name for the cloned DOM Element when using forceFallback | string | `'zent-fallback'` | |
| fallbackOnBody | appends the cloned DOM Element into the Document's Body | bool | `false` | `false`, `true` |
| fallbackTolerance | Specify how far the mouse should move before it's considered as a drag(px) | number | 0 | |
| scroll | whether to allow the screen to scroll while dragging | bool | `true` | `true`, `false` |
| scrollFn | if you have custom scrollbar scrollFn may be used for autoscrolling | (offsetX: number, offsetY: number, originalEvent: Event): void | | |
| scrollSensitivity | how near the mouse must be to an edge to start scrolling(px) | number | 30 | |
| scrollSpeed | the scroll speed(px/s) | number | 10 | |

#### **`Advanced Event API`**

| Props             	 	| Description                          | Type                | Default       		 | Optional           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| setData | used to call the HTML5 native DataTransfer.setData method | (dataTransfer: object, dragEl: HTMLElement): void | || ||
| onChoose | the callback function when element is chosen | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onStart | the callback function when element dragging started | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onEnd | the callback function when element dragging ended | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onAdd | the callback function when element is dropped into the list from another list | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onUpdate | the callback function when changed sorting within list | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onSort | the callback function called by any change to the list (add / update / remove) | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onRemove | the callback function when element is removed from the list into another list | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onFilter | the callback function when attempt to drag a filtered element | (e: Event) (see detail at [Event callback](#event-callback)) | | |
| onMove | the callback function when you move an item in the list or between lists | (e: Event, originEvent: Event) (see detail at [Event callback](#event-callback)) | | |
| onClone | the callback function when creating a clone of element | (e: Event) (see detail at [Event callback](#event-callback)) | | |

### Group
To drag elements from one list into another, both lists must have the same `group` value. You can also define whether lists can give away, give and keep a copy (`clone`), and receive elements.

- name: `string` group name
- pull: `true | false | 'clone' | function` ability to move from the list. `'clone'` copy the item, rather than move.
- put: `true | false | ['foo', 'bar'] | function` whether elements can be added from other lists, or an array of group names from which elements can be taken.
- revertClone: `boolean` revert cloned element to initial position after moving to a another list.

### Event callback

- onChoose, onStart:

```js
	function (/**Event*/evt) {
		evt.oldIndex;  // lement index within parent(number)
	},
```

- onEnd, onAdd, onUpdate, onSort, onRemove:

```js
	function (/**Event*/evt) {
		evt.item;  // dragged HTMLElement(HTMLElement)
		evt.to;    // target list(HTMLElement)
		evt.from;  // previous list(HTMLElement)
		evt.oldIndex;  // element's old index within old parent(number)
		evt.newIndex;  // element's new index within new parent(number)
	},
```

- onFilter:

```js
	function (/**Event*/evt) {
		evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.(HTMLElement)
	},
```

- onMove:

```js
	function (/**Event*/evt， /**Event*/originalEvent) {
		evt.dragged; // dragged HTMLElement(HTMLElement)
		evt.draggedRect; // TextRectangle {left, top, right, bottom}
		evt.related; // HTMLElement on which have guided(HTMLElement)
		evt.relatedRect; // TextRectangle {left, top, right, bottom}
		originalEvent.clientY; // mouse position
		// return false; — for cancel
	},
```

- onClose:

```js
	function (/**Event*/evt) {
		evt.item;  // the origin HTMLElement(HTMLElement)
		evt.clone // the cloned HTMLElement(HTMLElement)
	},
```


<style>
	.demo-sortable {
		padding: 0 140px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.demo-sortable-item,
	.demo-sortable-add {
		position: relative;
		text-align: center;
		line-height: 100px;
		border: 1px solid #bbb;
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
