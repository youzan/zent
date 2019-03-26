---
order: 7
zh-CN:
	title: 可扩展模式
en-US:
	title: Flexible
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
  title: 'Product',
  width: '50px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
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
        expandation={{
          isExpanded(record, index) {
            return (index % 2 === 0);
          },
          expandRender(record) {
            return (
              <div>
                {record.title}
              </div>
            );
          }
        }}
      />
    );
  }
}

ReactDOM.render(
  <RowClass />,
  mountNode
);
```
