---
order: 6
zh-CN:
	title: 显示清除按钮
en-US:
	title: show clear button
---

```jsx
import { Input } from 'zent';

class EventTest extends React.Component {
  state = {
		value: ''
	}

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <Input onChange={this.onChange} value={this.state.value} showClear />
      </div>
    );
  }
}

ReactDOM.render(
  <EventTest />
  , mountNode
);
```
