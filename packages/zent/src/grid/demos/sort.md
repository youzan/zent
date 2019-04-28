---
order: 5
zh-CN:
	title: 排序
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: Sort
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
---

```jsx
import { Grid } from 'zent';
import assign from 'lodash/assign';

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		id: i,
		name: `{i18n.product} ${i}`,
		uv: i * 10,
		stock: i * 5
	})
}

const columns = [
	{
		title: '{i18n.productName}',
		name: 'name',
		needSort: true
	}, {
		title: '{i18n.uv}',
		name: 'uv'
	}, {
		title: '{i18n.stock}',
		name: 'stock',
		needSort: true
	}
];


class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			datasets: datasets,
      sortBy: 'name',
      sortType: ''
    };
  }

  onChange = (conf) => {
  	console.log(conf, 'conf')
		const { sortType, sortBy } = conf;
		const { datasets } = this.state;
		let sortDatasets = datasets;
		if (sortType === 'asc') {
			sortDatasets = datasets.sort((a, b) => a[sortBy] - b[sortBy]);
		} else if (sortType === 'desc') {
			sortDatasets = datasets.sort((a, b) => b[sortBy] - a[sortBy]);
		}
    this.setState(assign({}, this.state, conf, { datasets: sortDatasets }));
  }

  render() {
    return (
      <Grid
        columns={columns}
        datasets={this.state.datasets}
        onChange={this.onChange}
        sortBy={this.state.sortBy}
        sortType={this.state.sortType}
      />
    );
  }
};

ReactDOM.render(
    <Sort />
  , mountNode
);
```
