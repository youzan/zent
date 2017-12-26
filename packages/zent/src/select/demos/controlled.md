---
order: 2
zh-CN:
	title: 受控模式下使用组件
	pla: 选择一项
	reset: 重置为初始状态
	re: 重新渲染
	external: 外部状态
en-US:
	title: Controlled Mode
	pla: Select an option..
	reset: Reset
	re: Rerender
	external: External state
---

```js
import { Select, Button } from 'zent';

const Option = Select.Option;
const data = [
	{ value: '1', text: 'Option 1' },
	{ value: '2', text: 'Option 2' },
	{ value: '3', text: 'Option 3' },
];

class Demo extends Component {
	state = {
  	selectedValue: '2'
  };

	reRender = () => {
		this.forceUpdate();
	};

	selectChangeHandler = (event, selected) => {
		// do whatever u want here

		// important step for controlled component
		this.setState({
			selectedValue: selected.value // or selected[your optionValue]
		});
	};

	reset = () => {
		this.setState({
			selectedValue: ''
		});
	};

  render() {
  	return (
    	<div>
				<span>{i18n.external}: {this.state.selectedValue}</span>
				<br />
				<br />
				<Select
					placeholder="{i18n.pla}"
					data={data}
					onChange={this.selectChangeHandler}
					value={this.state.selectedValue} />
				<Button onClick={this.reset}>{i18n.reset}</Button>
				<Button onClick={this.reRender}>{i18n.re}</Button>
    	</div>
    );
  }
}

ReactDOM.render(
	<Demo />,
	mountNode
);
```
