---
order: 5
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
		value: [],
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

	loadMore = (root, stage) => new Promise((resolve, reject) => {
		setTimeout(() => {
			let isLeaf = stage >= 2;
			let children = [{
				id: `66666${stage}`,
				title: `Label${stage}`,
				isLeaf
			}];
			resolve(children);
		}, 500);
	})

	onChange = (data) => {
		Notify.success(JSON.stringify(data));
		this.setState({
			value: data.map(item => item.id)
		});
	}

	render() {
		return (
			<Cascader
				value={this.state.value}
				options={this.state.options}
				onChange={this.onChange}
				loadMore={this.loadMore}
				placeholder="{i18n.placeholder}"
				type="menu"
				title={[
					'{i18n.pro}',
					'{i18n.city}',
					'{i18n.dis}'
				]}
			/>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
