---
order: 2
zh-CN:
	title: 双滑块选择范围
en-US:
	title: Double silders for range selection
---

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
  state = {
    value: [30, 100]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
