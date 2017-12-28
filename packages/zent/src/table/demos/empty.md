---
order: 9
zh-CN:
	title: 空列表
en-US:
	title: Empty table
---

```js
import { Table } from 'zent';

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
    datasets={[]}
	/>,
	mountNode
);
```
