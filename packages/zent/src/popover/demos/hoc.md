---
order: 4
zh-CN:
	title: withPopover 高阶组件
	click: 点击打开
	msg: 弹层内容
	close: 关闭
en-US:
	title: withPopover HOC
	click: Click to Open
	msg: Popover content
	close: Close
---

```jsx
import { Popover, Button } from 'zent';

const Content = Popover.withPopover(function Content({ popover }) {
  return (
    <div>
      <div>{i18n.msg}</div>
      <Button onClick={popover.close}>{i18n.close}</Button>
    </div>
  );
});

ReactDOM.render(
	<Popover 
		className="zent-doc-popover" 
		position={Popover.Position.BottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Click>
			<Button type="primary">{i18n.click}</Button>
		</Popover.Trigger.Click>
		<Popover.Content>
			<Content />
		</Popover.Content>
	</Popover>
	, mountNode
);
```
