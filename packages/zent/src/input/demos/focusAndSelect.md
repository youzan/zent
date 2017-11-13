---
order: 5
zh-CN:
	title: 主动调用foucs和select方法
en-US:
	title: Manual focus and select method
---

```jsx
import { Input, Button } from 'zent';

class FocusAndSelectTest extends React.Component {
	focusAndSelectAll = () => {
		this.input.focus();
		this.input.select();
	}

	selectTheThirdChar = () => {
		this.input.focus();
		this.input.select(2, 3);
	}

  render() {
    return (
      <div>
				<Input defaultValue="test" ref={input => this.input = input} />
				<Button onClick={this.focusAndSelectAll}>click me select all</Button>
				<Button onClick={this.selectTheThirdChar}>click me select the third char</Button>
      </div>
    );
  }
}

ReactDOM.render(
	<FocusAndSelectTest />
  , mountNode
);
```
