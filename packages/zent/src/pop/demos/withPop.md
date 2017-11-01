---
order: 8
zh-CN:
	title: withPop 高阶组件
	content: Pop 内容
	open: 打开
	close: 关闭
en-US:
	title: withPop High Order Component
	content: Pop content
	open: Open
	close: Close
---

```jsx
import { Pop, Button } from 'zent';

// 点击close按钮可以关闭弹层
const Content = Pop.withPop(function Content({ pop }) {
  return (
    <div>
      <div>{i18n.content}</div>
      <Button onClick={pop.close}>{i18n.close}</Button>
    </div>
  );
});

ReactDOM.render(
	<Pop trigger="click" content={<Content />}>
		<Button type="primary">{i18n.open}</Button>
	</Pop>
	, mountNode
);
```
