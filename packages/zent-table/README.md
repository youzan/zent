# zent-table

表格组件

## API

### table接收参数
| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| className | 自定义额外类名 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | null | 否 |
| columns | 每一列需要的所有数据 | array[object] | null | null | 是 |
| datasets | 每一行需要展示的数据 | array[object] | null | null | 是 |
| rowKey | 每一行的key，让react提升性能，并防止出现一系列的问题 | string | `id` | null | 否 |
| sortBy | 根据哪一个字段排序，应该等于columns中某一个元素的`key`字段 | string | null | null | 否 |
| sortType | 排序方式 | string | 'desc' | 'asc' | 否 |
| onChange | 列表发生变化时自动触发的函数，页面筛选、排序均会触发 | func | null | null | 否 |
| emptyLabel | 列表为空时的提示文案 | string | '没有更多数据了' | null | 否 |
| selection | 表格的选择功能配置 | object | null | null | 否 |
| loading | 表格是否loading状态 | bool | false | null | 否 |
| getRowConf | 每一行的配置函数，返回一个配置对象`{ canSelect, rowClass }` | func | null | null | 否 |
| autoStick | 是否自动将head stick到窗口 | bool | false | true | 否 |
| autoScroll | 是否点击分页自动滚到table顶部 | boll | false | true | 否 |

> 页面筛选、排序均会触发 onChange函数


#### getRowConf的特别声明：

```javascript

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

### columns参数介绍
| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| title | 每一列显示在thead上的名称 | string | null | null | 否 |
| name | 每一列的主键，影响到排序和筛选 | string | null | null | 否 |
| width | 每一列在一行的宽度，相对值和固定值（如：20% 或 100px）| string | null | null | 否 |
| isMoney | 表示是否是金额 | false | null | null | 否 |
| needSort | 这一列是否支持排序，这一列必须设置了key，才能正常使用排序功能 | boolean | false | true | 否 |
| bodyRender | 这一列对应用来渲染的组件 | `React Element` 或 函数 | null | null | 否 |

### selection参数介绍
| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| selectedRowKeys | 默认选中 | array | null | null | 否 |
| onSelect | 每次check的时候出发的函数 | func | null | null | 否 |

## 如何使用

```bash
npm install zent-table
```

### 使用webpack打包的项目：

```js
import Table from 'zent-table';
import 'zent-pagination/lib/index.css';
```

### 使用requirejs打包的项目：
```js
var ZentTable = require('zent-table/dist/main');
```
