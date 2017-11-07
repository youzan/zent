---
order: 8
zh-CN:
	title: 支持批量操作
en-US:
	title: Batch Operation
---

```js
import { Table, Notify } from 'zent';

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
}, {
  item_id: '13213',
  bro_uvpv: '1/2',
  stock_num: 1592,
  sold_num: 1,
}, {
  item_id: '13215',
  bro_uvpv: '2/3',
  stock_num: 1591,
  sold_num: 0,
}];
const columns = [{
  title: 'Product',
  width: '150px',
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

class Customer extends React.Component {
  onClick = () => {
    Notify.success(`${this.props.data.length} elements was selected`);
  }

  render() {
    return <button key="comp" className="child-comps zent-btn"  onClick={this.onClick}>This is a custom component, click.</button>;
  }
}

class BatchCompsClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      selectedRowKeys: []
    };
  }

  getRowConf(data, index) {
    return {
      canSelect: true,
    };
  }

  onSelect = (selectedRowkeys) => {
    this.setState({selectedRowKeys: selectedRowkeys});
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
          batchComponents={[
          <span key="pure" className="child-comps">This is a DOM element.  </span>,
          (data) => {
            return <span key="func" className="child-comps" style={{color: "blueviolet"}}>   This is a function, {data.length} elements was selected.    </span>
          },
          Customer
        ]}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect: (selectedRowkeys, selectedRows, currentRow) => {
            this.onSelect(selectedRowkeys);
          },
          canRowSelect: true
        }}
      />
    );
  }
}

ReactDOM.render(
  <BatchCompsClass />,
  mountNode
);
```
