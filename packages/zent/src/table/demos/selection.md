---
order: 5
zh-CN:
	title: 选择模式
en-US:
	title: Selection
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
}];
const datasets2 = [{
  item_id: '4217',
  bro_uvpv: '0/0',
  stock_num: '60',
  sold_num: 0,
}, {
  item_id: '50',
  bro_uvpv: '0/0',
  stock_num: 59,
  sold_num: 0,
}, {
  item_id: '13123',
  bro_uvpv: '0/0',
  stock_num: 159,
  sold_num: 0,
}];

const columns = [{
  title: 'Product',
  width: 50,
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'PV',
  name: 'bro_uvpv',
  width: 10
}, {
  title: 'Stock',
  name: 'stock_num',
  width: 20
}, {
  title: 'Sales',
  name: 'sold_num',
  width: 20
}];

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			page: {
				pageSize: 3,
				current: 0,
				totalItem: 6,
			},
			datasets: datasets,
      selectedRowKeys: [],
    };
  }

  onSelect(selectedRowKeys, selectedRows, currentRow) {
    this.setState({
      selectedRowKeys
		});
  }

  getRowConf(rowData, index) {
    return {
      canSelect: index % 2 === 0
    };
  }

	onChange(conf) {
		this.setState({
			page: {
				pageSize: 3,
				current: conf.current,
				totalItem: 6
			},
			datasets: conf.current === 1 ? datasets : datasets2
		})
	}

  render() {
		let self = this;

		if (this.state.selectedRowKeys.length) {
			Notify.success(JSON.stringify(this.state.selectedRowKeys));
		}

    return (
      <Table
        columns={columns}
        datasets={this.state.datasets}
        rowKey="item_id"
        getRowConf={this.getRowConf}
				pageInfo={this.state.page}
				onChange={(conf) => { this.onChange(conf); }}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
					needCrossPage: true,
          onSelect: (selectedRowkeys, selectedRows, currentRow) => {
            self.onSelect(selectedRowkeys, selectedRows, currentRow);
          }
        }}
      />
    );
  }
}

ReactDOM.render(
  <Selection />,
  mountNode
);
```
