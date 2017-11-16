---
order: 3
zh-CN:
	title: 分页模式
en-US:
	title: Pager
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
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'PV',
  name: 'bro_uvpv',
  width: '200px'
}, {
  title: 'Stock',
  name: 'stock_num',
  width: '100px',
  textAlign: 'center',
  isMoney: true
}, {
  width: '3em',
  title: 'Sales',
  name: 'sold_num'
}];

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      maxPageToShow: 8,
    };
  }

  onChange(data) {
    this.setState({
      current: data.current
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        onChange={this.onChange.bind(this)}
        pageInfo={{
          limit: this.state.limit,
          current: this.state.current,
          maxPageToShow: this.state.maxPageToShow,
          total: this.state.total
        }}
      />
    );
  }
}

ReactDOM.render(
	<Pagination />,
	mountNode
);
```
