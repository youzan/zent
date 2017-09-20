## Grid 网格

网格组件

### 代码演示

:::demo 基础用法
```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name'
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
		/>
	, mountNode
);

```
:::


:::demo 加载
```jsx

import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name'
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

class Loading extends React.Component {
	render() {
		return (
			<Grid
				columns={columns}
				datasets={datasets}
				loading
			/>
		);
	}
};

ReactDOM.render(
		<Loading />
	, mountNode
);

```
:::


:::demo 分页
```jsx

import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name'
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

const pageSize = 5;
const totalItem = 50;

class PageInfo extends React.Component {
	state = {
		current: 1
	}

	onChange = ({ current }) => {
		this.setState({
			current: current
		})
	}

	render() {
		return (
			<Grid
				columns={columns}
				datasets={datasets}
				pageInfo={{
					current: this.state.current,
					pageSize: pageSize,
					totalItem: totalItem
				}}
				onChange={this.onChange}
			/>
		);
	}
};

ReactDOM.render(
		<PageInfo />
	, mountNode
);

```
:::

:::demo 选择
```jsx

import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name'
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock'
	}
];

const pageSize = 5;
const totalItem = 10;

const datasets = [];
const datasets2 = [];

for (let i = 0; i < 5; i++) {
	datasets.push({
		id: `f-${i}`,
		name: `商品1 ${i}`,
		uv: 20,
		stock: 5
	})
	datasets2.push({
		id: `s-${i}`,
		name: `商品2 ${i}`,
		uv: 20,
		stock: 5
	})
}

class Selection extends React.Component {
	state = {
		selectedRowKeys: [ 0, 10 ],
		datasets,
		current: 1
	}

	onChange = ({ current }) => {
		this.setState({
			current,
			datasets: current === 1 ? datasets : datasets2
		})
	}

	render() {
		return (
			<Grid
				columns={columns}
				datasets={this.state.datasets}
				pageInfo={{
					pageSize: pageSize,
					totalItem: totalItem,
					current: this.state.current
				}}
				selection={{
					selectedRowKeys: this.state.selectedRowKeys,
					onSelect: (selectedRowKeys, selectedRows, currentRow) => {
						console.log(selectedRowKeys, selectedRows, currentRow);
						this.setState({
							selectedRowKeys
						})
					}
				}}
				rowKey="id"
				onChange={this.onChange}
			/>
		);
	}
};

ReactDOM.render(
		<Selection />
	, mountNode
);

```
:::


:::demo colSpan & rowSpan
```jsx

import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name',
		colSpan: 2,
		width: '200px'
	}, {
		title: '副标题',
		name: 'sub',
		colSpan: 0,
		width: '200px'
	}, {
		title: '访问量',
		name: 'uv',
		bodyRender: (data, pos) => {
			const { row }  = pos;
			if (row % 2 === 0) {
				return {
					props: {
						rowSpan: 2
					},
					children: <span>{data.uv}</span>
				}
			}
			if (row % 2 !== 0) {
				return {
					props: {
						rowSpan: 0
					}
				}
			}
			return <span>{data.uv}</span>
		}
	}, {
		title: '库存',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 6; i++) {
	datasets.push({
		name: `商品 ${i}`,
		sub: `副标题 ${i}`,
		uv: 20,
		stock: 5
	})
}

class Span extends React.Component {
	render() {
		return (
			<Grid
				columns={columns}
				datasets={datasets}
			/>
		);
	}
};

ReactDOM.render(
		<Span />
	, mountNode
);

```
:::


:::demo fixed
```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name',
		width: 100,
		fixed: true
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
			scroll={{ x: 1300 }}
		/>
	, mountNode
);

```
:::

### API

| 参数         | 说明                                         | 类型            | 默认值         | 备选值     | 是否必须 |
| ---------- | ------------------------------------------ | ------------- | ----------- | ------- | ---- |
| columns    | 每一列需要的所有数据                                 | array[object] |             |         | 是    |
| datasets   | 每一行需要展示的数据                                 | array[object] |             |         | 是    |
| rowKey     | 每一行的key, 让react提升性能, 并防止出现一系列的问题           | string        | `id`        |         | 否    |
| onChange   | 列表发生变化时自动触发的函数，页面筛选、排序均会触发  | func          |             |         | 否    |
| emptyLabel | 列表为空时的提示文案                                 | string        | `'没有更多数据了'` |         | 否    |
| selection  | 表格的选择功能配置                                  | object        |             |         | 否    |
| loading    | 表格是否loading状态                              | bool          | `false`     |         | 否    |
| className  | 自定义额外类名                                    | string        | `''`        |         | 否    |
| prefix     | 自定义前缀                                      | string        | `'zent'`    |         | 否    |
| pageInfo   | table对应的分页信息                              | object        | null    |         | 否    |


#### onChange函数声明
onChange会抛出一个对象，这个对象包含分页变化的参数：

```js
{
	current, // {Number} 表示当前第几页
}
```

### columns

| 参数         | 说明                                  | 类型                    | 是否必须 |
| ---------- | ----------------------------------- | -------------------- - | ---- |
| title      | 每一列显示在thead上的名称                     |  node             | 否    |
| name       | 每一列的主键                    | string               | 否    |
| width      | 每一列在一行的宽度, 相对值和固定值 (如: 20% 或 100px) | string               | 否    |
| bodyRender | 这一列对应用来渲染的组件                        | node or function |        否    |

### selection

| 参数              | 说明              | 类型    | 是否必须 |
| --------------- | --------------- | ----- | ---- |
| selectedRowKeys | 默认选中            | array | 否    |
| onSelect(@selectedKeys, @selectedRows, @currentRow)        | 每次check的时候触发的函数 | func  | 否    |

### pageInfo

| 参数              | 说明              | 类型  | 是否必须 |
| --------------- | --------------- | --- | ----- |
| totalItem | 总条目个数            | number| 否    |
| pageSize | 每页个数   | number | 否    |
| current | 当前页码 | number | 否 |

