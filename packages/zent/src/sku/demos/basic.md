---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```jsx
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
