---
order: 2
zh-CN:
	title: 自定义组件
	onCopySuccess: 复制成功啦！
	customBtnText: 点我
en-US:
	title: Customize usage
	onCopySuccess: Copied！
	customBtnText: Click！
---

```jsx
import { CopyButton, Button } from 'zent';

ReactDOM.render(
	<CopyButton text="customize usage" onCopySuccess="{i18n.onCopySuccess}">
		<Button type="primary">{i18n.customBtnText}</Button>
	</CopyButton>
	, mountNode);
```
