
---
order: 2
zh-CN:
	title: 通过 config 调整全局默认时间和挂载加点
	one: 调整持续时间为1s
	customContainer: 调整自定义渲染节点
	info: 常规提示
	success: 成功通知
	warn: 警告通知
	error: 错误通知
en-US:
	title: Adjust the global default duration and the render container through Notify.config
	one: Set global duration to 1s
	customContainer: Set render container to custom element node
	info: info
	success: success
	warn: warn
	error: error

---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.config({ duration: 1000 })}>{i18n.one}</Button>
		<Button onClick={() => Notify.config({ duration: 2000 })}>2s</Button>
		<Button onClick={() => Notify.config({ duration: 3000 })}>3s</Button>
		<Button onClick={() => Notify.config({ containerSelector: '#custom-container' })}>{i18n.customContainer}</Button>
		<div id="custom-container"></div>
		<br />
		<br />
		<Button onClick={() => Notify.info('{i18n.info}')}>{i18n.info}</Button>
		<Button onClick={() => Notify.success('{i18n.success}')}>{i18n.success}</Button>
		<Button onClick={() => Notify.warn('{i18n.warn}')}>{i18n.warn}</Button>
		<Button onClick={() => Notify.error('{i18n.error}')}>{i18n.error}</Button>
	</div>
	, mountNode
);

```
