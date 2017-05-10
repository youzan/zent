## Pagination 分页

分页组件

### 使用指南

- 展示条目的总数量必须已知

### 代码演示

:::demo 基础用法
```jsx
import { Pagination } from 'zent';

class Basic extends Component {
  state = {
    current: 1,
    totalItem: 1000
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        maxPageToShow={12}
      />
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  };
}

ReactDOM.render(
  <Basic />
  , mountNode
);
```
:::

:::demo 动态 PageSize
```jsx
import { Pagination } from 'zent';

class Dynamic extends Component {
  state = {
    current: 1,
    totalItem: 1000
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        pageSize={[20, { value: 30, isCurrent: true }]}
      />
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  }
}

ReactDOM.render(
  <Dynamic />
  , mountNode
);
```
:::

:::demo 海量页数
```jsx
import { Pagination } from 'zent';

class HugeTotal extends Component {
  state = {
    current: 1321,
    totalItem: 10000000000000,
    pageSize: 10
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        pageSize={this.state.pageSize}
        onChange={this.onChange}
      />
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  }
}

ReactDOM.render(
  <HugeTotal />
  , mountNode
);
```
:::

:::demo 动态自定义组件 props
```jsx
import { Pagination, Input } from 'zent';

class Custom extends Component {
  state = {
    current: 1,
    pageSize: 10,
    totalItem: 1000,
    max: 100
  }

  render() {
    return (
      <div>
        <form className="zent-form zent-form--horizontal">
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">totalItem: </label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.totalItem}
							onChange={this.onTotalChange} 
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">pageSize:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.pageSize}
							onChange={this.onPageSizeChange}
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">current:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.current}
							onChange={this.onCurrentChange}
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">maxPageToShow:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.max}
							onChange={this.onMaxChange}
						/>
          </div>
        </form>
        <Pagination
          current={this.state.current}
          totalItem={this.state.totalItem}
          pageSize={this.state.pageSize}
          maxPageToShow={this.state.max}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  };

  onTotalChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      totalItem: value
    });
  };

  onPageSizeChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      pageSize: value
    });
  };

  onCurrentChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      current: value
    });
  }

  onMaxChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      max: value
    });
  }
}

ReactDOM.render(
  <Custom />
  , mountNode
);
```
:::

### API

| 参数            | 说明      | 类型            | 默认值      | 是否必填 |
| ---------------| --------- | -------------- | ---------- | ------- |
| current       | 当前页数    | number        | `1`      | 是    |
| totalItem     | 总个数     | number        |          | 是    |
| pageSize      | 每页个数    | number, array | `10`     | 否    |
| maxPageToShow | 最大可显示页数 | number        |          | 否    |
| onChange      | 翻页回调    | function      |          | 否    |
| className     | 自定义额外类名 | string        | `''`     | 否    |
| prefix        | 自定义前缀   | string        | `'zent'` | 否    |

#### 关于 `pageSize` 属性

pageSize 属性支持3种格式：

- number: `30`

- arrayOf(number): `[10,20,30]`

初始值为 10

- `[10, 20, { value: 30, isCurrent: true }]`

初始值为 30

### 组件原理

- 组件结构上分为 core-pagination 和 zent-pagination

前者是核心的分页组件, 只提供分页功能, 后者是基于前组件的扩展, 模拟 www 的交互

- 组件内置独立的 parser 模块作为数据的中台, 将输入的条目信息统一为 `renderData`.

### parser 的输入与输出

#### 输入

```
{ total: 20, current: 4 }
```

#### 输出

```javascript
[{
  'content': '上一页',
  'target': 3
}, {
  'content': '1',
  'target': 1
}, {
  'content': '...',
}, {
  'content': '3',
  'target': 3,
}, {
  'content': '4',
  'target': 4,
  'current': true,
}, {
  'content': '5',
  'target': 5
}, {
  'content': '...',
  'target': 6
}, {
  'content': '20'
  'target': 20
}, {
  'content': '下一页'
  'target': 5
}];
```

<style>
.zent-pager-control-group {
	display: flex;
	
	.zent-pager-input {
		margin-left: 10px;
		width: 200px;
	}
}

</style>
