## SKU 规格选择器

这是一个规格选择

### 使用场景

创建有多种规格的商品、服务的编辑页面

### 代码演示

:::demo 基础用法
```js
import { SKU } from 'zent';

const skuTree = [
  {
    id: 10740,
    text: '颜色'
  },
  {
    id: 40732,
    text: '尺寸'
  }
];

const sku = [{
  id: 3,
  text: '蓝色'
}, {
  id: 10,
  text: '红色'
}, {
  id: 30,
  text: '土豪金'
}, {
  id: 137,
  text: '黑色'
}, {
  id: 138,
  text: '灰色'
}];

class Simple extends Component {
  fetchSKUTree() {
    return new Promise(resolve => {
      resolve(skuTree);
    });
  }

  fetchSKU() {
    return new Promise(resolve => {
      resolve(sku);
    });
  }

  render() {
    return <SKU onFetchGroup={this.fetchSKUTree} onFetchSKU={this.fetchSKU} />;
  }
}

ReactDOM.render(
    <Simple />
    , mountNode
);

```
:::

### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | `''` |  |
| value | 当前选中的sku列表 | array | `[]` |  |
| maxSize | 最大规格名称数 | number | `3` |  |
| maxSKUTextLength | 规格名称文字最大长度 | number | `4` |  |
| maxLeafTextLength | 规格值文字最大长度 | number | `20` |  |
| skuTree | 可选的规格列表 | array | `[]` |  |
| optionValue | 自定义sku的id的key值 | string | `'id'` |  |
| optionText | 自定义sku的文案的key值 | string | `'text'` |  |
| onFetchGroup | 异步获取可选的规格列表，如“颜色”、“尺寸” | function | `Promise` |  |
| onFetchSKU | 异步获取单个规格可选的值，如“红色”、“蓝色” | function | `Promise` |  |
| onCreateGroup | 创建新的规格名，如“星座” | function | `Promise` |  |
| onCreateSKU | 创建新的规格值，如“处女座” | function | `Promise` |  |
| onChange | 当sku发生改变时的回调，返回值为sku当前value | function | `noop` |  |
| prefix | 自定义前缀 | string | 'rc-sku' | null |

### 工具API

为了更方便操作规格数据，SKU组件提供了一些工具方法

#### SKU.flatten(sku, items, options)

通过计算笛卡尔积，将树形的value变成扁平的数组

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| sku | 当前选中规格的value | array | `[]` |  |
| items | 当前已存在的数据 | array | `[]` |  |
| options | 可配置参数 | object | `{}` | `optionValue: 'id', optionText: 'text'` |

:::demo flatten
```js
import { SKU } from 'zent';

const { flatten } = SKU;

let skus = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

console.log(flatten(skus));
/**
 * output: 
 * [
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]},
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 * ]
 */

let items = [
  {
    "price": "10.00",
    "code": "AE86",
    "skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]
  }
];
console.log(flatten(skus, items));

/**
 * output: 
 * [
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]},
 *   {
 *    "price":"10.00",
 *    "code":"AE86",
 *    "skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]
 *   },
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 * ]
 */

ReactDOM.render(
    <span />
    , mountNode
);

```
:::

#### SKU.isSame(prevSKU, nextSKU)

判断两个sku的结构是否完全相同，包括子节点的顺序

:::demo isSame
```js
import { SKU } from 'zent';

const { isSame } = SKU;

let skuA = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

let skuB = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

let skuC = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 22, text: '小'}, {id: 21, text: '大'}] }
];

let skuD = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 3, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

console.log(isSame(skuA, skuB));
console.log(isSame(skuA, skuC));
console.log(isSame(skuA, skuD));

/**
 * output: 
 * 
 * true
 * false
 * false
 */

ReactDOM.render(
    <span />
    , mountNode
);

```
:::

