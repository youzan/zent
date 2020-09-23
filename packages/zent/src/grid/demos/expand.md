---
order: 10
zh-CN:
	title: 可展开模式
en-US:
	title: Flexible
---

```js
import { Grid } from 'zent';

const datasets = [{
  id: 5024217,
  item_id: '5024217',
  bro_uvpv: '0/0',
  stock_num: '60',
  sold_num: 0,
  subRows: [{
    item_id: '5024217',
    bro_uvpv: '0/0',
    stock_num: '60',
    sold_num: 0,
  }]
}, {
  id: 5024276,
  item_id: '5024276',
  bro_uvpv: '0/0',
  stock_num: 59,
  sold_num: 0,
}, {
  id: 13213123,
  item_id: '13213123',
  bro_uvpv: '0/0',
  stock_num: 159,
  sold_num: 0,
}];
const columns = [{
  title: 'Product',
  width: '50px',
  name: 'item_id'
}, {
  title: 'PV',
  name: 'bro_uvpv',
  width: '100px'
}, {
  title: 'Stock',
  name: 'stock_num',
  width: '100px'
}, {
  title: 'Sales',
  name: 'sold_num',
}];

class RowClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
    };
  }

  getRowConf(data, index) {
    return {
      canSelect: true,
    };
  }

  onChange(conf) {
    this.setState(conf);
  }

  onExpand = (conf) => {
    console.log(conf);
  }
  render() {
    return (
      <Grid
        columns={columns}
        datasets={datasets}
        onChange={this.onChange.bind(this)}
        getRowConf={this.getRowConf}
        rowKey="item_id"
        expandation={{
          isExpanded(record, index) {
            return (index === 0);
          },
        }}
        onExpand={this.onExpand}
      />
    );
  }
}

ReactDOM.render(
  <RowClass />,
  mountNode
);
```
