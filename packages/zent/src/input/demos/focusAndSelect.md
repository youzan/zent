---
order: 7
zh-CN:
	title: 主动调用foucs和select方法,
	val: 测试内容
	selectAllText: 点击选择全部
	selectRangeText: 点击选择第三个字符
en-US:
	title: Manual focus and select
	val: Test content
	selectAllText: Select All
	selectRangeText: Select the 3rd Character
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
				<Input defaultValue='{i18n.val}' ref={input => this.input = input} />
				<Button onClick={this.focusAndSelectAll}>{i18n.selectAllText}</Button>
				<Button onClick={this.selectTheThirdChar}>{i18n.selectRangeText}</Button>
      </div>
    );
  }
}

ReactDOM.render(
	<FocusAndSelectTest />
  , mountNode
);
```
