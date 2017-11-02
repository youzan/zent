---
order: 4
zh-CN:
	title: 标签值
en-US:
	title: Label
---

```jsx
import { Slider } from 'zent';

const marks = {
  0: '0°C',
  100: '100°C'
};

class Test extends React.Component {
  state = {
    value: [30, 100]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range marks={marks} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
