---
order: 9
zh-CN:
	title: 使用其中的基础组件 "日历组合选择"CombinedPanelRangePicker
en-US:
	title: use basic component such as CombinedPanelRangePicker
---

```jsx
import { CombinedPanelRangePicker } from 'zent';
import { useState } from 'react';
import { addMonths } from 'date-fns';

const now = new Date();
const Demo = () => {
	// merged from props value
	const [selectedRange, setSelectedRange] = useState([now, addMonths(now, 1)]);

	const onSelectedRange = (value, finished) => {
		console.log('this is onSelectedRange', value, finished);
		setSelectedRange(value);
	};

	return (
		<div className="zent-datepicker-calendar-demo-wrapper">
			<CombinedPanelRangePicker
				value={selectedRange}
				onChange={onSelectedRange}
				showTime={true}
				hideConfirm={true}
				valueType="string"
				format="YYYY-MM-DD hh:mm:SS"
				disabledDate={() => false}
				leftClassName="zent-datepicker-calendar-demo-left"
				rightClassName="zent-datepicker-calendar-demo-right"
				footerClassName="zent-datepicker-calendar-demo-footer"
			/>
		</div>
	);
};

ReactDOM.render(<Demo />, mountNode);
```

<style>
	.zent-datepicker-calendar-demo-wrapper{
		display:flex;
		margin-bottom:20px;

		.zent-datepicker-calendar-demo-footer{
			border:none;
		}
	}
	.zent-datepicker-calendar-demo-left{
		margin-right:10px;
		border-right:1px solid #ccc;
	}
	.zent-datepicker-calendar-demo-right{
		margin-left:10px
	}
	
</style>
