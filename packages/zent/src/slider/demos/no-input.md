---
order: 5
zh-CN:
	title: 只能选择标签值，此时无输入框
en-US:
	title: Only the label values can be selected, where there is no input.
---

```jsx
import { Slider } from 'zent';

const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C'
};

class Test extends React.Component {
  state = {
    value: [0, 50]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range dots marks={marks} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
