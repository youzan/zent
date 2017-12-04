---
order: 3
zh-CN:
	title: isSame
	color: 颜色
	size: 尺寸
	red: 红色
	blue: 蓝色
	big: 大
	small: 小
	viewCode: 请看代码

en-US:
	title: IsSame
	color: color
	size: size
	red: red
	blue: blue
	big: big
	small: small
	viewCode: See code below

---

```jsx
import { SKU } from 'zent';

const { isSame } = SKU;

let skuA = [
  { id: 1, text: '{i18n.color}', leaf: [{id: 11, text: '{i18n.red}'}, {id: 12, text: '{i18n.blue}'}] },
  { id: 2, text: '{i18n.size}', leaf: [{id: 21, text: '{i18n.big}'}, {id: 22, text: '{i18n.small}'}] }
];

let skuB = [
  { id: 1, text: '{i18n.color}', leaf: [{id: 11, text: '{i18n.red}'}, {id: 12, text: '{i18n.blue}'}] },
  { id: 2, text: '{i18n.size}', leaf: [{id: 21, text: '{i18n.big}'}, {id: 22, text: '{i18n.small}'}] }
];

let skuC = [
  { id: 1, text: '{i18n.color}', leaf: [{id: 11, text: '{i18n.red}'}, {id: 12, text: '{i18n.blue}'}] },
  { id: 2, text: '{i18n.size}', leaf: [{id: 22, text: '{i18n.small}'}, {id: 21, text: '{i18n.big}'}] }
];

let skuD = [
  { id: 1, text: '{i18n.color}', leaf: [{id: 11, text: '{i18n.red}'}, {id: 12, text: '{i18n.blue}'}] },
  { id: 3, text: '{i18n.size}', leaf: [{id: 21, text: '{i18n.big}'}, {id: 22, text: '{i18n.small}'}] }
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
    <p style={{fontSize: 14, color: '#333'}}>{i18n.viewCode}</p>
    , mountNode
);


```
