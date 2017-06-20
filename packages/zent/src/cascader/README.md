## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### 代码演示

:::demo 基础用法
```jsx
import { Cascader } from 'zent';

class Simple extends React.Component {

	state = {
		value: [],
		options: []
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({
				value: ['330000', '330100', '330106'],
				options: [
					{
						id: '330000',
						title: '浙江省',
						children: [
							{
								id: '330100',
								title: '杭州市',
								children: [
									{
										id: '330106',
										title: '西湖区'
									}
								]
							},
							{
								id: '330200',
								title: '温州市',
								children: [
									{
										id: '330206',
										title: '龙湾区'
									}
								]
							}
						]
					},
					{
						id: '120000',
						title: '新疆维吾尔自治区',
						children: [
							{
								id: '120100',
								title: '博尔塔拉蒙古自治州',
								children: [
									{
										id: '120111',
										title: '阿拉山口市'
									}
								]
							}
						]
					}
				]
			});
		}, 1000);
	}

	onChange = (data) => {
		console.log(data);

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
			/>
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
				title: '浙江省',
				children: [
					{
						id: '330100',
						title: '杭州市',
						children: [
							{
								id: '330106',
								title: '西湖区'
							}
						]
					}
				]
			},
			{
				id: '120000',
				title: '新疆维吾尔自治区',
				children: [
					{
						id: '120100',
						title: '博尔塔拉蒙古自治州',
						children: [
							{
								id: '120111',
								title: '阿拉山口市'
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
				value: []
			});	
		}, 2000);
	}

	onChange = (data) => {
		console.log(data);
	}

	render() {
		return (
			<Cascader
				value={this.state.value}
				changeOnSelect={true}
				options={this.state.options}
				onChange={this.onChange}
			/>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


:::demo loadMore 动态加载数据
```jsx
import { Cascader } from 'zent';

class Simple extends React.Component {

	state = {
		value: [],
		options: [
			{
				id: '330000',
				title: '浙江省'
			},
			{
				id: '120000',
				title: '新疆维吾尔自治区'
			}
		]
	}

	loadMore = (root, stage) => new Promise((resolve, reject) => {
		setTimeout(() => {
			let isLeaf = stage >= 2;
			root.children = [{
				id: `66666${stage}`,
				title: `Label${stage}`,
				isLeaf
			}];
			this.setState({
				options: [...this.state.options]  
			});
			resolve();
		}, 500);
	})

	onChange = (data) => {
		console.log(data);
	}

	render() {
		return (
			<Cascader
				value={this.state.value}
				options={this.state.options}
				onChange={this.onChange}
				loadMore={this.loadMore}
			/>
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
| value | 级联的选中值 | array | [] | '' |
| options | 可选项数据源 | array | [] | '' |
| title | tab子项的标题 | array | ['省份', '城市', '县区'] | '' |
| onChange | 数据变化时的回调 | func | noop | '' |
| loadMore | 动态加载级联的数据，返回值需为 Promise | func | - | '' |
| changeOnSelect | 是否选择即触发改变 | boolean | false | '' |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| prefix | 自定义前缀 | string | 'zent' | '' |
| className | 自定义额外类名 | string | '' | '' |
| popClassName | popover自定义类名 | string | ''zent-cascader__popup'' | '' |

