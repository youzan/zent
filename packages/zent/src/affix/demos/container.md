---
order: 5
zh-CN:
	title: 自定义相对定位节点
	content: 相对目标节点定位的固钉
en-US:
	title:  Container node for positioning
	content: Affix relative to container node
---

```jsx
import { Affix, Button, EventHandler } from 'zent';

class Demo extends Component {
	containerRef = React.createRef();
	affixRef = React.createRef();
	scrollContainer = document.querySelector('.page-content');

	onSrcoll = () => {
		this.affixRef?.current?.updatePosition();
	};

	render() {
		return (
			<>
				<div
					className="affix-target__container"
					ref={this.containerRef}
				>
					<div className="affix-target__content">
						<Affix
							ref={this.affixRef}
							offsetTop={20}
							offsetBottom={20}
							getAffixContainer={() => this.containerRef.current}
						>
							<Button>{i18n.content}</Button>
						</Affix>
					</div>
				</div>
				<EventHandler target={this.scrollContainer} eventName="scroll" listener={this.onSrcoll} />
			</>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
    .affix-target__container{
        height: 150px;
        overflow-y: auto;
    }

    .affix-target__content {
        background: rgba(0, 0, 0, 0.1);
        padding-top: 150px;
        height: 200px;
    }
</style>
