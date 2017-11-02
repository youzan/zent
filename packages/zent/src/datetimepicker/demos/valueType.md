---
order: 4
zh-CN:
	title: "通过设置 valueType 来指定返回值的类型，默认为 string，支持 string | date | number，默认和传入的 value 类型一致"
	number: 返回时间戳
	date: 返回 Date 对象
en-US:
	title: "valueType defaults to string, but can be date or number, defaults to the type value"
	number: Returns timestamp
	date: Returns Date object
---

```jsx
import { DatePicker, MonthPicker, DateRangePicker } from 'zent'

class Demo extends Component{
  state = {
  }
  
  onChangeDate = (val) => {
    this.setState({
      dateValue: val
    })
  }

  onChangeRange = (val) => {
    this.setState({
      rangeValue: val
    })
  }

  render() {
    const { dateValue, rangeValue } = this.state;
    return (
       <div>
        <p className="demo-subtitle">{i18n.number}</p>
        <DatePicker
          className="zent-picker-demo"
          valueType="number"
          value={dateValue}
          onChange={this.onChangeDate}
        />
        <br />
        <p className="demo-subtitle">{i18n.date}</p>
        <DateRangePicker
          className="zent-picker-demo"
          valueType="date"
          value={rangeValue}
          onChange={this.onChangeRange}
          />
      </div>
    )
  }
}

ReactDOM.render(
  <Demo />,
  mountNode
)
```
