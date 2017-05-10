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
  width: '200px',
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

ReactDOM.render(
    <Table
      columns={columns}
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
      limit: 10,
      current: 0,
      total: 101,
      selectedRowKeys: [],
    };
  }

  onSelect(selectedRowKeys, selectedRows, currentRow) {
    this.setState({
      selectedRowKeys
    });
		console.log(currentRow)
    alert(`你选中了：${selectedRowKeys}`);
  }

  getRowConf(rowData, index) {
    return {
      canSelect: index % 2 === 0
    };
  }

  render() {
    let self = this;

    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="item_id"
        getRowConf={this.getRowConf}
        selection={{
          selectedRowKeys: this.state.selectedRowKeys,
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

### API

| 参数         | 说明                                         | 类型            | 默认值         | 备选值     | 是否必须 |
| ---------- | ------------------------------------------ | ------------- | ----------- | ------- | ---- |
| columns    | 每一列需要的所有数据                                 | array[object] |             |         | 是    |
| datasets   | 每一行需要展示的数据                                 | array[object] |             |         | 是    |
| rowKey     | 每一行的key, 让react提升性能, 并防止出现一系列的问题           | string        | `id`        |         | 否    |
| sortBy     | 根据哪一个字段排序, 应该等于columns中某一个元素的`key`字段       | string        |             |         | 否    |
| sortType   | 排序方式                                       | string        | `'desc'`    | `'asc'` | 否    |
| onChange   | 列表发生变化时自动触发的函数，页面筛选、排序均会触发                 | func          |             |         | 否    |
| emptyLabel | 列表为空时的提示文案                                 | string        | `'没有更多数据了'` |         | 否    |
| selection  | 表格的选择功能配置                                  | object        |             |         | 否    |
| loading    | 表格是否loading状态                              | bool          | `false`     |         | 否    |
| getRowConf | 每一行的配置函数，返回一个配置对象`{ canSelect, rowClass }` | func          |             |         | 否    |
| expandation     |  展开配置                                      | object        |     |         | 否    |
| autoStick  | 是否自动将head stick到窗口                         | bool          | `false`     |         | 否    |
| autoScroll | 是否点击分页自动滚到table顶部                          | boll          | `false`     |         | 否    |
| className  | 自定义额外类名                                    | string        | `''`        |         | 否    |
| prefix     | 自定义前缀                                      | string        | `'zent'`    |         | 否    |

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

### columns

| 参数         | 说明                                  | 类型                   | 默认值     | 是否必须 |
| ---------- | ----------------------------------- | -------------------- | ------- | ---- |
| title      | 每一列显示在thead上的名称                     | string               |         | 否    |
| name       | 每一列的主键, 影响到排序和筛选                    | string               |         | 否    |
| width      | 每一列在一行的宽度, 相对值和固定值 (如: 20% 或 100px) | string               |         | 否    |
| isMoney    | 表示是否是金额                             | bool                 | `false` | 否    |
| needSort   | 这一列是否支持排序, 这一列必须设置了key, 才能正常使用排序功能  | bool                 | `false` | 否    |
| bodyRender | 这一列对应用来渲染的组件                        | `React Element`/func |         | 否    |
| textAlign  | 文本对齐方式                        | string |    ''     | 否    |

### selection

| 参数              | 说明              | 类型    |  默认值 | 是否必须 |
| --------------- | --------------- | ----- | ---- | ----- |
| selectedRowKeys | 默认选中            | array |  | 否    |
| onSelect(@selectedkeys, @selectedRows, @currentRow)        | 每次check的时候出发的函数 | func  |  | 否    |

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
