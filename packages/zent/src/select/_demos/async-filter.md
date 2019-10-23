---
order: 10
zh-CN:
	title: 支持异步选项过滤
en-US:
	title: With Async Option Filter
---

```js
import { Select } from 'zent';

const createOptions = keyword => [
	{text: `${keyword}__a`, value: `${keyword}__a`},
	{text: `${keyword}__b`, value: `${keyword}__b`},
	{text: `${keyword}__c`, value: `${keyword}__c`},
	{text: `${keyword}__d`, value: `${keyword}__d`},
	{text: `${keyword}__e`, value: `${keyword}__e`}
];

class AsyncFilterDemo extends Component {
	state = {
		selected: { value: '' },
		tags: [],
		options: createOptions('origin'),
	};

	onAsyncFilter = keyword => {
		setTimeout(() => {
			this.setState({
				options: createOptions(keyword)
			});
		}, 1000);
	};

	onTagsAsyncFilter = keyword => {
		const { tags } = this.state;
		setTimeout(() => {
			this.setState({
				/*
				 * 为了确保多选的选中状态不丢失
				 * 需要对异步操作进行特殊处理
				 *
				 * 将已选中的项添加进新 options, 同时做去重
				 */
				options: (tags.length ? tags : []).concat(
					createOptions(keyword).filter(newOption =>
						!tags.find(tag => tag.value === newOption.value)
					)
				)
			});
		}, 1000);
	};

	onChange = (e, selected) => {
		this.setState({
			selected
		});
	};

	onTagChange = (e, selected) => {
		this.setState({
			tags: [...this.state.tags, selected]
		});
	};

	onTagDelete = deleted => {
		const tags = this.state.tags.slice(0);
		this.setState({
			tags: tags.filter(tag => tag.value !== deleted.value)
		});
	};

	render() {
		const { selected, options, tags } = this.state;
		return (
			<div className="async-filter__wrapper">
				<Select
  		  	data={options}
					value={selected.value}
					onChange={this.onChange}
					onAsyncFilter={this.onAsyncFilter}
  		  	onEmptySelected={(data) => console.log(data)}
				/>
				<br />
				<br />
				<Select
					tags
					autoWidth
					className="async-filter__tags"
  		  	data={options}
					value={tags.map(tag => tag.value)}
					onChange={this.onTagChange}
					onDelete={this.onTagDelete}
					onAsyncFilter={this.onTagsAsyncFilter}
  		  	onEmptySelected={(data) => console.log(data)}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<AsyncFilterDemo />,
	mountNode
);
```

<style>
.async-filter__tags {
	width: 400px;
}
</style>
