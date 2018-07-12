---
order: 3
zh-CN:
	title: 选中即时改变
	zj: 浙江省
	hz: 杭州市
	xh: 西湖区
	xj: 新疆维吾尔自治区
	be: 博尔塔拉蒙古自治州
	al: 阿拉山口市
	pro: 省
	city: 市
	dis: 区
en-US:
	title: Change at any seleted
	zj: Zhejiang
	hz: Hangzhou
	xh: Xihu
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
	    this.setState({
	        value: data.map(item => item.id),
	    });
		Notify.success(JSON.stringify(data));
	}

	render() {
		return (
		    <div>
                <Cascader
                    value={this.state.value}
                    options={this.state.options}
                    onChange={this.onChange}
                    changeOnSelect
                    title={[
                        '{i18n.pro}',
                        '{i18n.city}',
                        '{i18n.dis}'
                    ]}
                />
                <br /><br />
                <Cascader
                    value={this.state.value}
                    displayText={value => (value && value.length > 0 ? value[value.length - 1].title : '')}
                    options={this.state.options}
                    onChange={this.onChange}
                    changeOnSelect
                    title={[
                        '{i18n.pro}',
                        '{i18n.city}',
                        '{i18n.dis}'
                    ]}
                />
            </div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
