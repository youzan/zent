# zent-pagination

0.2.0是实现了最新交互的分页组件

[![version][version-image]][download-url]
[![download][download-image]][download-url]     
[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-pagination.svg?style=flat-square     
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-pagination.svg?style=flat-square     
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-pagination     

## 使用场景或者特殊 API 设计讲解

主要应用于已知item total 数量的情况，对于不知道item total的特殊情况，暂时未做处理

### 设计

组件分层：core-pagination 和 zent-pagination

前者是核心的分页组件：只是分页功能，后者是基于前面组件的一个扩展，模拟www的交互

另外，抽出来了一个模块作为数据的中台，将统一的输入，输入是data，输出是renderData

#### parser的输入与输出

##### 输入
```js
{total: 20, current: 4}
```

##### 输出
```js
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

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必填 |
|------|------|------|--------|--------|--------|
| className | 自定义额外类名 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | null | 否 |
| current | 当前页数 | number | 1 | null | 是 |
| totalItem | 总个数 | number | null | null | 是 |
| pageSize | 每页个数 | number, array | 10 | null | 否 |
| maxPageToShow | 最大可显示页数 | number | null | null | 否 |
| onChange | 翻页回调 | function | null | null | 否 |


    pageSize的特别说明
    有两种方式设置
    1. pageSize={30}
    2. pageSize={[10,20,30]} // 默认是10
    3. pageSize={[10, 20, {value: 30, isCurrent: true}]}  // 默认是30
