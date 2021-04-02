---
order: 5
zh-CN:
	title: 自定义相对定位节点
	content: 相对目标节点定位的固钉
en-US:
	title:  Target node for positioning
	content: Affix relative to target node
---

```jsx
import { Affix, Button } from 'zent';

class Demo extends Component {
	containerRef = null;
	render() {
		return (
			<div
				className="affix-target__container"
				ref={ref => (this.containerRef = ref)}
			>
				<div className="affix-target__content">
					<Affix
						offsetBottom={20}
						offsetTop={20}
						getTarget={() => this.containerRef}
					>
						<Button>{i18n.content}</Button>
					</Affix>
				</div>
			</div>
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
