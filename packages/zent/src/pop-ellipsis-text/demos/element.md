---
order: 3
zh-CN:
	title: "传递带有样式的内联元素"
en-US:
	title: "Pass the inline-element with the style"
---

```jsx
import { Pop, Button, Input, PopEllipsisText } from 'zent';

ReactDOM.render(
	<div>
		<PopEllipsisText
			width={240}
			text={
				<span>
					冰糖5(<span style={{color: '#999'}}>钱</span>)，
					陈皮3(<span style={{color: '#999'}}>两</span>)，
					大枣2(<span style={{color: '#999'}}>枚</span>)，
					炙甘草8(<span style={{color: '#999'}}>分</span>)，
					当归2(<span style={{color: '#999'}}>两</span>)，
					人参8(<span style={{color: '#999'}}>钱</span>)。
					<span style={{color: '#f00'}}>日服三次，忌辛辣。</span>
				</span>
			}
			position='right-center'
		/>
	</div>
	, mountNode
)
```
