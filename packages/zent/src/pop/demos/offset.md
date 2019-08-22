---
order: 9
zh-CN:
  title: offset 控制气泡位置偏移
	btnText: 打开气泡
en-US:
  title: offset control the offset of pop position
	btnText: Open
---

```jsx
import { useState } from 'react';
import { Select, Pop, Button, NumberInput, Checkbox, LayoutRow as Row, LayoutCol as Col, LayoutGrid as Grid } from 'zent';

const positions = [
	'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];
const trigger = 'hover';

const OffsetPop = () => {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [position, setPosition] = useState('top-center');
	const [centerArrow, setCenterArrow] = useState(false);
	const content = `position: ${position}, offset: {x: ${x}, y: ${y}}`;
	return (
		<div className="zent-doc-pop-offset">
			<div className="button-cont">
				<Pop
					trigger="click"
					position={position}
					content={content}
					offset={{x, y}}
					centerArrow={centerArrow}
				>
					<Button type="primary">{i18n.btnText}</Button>
				</Pop>
			</div>
			<div className="position-cont">
				<div className="position-row">
					<label for="pos" className="label">position: </label>
					<Select id="pos" value={position} data={positions} onChange={(e, data) => setPosition(data.value)} />
					<Checkbox id="center" checked={centerArrow} onChange={(e) => setCenterArrow(e.target.checked)}>centerArrow</Checkbox>
				</div>
				<div className="position-row">
					<label for="x" className="label">offset.x: </label>
					<NumberInput id="x" value={x} placeholder="请输入数字" onChange={value => setX(+value)} />
					<label for="y" className="label">offset.y: </label>
					<NumberInput id="y" value={y} placeholder="请输入数字" onChange={value => setY(+value)} />
				</div>
			</div>
		</div>
	)
} 

ReactDOM.render(
	<OffsetPop />,
	mountNode
);
```


<style>
  .zent-doc-pop-offset {
		display: flex;

		.button-cont {
			flex: 1;
			display: flex;
			align-items: center;
		}

		.position-cont {
			flex: 2;

			.position-row {
				display: flex;
				align-items: center;
				margin-bottom: 5px;
			}

			.zent-select-text {
				width: 180px;
			}
			.zent-number-input {
				width: 120px;
			}

			.label {
				width: 60px;
				margin-left: 20px;
			}
		}

    .zent-pop-wrapper .zent-btn {
			width: 120px;
    }
  }
</style>

