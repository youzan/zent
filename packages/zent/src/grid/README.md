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

const pageSize = 2;
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
