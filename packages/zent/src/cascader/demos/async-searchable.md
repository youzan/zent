---
order: 7
zh-CN:
	title: 异步搜索
	zj: 浙江省
	hz: 杭州市
	xh: 西湖区
	yh: 余杭区
	wz: 温州市
	lw: 龙湾区
	xj: 新疆维吾尔自治区
	be: 博尔塔拉蒙古自治州
	al: 阿拉山口市
en-US:
	title: Async Searchable Usage
	zj: Zhejiang
	hz: Hangzhou
	xh: Xihu
	yh: YuHang
	wz: Wenzhou
	lw: Longwan
	xj: Xinjiang
	be: Bortala
	al: Alashankou
---

```js
import { MenuCascader } from 'zent';

class Simple extends React.Component {

	state = {
    value: [],
		options: [
			{
				value: '330000',
        label: '{i18n.zj}',
				children: [
					{
						value: '330100',
						label: '{i18n.hz}',
						children: [
							{
								value: '330106',
                label: '{i18n.xh}',
							},
							{
								value: '330107',
                label: '{i18n.yh}',
							}
						]
					},
					{
						value: '330200',
						label: '{i18n.wz}',
						children: [
							{
								value: '330206',
								label: '{i18n.lw}',
								disabled: true,
							}
						]
					}
				]
			},
			{
				value: '120000',
        label: '{i18n.xj}',
				children: [
					{
						value: '120100',
						label: '{i18n.be}',
						children: [
							{
								value: '120111',
								label: '{i18n.al}'
							}
						]
					}
				]
			}
		]
	}

	onChange = (value, selectedOptions, meta) => {
    console.log(value, selectedOptions, meta)
		this.setState({
			value,
		});
	}

  loadOptions = (selectedOptions, meta) => new Promise((resolve, reject) => {
		console.log(selectedOptions, meta)
		const { keyword, action } = meta;

    setTimeout(() => {
      if (action === 'search') {
				const options = [
					{
						"value": "330000",
						"label": "浙江省",
						"children": [
							{
								"value": "330100",
								"label": "杭州市",
								"children": [
									{
										"value": "330106",
										"label": `${keyword}-1`
									},
									{
										"value": "330107",
										"label": `${keyword}-2`
									}
								]
							},
							{
								"value": "330200",
								"label": "温州市",
								"children": [
									{
										"value": "330206",
										"label": `${keyword}-3`
									}
								]
							}
						]
					},
					{
						"value": "120000",
						"label": "上海市",
						"children": [
							{
								"value": "120100",
								"label": "上海市",
								"children": [
									{
										"value": "120111",
										"label": `${keyword}-4`
									}
								]
							}
						]
					}
				];
	
				this.setState({ options });
        resolve(options);
      }
    }, 1000);
  })

	render() {
		return (
      <MenuCascader
        value={this.state.value}
				options={this.state.options}
        onChange={this.onChange}
				expandTrigger="hover"
				loadOptions={this.loadOptions}
        clearable
        searchable
				async
				multiple
			/>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
