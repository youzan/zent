---
order: 1
zh-CN:
	title: 基础用法
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Basic Usage
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: UV
	stock: Stock
	sold_num: Sales
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
  title: '{i18n.product}',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '{i18n.uv}',
  name: 'bro_uvpv',
  width: '200px',
}, {
  title: '{i18n.stock}',
  name: 'stock_num',
  width: '100px',
	isMoney: true,
  isMoney: true
}, {
  width: '6em',
  title: '{i18n.sold_num}',
  name: 'sold_num'
}];

ReactDOM.render(
  <Table
    columns={columns}
    datasets={datasets}
    rowKey="item_id"
	/>,
	mountNode
);
```
