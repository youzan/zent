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
