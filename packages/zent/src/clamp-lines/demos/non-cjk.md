---
order: 7
zh-CN:
	title: 如果正常不能分割的一串非CJK文本在一行展示不全，允许单词内折行。
en-US:
	title: Word breaking is allowed if a sequence of non-CJK characters is too long to display in one line.
---

```js
import { ClampLines } from 'zent';

ReactDOM.render(
	<div style={{ width: 160, color: '#666', fontSize: 14 }}>
		<ClampLines
			lines={3}
			popWidth={300}
			text="FirstWord SecondWordIsVeryLoooooooong thirdWord fourthWord"
		/>
	</div>
	, mountNode
);
```
