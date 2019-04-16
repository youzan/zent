---
order: 6
zh-CN:
	title: 特殊设置
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Special Setting
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
  bro_uvpv: '0/0',
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
  width: '50px',
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

class RowClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101
    };
  }

  getRowConf(data, index) {
    return {
      canSelect: true,
      rowClass: `row-${index}`
    };
  }

  onChange(conf) {
    this.setState(conf);
  }

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        onChange={this.onChange.bind(this)}
        getRowConf={this.getRowConf}
        rowKey="item_id"
      />
    );
  }
}

ReactDOM.render(
  <RowClass />,
  mountNode
);
```
