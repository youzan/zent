---
order: 4
zh-CN:
	title: 支持排序
en-US:
	title: Sorting
---

```js
import { Table } from 'zent';
import { assign } from 'lodash';

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
  title: 'Product',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'PV',
  name: 'bro_uvpv',
  needSort: true,
  width: '200px'
}, {
  title: 'Stock',
  name: 'stock_num',
  width: '100px',
  needSort: true,
  textAlign: 'center',
  isMoney: true
}, {
  width: '3em',
  title: 'Sales',
  needSort: true,
  name: 'sold_num'
}];

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'stock_num',
      sortType: 'desc'
    };
  }

  onChange(conf) {
    this.setState(assign({}, this.state, conf));
  }

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        onChange={this.onChange.bind(this)}
        sortBy={this.state.sortBy}
        sortType={this.state.sortType}
      />
    );
  }
}

ReactDOM.render(
	<Sort />,
	mountNode
);
```
