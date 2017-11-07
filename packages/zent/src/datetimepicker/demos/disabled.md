---
order: 5
zh-CN:
	title: 传入 disabled 使输入框处于禁用状态
en-US:
	title: Disabled input
---

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

ReactDOM.render(
  <div>
    <DatePicker
      className="zent-picker-demo"
      value="2017-01-01"
      disabled
    />
    <br />
    <MonthPicker
      className="zent-picker-demo"
      disabled
    />
    <br />
    <DateRangePicker
      className="zent-picker-demo"
      disabled
      />
   </div>
   , mountNode
)
```
