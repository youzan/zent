---
order: 7
zh-CN:
	title: 外部控制显示隐藏
	open: 打开
	close: 关闭
	content: 可以在 Pop 内部关闭
	btn: 外部关闭
en-US:
	title: Control visiblity from outside
	open: Open
	close: Close
	content: You can close Pop from inside
	btn: Close from outside
---

```jsx
import { Pop, Button } from 'zent';

class NoneTriggerDemo extends Component {
  state = {
    visible: false
  };

  close = () => {
    this.setState({
      visible: false
    });
  };

  open = () => {
    this.setState({
      visible: true
    });
  };

  render() {
	const content = (
	  <div>
	    <p style={{ marginBottom: 10 }}>{i18n.content}</p>
		<Button type="primary" onClick={this.close}>{i18n.close}</Button>
	  </div>
	);
    return (
      <div className="zent-doc-pop-none-trigger-container">
        <Pop
          content={content}
          trigger="none"
          visible={this.state.visible}
        >
          <Button type="primary" onClick={this.open}>{i18n.open}</Button>
        </Pop>
		<Button disabled={!this.state.visible} onClick={this.close}>{i18n.btn}</Button>
      </div>
    );
  }
}

ReactDOM.render(
	<NoneTriggerDemo />
	, mountNode
)
```

<style>
	.zent-doc-pop-none-trigger-container {
		.zent-pop-wrapper {
			margin-right: 10px;
		}
	}
</style>
