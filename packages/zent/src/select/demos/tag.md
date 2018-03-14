---
order: 13
zh-CN:
	title: 标签多选
	reset: 重置
	refill: 填充数据
	external: 外部状态
	optionDeleted: 被删除的选项是
	optionAdded: 新加的选项是
en-US:
	title: Multiple Select with Tag
	reset: Reset
	refill: Fill Data
	external: External state
	optionDeleted: The value of new deleted option is
	optionAdded: The value of new added option is
---

```js
import { Select, Button, Notify } from 'zent';

class TagsDemo extends Component {

	state = {
		selected: ["1"],
		data: [
			{ value: '1', text: 'Option 1' },
			{ value: '2', text: 'Option 2' },
			{ value: '3', text: 'Option 3' },
		]
	};

	reset = () => {
		this.setState({
			selected: []
		});
	};

	upgradeData = () => {
		this.setState({
			data: [
				{ value: '1', text: 'Option 1' },
				{ value: '2', text: 'Option 2' },
				{ value: '3', text: 'Option 3' },
				{ value: '4', text: 'Option 4' }
			]
		});
	};

	increaseHandler = (event, item) => {
		this.setState({
			value: this.state.selected.push(item.value)
		});
		Notify.success(<span>{i18n.optionAdded} {item.value}</span>);
	}

	deleteHandler = (item) => {

		// 可以使用效率更高或者更优雅的数组定点删除方法，比如 lodash.remove
		const newSelected = this.state.selected.filter(value => {
			return value !== item.value;
		});
		this.setState({
			selected: newSelected
		});
		Notify.success(<span>{i18n.optionDeleted} {item.value}</span>);
	}

	render() {
		return (
			<div>
				<span>{i18n.external}: {this.state.selected.join(',')}</span>
					<br />
					<br />
				<Select
					data={this.state.data}
					onChange={this.increaseHandler}
					onDelete={this.deleteHandler}
					tags
    			filter={(item, keyword) => item.text.indexOf(keyword) > -1}
					value={this.state.selected} />
				<Button onClick={this.reset}>{i18n.reset}</Button>
				<Button onClick={this.upgradeData}>{i18n.refill}</Button>
			</div>
		);
	}
}

ReactDOM.render(
  <TagsDemo />
  , mountNode
);
```
