---
order: 11
zh-CN:
	title: 动态加载数据 (menu)
	placeholder: 请选择
	zj: 浙江省
	xj: 新疆维吾尔自治区
	pro: 省
	city: 市
	dis: 区
en-US:
	title: Dynamic Loading (menu)
	placeholder: Please choose
	zj: Zhejiang
	xj: Xinjiang
	pro: Province
	city: City
	dis: District
---

```js
import { Cascader, Notify } from 'zent';

class Simple extends React.Component {

	state = {
		value: [
			['330000', '330100', '330102'],
		],
		options: [
			{
				id: '330000',
				title: '{i18n.zj}',
				isLeaf: false
			},
			{
				id: '120000',
				title: '{i18n.xj}',
				isLeaf: false
			}
		]
	}

  // root 父节点
	loadOptions = (root, stage, type) => new Promise((resolve, reject) => {
		setTimeout(() => {
			let isLeaf = stage >= 2;
			let children = [{
				id: `66666${stage}`,
				title: `Label${stage}`,
				isLeaf
			}];
			resolve(root.children.concat(children));
		}, 500);
  })
  
	searchOptions = (keyword) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(options);
		}, 500);
  })

	onChange = (value, selectedOptions, type) => {
		this.setState({
			value,
		});
	}

	render() {
		return (
      <Cascader
        searchable
				value={this.state.value}
				options={this.state.options}
				onChange={this.onChange}
				loadOptions={this.loadOptions}
				searchOptions={this.searchOptions}
				placeholder="{i18n.placeholder}"
			/>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
