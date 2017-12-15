---
order: 2
zh-CN:
	title: 基础用法
	onCopySuccess: 复制成功啦！
	customBtnText: 点我
en-US:
	title: Basic usage
	onCopySuccess: Copy successfully！
	customBtnText: Click！
---

```jsx
import { CopyButton, Button } from 'zent';

ReactDOM.render(
	<div>
		<CopyButton text="36a3ec36db8c3e1dfb43e098108cf3d4778c7135" onCopySuccess="{i18n.onCopySuccess}">
			<Button type="primary">{i18n.customBtnText}</Button>
		</CopyButton>
	</div>
	, mountNode);
```
