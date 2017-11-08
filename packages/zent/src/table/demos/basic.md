---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Table } from 'zent';

const datasets = [{
  item_id: '5024217',
  bro_uvpv: '1/10',
  stock_num: '60',
  sold_num: 0,
}, {
  item_id: '5024277',
  bro_uvpv: '0/0',
  stock_num: 59,
  sold_num: 0,
}, {
  item_id: '13213123',
  bro_uvpv: '0/0',
  stock_num: 159,
  sold_num: 0,
}];

const columns = [{
  title: 'Product',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'PV',
  name: 'bro_uvpv',
  width: '200px',
}, {
  title: 'Stock',
  name: 'stock_num',
  width: '100px',
	isMoney: true,
  isMoney: true
}, {
  width: '3em',
  title: 'Sales',
  name: 'sold_num'
}];

ReactDOM.render(
  <Table
    columns={columns}
		pageInfo={null}
    datasets={datasets}
    rowKey="item_id"
	/>,
	mountNode
);
```
