---
order: 9
zh-CN:
	title: 空列表
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Empty table
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: UV
	stock: Stock
	sold_num: Sales
---

```js
import { Table } from 'zent';

const columns = [{
  title: '{i18n.product}',
  width: '150px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '{i18n.uv}',
  name: 'bro_uvpv',
  width: '100px'
}, {
  title: '{i18n.stock}',
  name: 'stock_num',
  width: '100px'
}, {
  title: '{i18n.sold_num}',
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
