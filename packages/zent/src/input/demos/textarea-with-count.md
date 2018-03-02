---
order: 4
zh-CN:
	title: textarea输入框加计数器
en-US:
	title: Textarea input with showCount
---

```jsx
import { Input } from 'zent';

class TextArea extends React.Component {
	state = {
		value: ''
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	render() {
		const { value } = this.state;
		return <div>
      <Input type="textarea" value={value} onChange={this.handleChange} maxLength={100} showCount autoSize />
  </div>
	}
}
ReactDOM.render(
  <TextArea />
  , mountNode
);
```
