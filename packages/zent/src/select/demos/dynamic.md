---
order: 3
zh-CN:
	title: 动态修改选项数据
	blank: 空数组选项
	reset: 重置
en-US:
	title: Modify the option data dynamically
	blank: Empty option array
	reset: Reset
---

```js
import { Select, Button } from 'zent';

const Option = Select.Option;

class Demo extends Component {
	state = {
  	selectedValue: '2',
		selectData: [
			{ value: '1', text: 'Option 1' },
			{ value: '2', text: 'Option 2' },
			{ value: '3', text: 'Option 3' },
		]
  };

	reRender = () => {
		this.forceUpdate();
	};

	selectChangeHandler = (event, selected) => {
		this.setState({
			selectedValue: selected.value
		});
	};

	reset = () => {
		this.setState({
			selectData: []
		});
	};

	refill = () => {
		this.setState({
			selectData: [
				{ value: '1', text: 'Option 1' },
				{ value: '2', text: 'Option 2' },
				{ value: '3', text: 'Option 3' },
			]
		});
	};

  render() {
  	return (
    	<div>
				<Select
					data={this.state.selectData}
					onChange={this.selectChangeHandler}
					value={this.state.selectedValue} />
				<Button onClick={this.reset}>{i18n.blank}</Button>
				<Button onClick={this.refill}>{i18n.reset}</Button>
    	</div>
    );
  }
}

ReactDOM.render(
  <Demo />
  , mountNode
);
```
