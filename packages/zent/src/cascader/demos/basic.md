---
order: 1
zh-CN:
	title: 基础用法
	zj: 浙江省
	hz: 杭州市
	xh: 西湖区
	wz: 温州市
	lw: 龙湾区
	xj: 新疆维吾尔自治区
	be: 博尔塔拉蒙古自治州
	al: 阿拉山口市
	pro: 省
	city: 市
	dis: 区
en-US:
	title: Basic Usage
	zj: Zhejiang
	hz: Hangzhou
	xh: Xihu
	wz: Wenzhou
	lw: Longwan
	xj: Xinjiang
	be: Bortala
	al: Alashankou
	pro: Province
	city: City
	dis: District
---

```js
import { Cascader, Notify } from 'zent';

class Simple extends React.Component {

	state = {
		value: ['330000', '330100', '330106'],
		options: [
			{
				id: '330000',
				title: '{i18n.zj}',
				children: [
					{
						id: '330100',
						title: '{i18n.hz}',
						children: [
							{
								id: '330106',
								title: '{i18n.xh}'
							}
						]
					},
					{
						id: '330200',
						title: '{i18n.wz}',
						children: [
							{
								id: '330206',
								title: '{i18n.lw}'
							}
						]
					}
				]
			},
			{
				id: '120000',
				title: '{i18n.xj}',
				children: [
					{
						id: '120100',
						title: '{i18n.be}',
						children: [
							{
								id: '120111',
								title: '{i18n.al}'
							}
						]
					}
				]
			}
		]
	}

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
