---
order: 1
zh-CN:
	title: 基础用法
	customText: 自定义
	onCopySuccess: 复制成功！
	customBtnText: 自定义复制按钮
en-US:
	title: Basic usage
	customText: custom text
	onCopySuccess: Copy successfully！
	customBtnText: custom text
---

```jsx
import { CopyButton, Button } from 'zent';

ReactDOM.render(
	<div>
		<CopyButton text="{i18n.customText}" onCopySuccess="{i18n.onCopySuccess}">
			<Button type="primary">{i18n.customBtnText}</Button>
		</CopyButton>
	</div>
	, mountNode);
```
