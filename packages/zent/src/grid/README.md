## Grid 网格

网格组件

### 代码演示

:::demo 基础用法
```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '商品',
		name: 'item_id',
		width: '20%',
		bodyRender: data => {
			return <span>{data.item_id}</span>
		}
	}, {
		title: '访问量',
		name: 'bro_uvpv',
		width: '200px'
	}, {
		title: '库存',
		name: 'stock_num'
	}
];

const datasets = [{
	item_id: '5024217',
	bro_uvpv: '1/10',
	stock_num: '60'
}, {
	item_id: '5024277',
	bro_uvpv: '0/0',
	stock_num: 59
}, {
	item_id: '13213123',
	bro_uvpv: '0/0',
	stock_num: 159
}];

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
		title: '商品',
		name: 'item_id'
	}, {
		title: '访问量',
		name: 'bro_uvpv'
	}, {
		title: '库存',
		name: 'stock_num'
	}
];

const datasets = [{
	item_id: '5024217',
	bro_uvpv: '1/10',
	stock_num: '60'
}, {
	item_id: '5024277',
	bro_uvpv: '0/0',
	stock_num: 59
}, {
	item_id: '13213123',
	bro_uvpv: '0/0',
	stock_num: 159
}];

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
		title: '商品',
		name: 'item_id'
	}, {
		title: '访问量',
		name: 'bro_uvpv'
	}, {
		title: '库存',
		name: 'stock_num'
	}
];

const datasets = [{
	item_id: '5024217',
	bro_uvpv: '1/10',
	stock_num: '60'
}, {
	item_id: '5024277',
	bro_uvpv: '0/0',
	stock_num: 59
}, {
	item_id: '13213123',
	bro_uvpv: '0/0',
	stock_num: 159
}];

const pageSize = 10;
const totalItem = 50;

class PageInfo extends React.Component {
	state = {
		current: 1
	}

	onChange = ({ current }) => {
		console.log(current, 'current');
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
