---
order: 1
zh-CN:
	title: 基础用法
	color: 颜色
	size: 尺寸
	red: 红色
	blue: 蓝色
	golden: 土豪金
	black: 黑色
	gray: 灰色

en-US:
	title: Basic Usage
	color: color
	size: size
	red: red
	blue: blue
	golden: golden
	black: black
	gray: gray

---

```jsx
import { SKU } from 'zent';


const skuTree = [
  {
    id: 10740,
    text: "{i18n.color}"
  },
  {
    id: 40732,
    text: "{i18n.size}"
  }
];

const sku = [{
  id: 3,
  text: "{i18n.blue}"
}, {
  id: 10,
  text: "{i18n.red}"
}, {
  id: 30,
  text: "{i18n.golden}"
}, {
  id: 137,
  text: "{i18n.black}"
}, {
  id: 138,
  text: "{i18n.gray}"
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
