
---
order: 8
zh-CN:
	title: 通过 config 调整全局挂载父节点
	name: 调整挂载父节点
  reset: 重置挂载父节点
	info: 常规提示
en-US:
	title: Adjust the global default container selector through Notify.config
	name: Set global container selector to custom
  reset: Reset global container selector config
	info: info

---

```jsx
import { Notify, Button } from 'zent';

const relativeStyle = {
	position: 'relative'
}

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.config({ containerSelector: '#global-custom-container' })}>{i18n.name}</Button>
		<Button onClick={() => Notify.config({ containerSelector: 'body' })}>{i18n.reset}</Button>
    <div id="global-custom-container" style={relativeStyle}></div>
		<br />
		<br />
		<Button onClick={() => Notify.info('{i18n.info}')}>{i18n.info}</Button>
	</div>
	, mountNode
);

```
