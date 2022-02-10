---
order: 7
zh-CN:
	title: 底部有标签值
en-US:
	title: label values in bottom
---

```jsx
import { Slider } from 'zent';

const marks = {
  0: '0',
  100: '100'
};

class Test extends React.Component {
  state = {
    value: 30
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider marks={marks} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
