## Table 表格（列表）

表格组件

### 使用指南

  表格中的页面筛选、排序均会触发 `onChange` 函数

### 代码演示

:::demo 基础用法
```jsx
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
  title: '商品',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '200px',
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px',
	isMoney: true,
  isMoney: true
}, {
  width: '3em',
  title: '总销量',
  name: 'sold_num'
}];

ReactDOM.render(
    <Table
      columns={columns}
			pageInfo={null}
      datasets={datasets}
      rowKey="item_id"
    />
  , mountNode
);

```
:::

:::demo 加载
```jsx
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
  title: '商品',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '200px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px',
  textAlign: 'center',
  isMoney: true
}, {
  width: '3em',
  title: '总销量',
  name: 'sold_num'
}];

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  // 用定时器模拟loading
  componentWillMount() {
    let self = this;
    setTimeout(() => {
      self.setState({
        loading: false
      });
    }, 3000);
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
        loading={this.state.loading}
        rowKey="item_id"
      />
    );
  }
};

ReactDOM.render(
    <Loading />
  , mountNode
);

```
:::

::: demo 分页
```jsx
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
  title: '商品',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '200px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px',
  textAlign: 'center',
  isMoney: true
}, {
  width: '3em',
  title: '总销量',
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
};

ReactDOM.render(
    <Pagination />
  , mountNode
);
```
:::

::: demo 排序
```jsx
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
  title: '商品',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  needSort: true,
  width: '200px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px',
  needSort: true,
  textAlign: 'center',
  isMoney: true
}, {
  width: '3em',
  title: '总销量',
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
};

ReactDOM.render(
    <Sort />
  , mountNode
);
```
:::

::: demo 选择
```jsx
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
  title: '商品',
  width: 50,
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: 10
}, {
  title: '库存',
  name: 'stock_num',
  width: 20
}, {
  title: '总销量',
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
    alert(`你选中了：${selectedRowKeys}`);
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
};

ReactDOM.render(
    <Selection />
  , mountNode
)

```
:::

::: demo 每行特殊设置

```jsx
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
  title: '商品',
  width: '50px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '100px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px'
}, {
  title: '总销量',
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
};

ReactDOM.render(
    <RowClass />
  , mountNode
)

```
:::

::: demo 可展开

```jsx
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
  title: '商品',
  width: '50px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '100px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px'
}, {
  title: '总销量',
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
};

ReactDOM.render(
    <RowClass />
  , mountNode
)

```
:::

::: demo 批量操作

```jsx
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
  title: '商品',
  width: '50px',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: '访问量',
  name: 'bro_uvpv',
  width: '100px'
}, {
  title: '库存',
  name: 'stock_num',
  width: '100px'
}, {
  title: '总销量',
  name: 'sold_num'
}];

class Customer extends React.Component {
  onClick = () => {
    alert(`选中了${this.props.data.length}个元素`);
  }

  render() {
    return <button key="comp" className="child-comps zent-btn"  onClick={this.onClick}>这是一个自定义组件,点击试试</button>;
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
          <span key="pure" className="child-comps">这是一个DOM</span>,
          (data) => {
            return <span key="func" className="child-comps" style={{color: "blueviolet"}}> 这是一个函数，选中了{data.length}个元素    </span>
          },
          Customer
        ]}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onSelect: (selectedRowkeys, selectedRows, currentRow) => {
            this.onSelect(selectedRowkeys);
          }
        }}
      />
    );
  }
};

ReactDOM.render(
    <BatchCompsClass />
  , mountNode
)

```
:::

### API

| 参数         | 说明                                         | 类型            | 默认值         | 备选值     | 是否必须 |
| ---------- | ------------------------------------------ | ------------- | ----------- | ------- | ---- |
| columns    | 每一列需要的所有数据                                 | array[object] |             |         | 是    |
| datasets   | 每一行需要展示的数据                                 | array[object] |             |         | 是    |
| rowKey     | 每一行的key, 让react提升性能, 并防止出现一系列的问题           | string        | `id`        |         | 否    |
| sortBy     | 根据哪一个字段排序, 应该等于columns中某一个元素的`key`字段       | string        |             |         | 否    |
| sortType   | 排序方式                                       | string        | `'desc'`    | `'asc'` | 否    |
| onChange   | 列表发生变化时自动触发的函数，页面筛选、排序均会触发  | func          |             |         | 否    |
| emptyLabel | 列表为空时的提示文案                                 | string        | `'没有更多数据了'` |         | 否    |
| selection  | 表格的选择功能配置                                  | object        |             |         | 否    |
| loading    | 表格是否loading状态                              | bool          | `false`     |         | 否    |
| getRowConf | 每一行的配置函数，返回一个配置对象`{ canSelect, rowClass }` | func          |             |         | 否    |
| expandation     |  展开配置                                      | object        |     |         | 否    |
| batchComponents     |  批量操作的组件列表，如何使用，看批量操作的示例   | array[html/function/React Component] |   null  |   null | 否    |
| batchComponentsAutoFixed  |   是否要自动fix批量操作      | bool          | `true`     |         | 否    |
| autoStick  | 是否自动将head stick到窗口                         | bool          | `false`     |         | 否    |
| autoScroll | 是否点击分页自动滚到table顶部                          | boll          | `false`     |         | 否    |
| className  | 自定义额外类名                                    | string        | `''`        |         | 否    |
| prefix     | 自定义前缀                                      | string        | `'zent'`    |         | 否    |
| pageInfo   | table对应的分页信息                              | object        | null    |         | 否    |

#### getRowConf的特别声明：
```jsx

  /*
  * @param data {Object} 每一行的数据
  * @param index {number} 每一行在列表中的index
  * @return {
  *  canSelect {boolean} 是否可选，默认为true
  *  rowClass {string} 这一行的特殊class，默认是空字符串
  * }
  */
  getRowConf(data, index) { // 每一行的数据和这一行在列表中的index
    return {
      canSelect: index % 2 === 0,
      rowClass: `row-${index}`
    }
  }
  
```

#### onChange函数声明
onChange会抛出一个对象，这个对象包含分页变化和排序的的参数：

```js
{
	sortBy, // {String} 表示基于什么key进行排序
	sortType, // {String} ['asc', 'desc'] 排序的方式
	current, // {Number} 表示当前第几页
}
```

### columns

| 参数         | 说明                                  | 类型                   | 默认值     | 是否必须 |
| ---------- | ----------------------------------- | -------------------- | ------- | ---- |
| title      | 每一列显示在thead上的名称                     | string               |         | 否    |
| name       | 每一列的主键, 影响到排序和筛选                    | string               |         | 否    |
| width      | 每一列在一行的宽度, 相对值和固定值 (如: 20% 或 100px) | string               |         | 否    |
| isMoney    | 表示是否是金额                             | bool                 | `false` | 否    |
| needSort   | 这一列是否支持排序, 这一列必须设置了key, 才能正常使用排序功能  | bool                 | `false` | 否    |
| bodyRender | 这一列对应用来渲染的组件                        | node|function |         | 否    |
| textAlign  | 文本对齐方式                        | string |    ''     | 否    |

### selection

| 参数              | 说明              | 类型    |  默认值 | 是否必须 |
| --------------- | --------------- | ----- | ---- | ----- |
| selectedRowKeys | 默认选中            | array |  | 否    |
| isSingleSelection | 是否是单选            | Boolean | false | 否    |
| needCrossPage |   是否需要跨页的时候多选            | Boolean | false | 否    |
| onSelect(@selectedkeys, @selectedRows, @currentRow)        | 每次check的时候触发的函数 | func  |  | 否    |

### pageInfo

| 参数              | 说明              | 类型    |  默认值 | 是否必须 |
| --------------- | --------------- | ----- | ---- | ----- |
| totalItem | 总条目个数            | number | 0 | 否    |
| pageSize | 每页个数   | number |  | 否    |
| current | 当前页码 | number | | |
| maxPageToShow    | 最多可显示的个数 | number  |  | 否  
| total | 总条目个数**[deprecated]**   | number | 0 | 否    |
| limit | 每页个数**[deprecated]**   | number |  | 否    |

### expandation

| 参数              | 说明              | 类型    |  默认值 | 是否必须 |
| --------------- | --------------- | ----- | ---- | ----- |
| isExpanded | 是否展开当前行            | boolean | false | 否    |
| expandRender        | 展开行的补充内容render | func  |  | 否  

<style>
  .row {
    &-0 {
      background: #2ecc71;
    }
    &-1 {
      background: #3498db;
    }
    &-2 {
      background: #e74c3c;
    }
  }
</style>
