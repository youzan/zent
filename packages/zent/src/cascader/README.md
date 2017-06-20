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
				title: `Title${stage}`,
				isLeaf
			}];
			this.setState({
				options: [...this.state.options]	
			});
			resolve();
		}, 500);
	})

	onChange = (data) => {
		console.log(data)
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
| options | 可选项数据源 | array | [] | '' |
| value | 级联的选中值 | array | [] | '' |
| onChange | 数据变化时的回调 | func | noop | '' |
| loadMore | 动态加载级联的数据，返回 Promise | func | - | '' |
| title | tab子项的标题 | array | ['省份', '城市', '县区'] | '' |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| changeOnSelect | 是否选择即触发改变 | boolean | false | '' |
| className | 自定义额外类名 | string | '' | '' |
| popClassName | popover自定义类名 | string | '' | '' |
| prefix | 自定义前缀 | string | 'zent' | '' |

