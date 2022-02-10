---
order: 4
zh-CN:
	title: 部分禁用拖拽
en-US:
	title: Partially disable drag
---

```js
import { useState } from 'react';
import { Sortable } from 'zent';
import cx from 'classnames';
const LIST = [
	{
		name: 'Arvin',
	},
	{
		name: 'Jack',
	},
	{
		name: 'Bob',
	},
	{
		name: 'Nick',
	},
];
const NUMBER_LIST = Array(9)
	.fill()
	.map((_, index) => index);

const Simple = () => {
	const [list1, setList1] = useState(LIST);
	const [list2, setList2] = useState(NUMBER_LIST);
	const [list3, setList3] = useState(LIST);

	return (
		<div className="demo-sortable-wrapper-disabled">
			<Sortable
				items={list1}
				onChange={items => setList1(items)}
				filterClass="item-disabled"
			>
				{list1.map(({ name }, index) => (
					<div
						className={cx('zent-demo-sortable-basic-item', {
							'item-disabled': index < 2,
						})}
						key={name}
					>
						{name}
					</div>
				))}
			</Sortable>
			<Sortable
				className="demo-sortable"
				items={list2}
				onChange={items => setList2(items)}
				filterClass="item-disabled"
			>
				{list2.map(i => (
					<div
						className={cx('demo-sortable-item', {
							'item-disabled': i < 3,
						})}
						key={i}
					>
						{i + 1}
					</div>
				))}
			</Sortable>
			<Sortable
				items={list3}
				handle=".drag-icon"
				onChange={items => setList3(list3)}
				filterClass="item-disabled-drag"
			>
				{list3.map(({ name }, index) => (
					<div
						className={cx('zent-demo-sortable-basic-item', {
							'item-disabled-drag': index < 2,
						})}
						key={name}
					>
						<Icon type="drag" className="drag-icon" /> {name}
					</div>
				))}
			</Sortable>
		</div>
	);
};
ReactDOM.render(<Simple />, mountNode);
```

<style>
	.demo-sortable-wrapper-disabled {
		display: flex;
		flex-wrap: wrap;
		background: rgba(247,247,247,0.50);
		padding: 24px;
	}
	.demo-sortable-wrapper-disabled .zent-sortable {
		margin: 0 48px 24px 0;
	}
	.item-disabled {
		cursor: no-drop !important;
	}
	.item-disabled-drag .drag-icon {
		cursor: no-drop !important;
	}
</style>
