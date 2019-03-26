---
order: 2
zh-CN:
	title: flatten
	color: 颜色
	size: 尺寸
	red: 红色
	blue: 蓝色
	big: 大
	small: 小
	viewCode: 请看代码

en-US:
	title: Flatten
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

const { flatten } = SKU;

let skus = [
  { id: 1, text: '{i18n.color}', leaf: [{id: 11, text: '{i18n.red}'}, {id: 12, text: '{i18n.blue}'}] },
  { id: 2, text: '{i18n.size}', leaf: [{id: 21, text: '{i18n.big}'}, {id: 22, text: '{i18n.small}'}] }
];

console.log(flatten(skus));
/**
 * output: 
 * [
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":11,"v":"{i18n.red}"},{"k_id":2,"k":"{i18n.size}","v_id":21,"v":"{i18n.big}"}]},
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":11,"v":"{i18n.red}"},{"k_id":2,"k":"{i18n.size}","v_id":22,"v":"{i18n.small}"}]}
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":12,"v":"{i18n.blue}"},{"k_id":2,"k":"{i18n.size}","v_id":21,"v":"{i18n.big}"}]}
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":12,"v":"{i18n.blue}"},{"k_id":2,"k":"{i18n.size}","v_id":22,"v":"{i18n.small}"}]}
 * ]
 */

let items = [
  {
    "price": "10.00",
    "code": "AE86",
    "skus":[{"k_id":1,"k":"{i18n.color}","v_id":11,"v":"{i18n.red}"},{"k_id":2,"k":"{i18n.size}","v_id":22,"v":"{i18n.small}"}]
  }
];
console.log(flatten(skus, items));

/**
 * output: 
 * [
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":11,"v":"{i18n.red}"},{"k_id":2,"k":"{i18n.size}","v_id":21,"v":"{i18n.big}"}]},
 *   {
 *    "price":"10.00",
 *    "code":"AE86",
 *    "skus":[{"k_id":1,"k":"{i18n.color}","v_id":11,"v":"{i18n.red}"},{"k_id":2,"k":"{i18n.size}","v_id":22,"v":"{i18n.small}"}]
 *   },
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":12,"v":"{i18n.blue}"},{"k_id":2,"k":"{i18n.size}","v_id":21,"v":"{i18n.big}"}]}
 *   {"skus":[{"k_id":1,"k":"{i18n.color}","v_id":12,"v":"{i18n.blue}"},{"k_id":2,"k":"{i18n.size}","v_id":22,"v":"{i18n.small}"}]}
 * ]
 */

ReactDOM.render(
    <p style={{fontSize: 14, color: '#333'}}>{i18n.viewCode}</p>
    , mountNode
);

```
