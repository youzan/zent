## Grid 网格

网格组件

### 代码演示

:::demo simple
```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '商品名',
		name: 'name',
		className: 'name'
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
		id: `id-${i}`,
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
			rowClassName={(data, index) => `${data.id}-${index}`}
			onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
		/>
	, mountNode
);

```
:::


:::demo loading
```jsx

import { Grid, Switch } from 'zent';

const columns = [
	{
		title: '听说这样设置一个超长超长的商品名会不换行',
		name: 'name',
		width: 100,
		nowrap: true
	}, {
		title: '听说这样设置访问量可以靠右对齐',
		name: 'uv',
		textAlign: 'right',
		width: 300
	}, {
		title: '这是一个大库存',
		name: 'stock',
		className: 'big-size'
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
	state={
		loading: true
	}
	render() {
		return (
			<div>
				<Switch
					onChange={value => this.setState({ loading: value })}
					checked={this.state.loading}
					size="small"
					className="switch"
				/>
				<Grid
					columns={columns}
					datasets={datasets}
					loading={this.state.loading}
				/>
			</div>
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
		title: '听说这样设置一个超长超长的商品名会不换行',
		name: 'name',
		width: 100,
		nowrap: true,
		onCellClick: data => {
			console.log(data, 'data');
		}
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
		name: `母婴商品 ${i}`,
		uv: 20,
		stock: 5
	})
	datasets2.push({
		id: `s-${i}`,
		name: `宠物商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

class PageInfo extends React.Component {
	state = {
		current: 1,
		datasets
	}

	onChange = ({ current }) => {
		this.setState({
			current: current
		})
	}

	render() {
		const { current } = this.state;
		return (
			<Grid
				columns={columns}
				datasets={current === 1 ? datasets : datasets2}
				pageInfo={{
					current: current,
					pageSize: pageSize,
					totalItem: totalItem
				}}
				onChange={this.onChange}
				ellipsis
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
		name: `母婴商品 ${i}`,
		uv: 20,
		stock: 5
	})
	datasets2.push({
		id: `s-${i}`,
		name: `宠物商品 ${i}`,
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
						console.log(selectedRows, currentRow);
						this.setState({
							selectedRowKeys
						})
					},
					getCheckboxProps: (data) => ({
							disabled: data.name === '母婴商品 1'
					})
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


::: demo 排序
```jsx
import { Grid } from 'zent';
import assign from 'lodash/assign';

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5
	})
}

const columns = [
	{
		title: '商品名',
		name: 'name',
		needSort: true
	}, {
		title: '访问量',
		name: 'uv'
	}, {
		title: '库存',
		name: 'stock',
		needSort: true
	}
];


class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name',
      sortType: ''
    };
  }

  onChange = (conf) => {
  	console.log(conf, 'conf')
    this.setState(assign({}, this.state, conf));
  }

  render() {
    return (
      <Grid
        columns={columns}
        datasets={datasets}
        onChange={this.onChange}
        sortBy={this.state.sortBy}
        sortType={this.state.sortType}
      />
    );
  }
};

ReactDOM.render(
    <Sort />
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
		width: '200px',
		bodyRender: (data, pos) => {
			return <span style={{ color: 'red' }}>{data.sub}</span>
		}
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
		title: '这真是一个超级长超级长的商品名',
		name: 'name',
		width: 100,
		fixed: true
	}, {
		title: '访问量',
		name: 'uv',
		width: 100,
		fixed: true
	}, {
		title: '库存',
		name: 'stock'
	}, {
		title: '销量',
		name: 'sold_num'
	}, {
		title: '创建时间',
		name: 'created_time',
		width: 100,
		fixed: 'right'
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		name: `商品 ${i}`,
		uv: 20,
		stock: 5,
		sold_num: 5,
		created_time: '2017-09-20'
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
			scroll={{ x: 1300 }}
			selection={{
				selectedRowKeys: [],
				onSelect: () => {}
			}}
		/>
	, mountNode
);

```
:::

### API

| 参数     | 说明                                  | 类型    | 默认值   | 是否必须 |
| -------- | ------------------------------------ | ----- | ------- | ------- |
| columns  | 表格列配置                            | array |         |   是    |
| datasets | 需要展示的数据                         | array |         |   是    |
| rowKey   | 每一行的 key                           | string |  `id`    |   否    |
| onChange | 列表发生变化时自动触发的函数，页面筛选、排序均会触发  | func | `noop` | 否    |
| sortBy   | 根据哪一个字段排序, 应该等于columns中某一个元素的`key`字段 | string | '' | 否 |
| sortType | 排序方式                            | string  |     ''   |   否    |
| emptyLabel | 列表为空时的提示文案                | string   | `'没有更多数据了'` | 否 |
| selection  | 表格的选择功能配置                 | object     |         | 否    |
| loading    | 表格是否处于loading状态           | bool          | `false` | 否  |
| className  | 自定义额外类名                    | string        | `''`   | 否   |
| rowClassName | 表格行的类名                    | string or func(data, index) |  ''   | 否   |
| prefix     | 自定义前缀                       | string       | `'zent'` | 否  |
| pageInfo   | table对应的分页信息               | object        | null   | 否  |
| onRowClick | 点击行时触发                      | func(data, index, event) | | 否 |
| ellipsis   | 是否需要文字超出宽度后省略号显示 (需配置 columns 中的 nowrap) | bool | false | 否 |

#### onChange函数声明
onChange会抛出一个对象，这个对象包含分页变化的参数：

```js
{
	current, // {Number} 表示当前第几页
	sortBy, // {String} 表示基于什么key进行排序
	sortType, // {String} ['asc', 'desc', ''] 排序的方式
}
```

### columns

| 参数         | 说明                               | 类型        | 是否必须 |
| ---------- | ----------------------------------- | ---------- | ---- |
| title      | 列头的名称                       |  node       | 是    |
| name       | 对应数据中的 key (建议设置) 支持 `a.b.c` 的嵌套写法  | string   | 否    |
| width      | 列表宽度                             | string or number | 否    |
| bodyRender | 渲染复杂组件                        | func(data, pos, name) or node |  否  |
| className  | 列头的 className                   | string |  否  |
| needSort   | 是否支持排序 (使用此功能 请设置 name)  | bool   | 否   |
| colSpan    | 列合并 当为 0 时不渲染               | number | 否    |
| fixed      | 是否固定列 可选值为 `left` `right` `true` (`true` 与 `left` 等效) | bool or strig | 否 |
| onCellClick | 点击单元格回调                      | func(data, event) | 否 |
| textAlign  | 文本对齐方式                        | string | 否 |
| nowrap     | 是否换行 默认换行                     | bool | 否 |


### selection

| 参数              | 说明              | 类型    | 是否必须 |
| --------------- | --------------- | ----- | ---- |
| selectedRowKeys | 默认选中            | array | 否    |
| onSelect | 每次check的时候触发的函数 | func(selectedKeys, selectedRows, currentRow)  | 否 |
| getCheckboxProps | 选择框属性配置 (当前仅支持 disabled) | func(data) | 否 |


### pageInfo

| 参数              | 说明              | 类型  | 是否必须 |
| --------------- | --------------- | --- | ----- |
| totalItem | 总条目个数 | number| 否    |
| pageSize | 每页个数   | number | 否    |
| current | 当前页码 | number | 否 |


<style>
  .switch {
		margin-bottom: 10px;
  }
  .big-size {
  	font-size: 20px;
  }
</style>
