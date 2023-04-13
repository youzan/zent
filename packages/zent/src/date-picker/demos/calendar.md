---
order: 9
zh-CN:
	title: 使用其中的日历基础组件 "日历组合选择"CombinedPanelRangePicker、"单个日历组件" SingleCalendarDatePanelPicker
en-US:
	title: use basic components such as CombinedPanelRangePicker and DatePanel
---

```jsx
import { CombinedPanelRangePicker, SingleCalendarDatePanelPicker } from 'zent';
import { useState } from 'react';
import { addMonths, addDays } from 'date-fns';

const now = new Date();
const Demo = () => {
	// merged from props value
	const [selectedRange, setSelectedRange] = useState([now, addMonths(now, 1)]);
	const [selectedDate, setSelectedDate] = useState(null);

	const onSelectedRange = (value, finished) => {
		console.log('this is onSelectedRange', value, finished);
		setSelectedRange(value);
	};

	const onSelectedDate = (value, finished) => {
		console.log('this is onSelectedDate', value, finished);
		setSelectedDate(value);
	};

	return (
		<div>
			<div className="zent-datepicker-calendar-demo-wrapper">
				<div>
					<SingleCalendarDatePanelPicker
						selected={selectedDate}
						defaultPanelDate={now}
						onSelected={onSelectedDate}
						disabledPanelDate={() => false}
					/>
				</div>
			</div>
			<div className="zent-datepicker-calendar-demo-wrapper">
				<CombinedPanelRangePicker
					value={selectedRange}
					onChange={onSelectedRange}
					showTime
					hideConfirm={true}
					valueType="string"
					format="YYYY-MM-DD HH:mm:ss"
					disabledDate={() => false}
					leftClassName="zent-datepicker-calendar-demo-left"
					rightClassName="zent-datepicker-calendar-demo-right"
					footerClassName="zent-datepicker-calendar-demo-footer"
				/>
			</div>
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
