---
order: 2
zh-CN:
	title: 通过 config 调整全局默认时间
	one: 调整持续时间为1s
	success: 成功通知
	error: 错误通知
en-US:
	title: Adjust the global default duration through Notify.config
	one: Set global duration to 1s
	success: success
	error: error

---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.config({ duration: 1000 })}>{i18n.one}</Button>
		<Button onClick={() => Notify.config({ duration: 2000 })}>2s</Button>
		<Button onClick={() => Notify.config({ duration: 3000 })}>3s</Button>
		<br />
		<br />		
		<Button onClick={() => Notify.success('{i18n.success}')}>{i18n.success}</Button>
		<Button onClick={() => Notify.error('{i18n.error}')}>{i18n.error}</Button>
	</div>
	, mountNode
);

```
