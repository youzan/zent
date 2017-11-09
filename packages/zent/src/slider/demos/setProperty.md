---
order: 3
zh-CN:
	title: 设置最大值，最小值，间隔
en-US:
	title: Set the maximun value, the minimun value and the interval between values.
---

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
  state = {
    value: 1.3
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider max={2} min={1} step={0.1} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
