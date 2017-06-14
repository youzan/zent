## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### 代码演示

:::demo 基础用法
```jsx
import { Cascader } from 'zent';

class Simple extends React.Component {

	state = {
		value: [],
		options: [
			{
				id: '330000',
				name: '浙江省',
				children: [
					{
						id: '330100',
						name: '杭州市',
						children: [
							{
								id: '330106',
								name: '西湖区'
							}
						]
					},
					{
						id: '330200',
						name: '温州市',
						children: [
							{
								id: '330206',
								name: '龙湾区'
							}
						]
					}
				]
			},
			{
				id: '120000',
				name: '新疆维吾尔自治区',
				children: [
					{
						id: '120100',
						name: '博尔塔拉蒙古自治州',
						children: [
							{
								id: '120111',
								name: '阿拉山口市'
							}
						]
					}
				]
			}
		]
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({
				value: ['330000', '330100', '330106']
			});	
		}, 5000);
	}

	onChange = (data) => {
		console.log(data)
	}

	render() {
		return (
			<Cascader value={this.state.value} onChange={this.onChange} options={this.state.options} />
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

:::demo 选中即时改变
```jsx
import { Cascader } from 'zent';

class Simple extends React.Component {

	state = {
		value: ['330000', '330100', '330106'],
		options: [
			{
				id: '330000',
				name: '浙江省',
				children: [
					{
						id: '330100',
						name: '杭州市',
						children: [
							{
								id: '330106',
								name: '西湖区'
							}
						]
					}
				]
			},
			{
				id: '120000',
				name: '新疆维吾尔自治区',
				children: [
					{
						id: '120100',
						name: '博尔塔拉蒙古自治州',
						children: [
							{
								id: '120111',
								name: '阿拉山口市'
							}
						]
					}
				]
			}
		]
	}

	onChange = (data) => {
		console.log(data);
	}

	render() {
		return (
			<Cascader value={this.state.value} changeOnSelect={true} options={this.state.options} onChange={this.onChange} />
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

### API

#### Cascader

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| options | 可选项数据源 | array | [] | '' |
| value | 级联的选中值 | array | [] | '' |
| onChange | 数据变化时的回调 | func | noop | '' |
| title | tab子项的标题 | array | ['省份', '城市', '县区'] | '' |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| changeOnSelect | 是否选择即触发改变 | boolean | false | '' |
| className | 自定义额外类名 | string | '' | '' |
| popClassName | popover自定义类名 | string | '' | '' |
| prefix | 自定义前缀 | string | 'zent' | '' |

