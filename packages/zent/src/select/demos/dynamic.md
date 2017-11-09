---
order: 3
zh-CN:
	title: 动态修改选项数据
	pla: 请选择
	empty: 没有找到匹配项
en-US:
	title: Modify the option data dynamically
	pla: Select an option
	empty: No matches found
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
					placeholder="{i18n.pla}"
					emptyText="{i18n.empty}"
					data={this.state.selectData}
					onChange={this.selectChangeHandler}
					value={this.state.selectedValue} />
				<Button onClick={this.reset}>Blank option array</Button>
				<Button onClick={this.refill}>Refill</Button>
    	</div>
    );
  }
}

ReactDOM.render(
  <Demo />
  , mountNode
);
```
