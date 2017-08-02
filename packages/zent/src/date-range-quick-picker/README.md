## DateRangeQuickPicker

简单的时间范围选择组件, 提供前7天和前30天的快速选择.

### 使用场景

list filter form 区域展示使用

### 代码演示

:::demo 基础用法
```js
import { DateRangeQuickPicker } from 'zent';

class Simple extends Component {
  state = {
    value: [],
    chooseDays: 0
  };

  handleChange = (value, chooseDays) => {
    this.setState({
      value,
      chooseDays
    });
  };

  render() {
    const { value, chooseDays } = this.state;

    return (
    	<div>
	      <DateRangeQuickPicker
	        onChange={this.handleChange}
	        value={value}
	        format="YYYY-MM-DD HH:mm:ss"
	        chooseDays={chooseDays}
	      />
      </div>
    );
  }
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


### API

| 参数            | 说明               | 类型             | 默认值      | 备选值     |
|------          |------              |------            |--------    |--------   |
| prefix         | 自定义前缀           | string          | `'zent'`    |           |
| className      | 自定义类名          | string            |   ''      |              |
| onChange       | change time func  | func          |         |              |
| value          | 起始、结束时间       | array        |           |             |
| format         | 返回日期字符串格式   |  string      |   `'YYYY-MM-DD'` 或 `'YYYY-MM-DD HH:mm:ss'`   |           |
| chooseDays     | 初始选择7天或者30天  |  number      |           |   `7, 30 `       |
