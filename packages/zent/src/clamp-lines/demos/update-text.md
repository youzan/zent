---
order: 6
zh-CN:
	title: 主动更新文本内容
en-US:
	title: Parent node update the text
---

```js
import { ClampLines, Button } from 'zent';

const descriptionA = 'Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。';

const descriptionB = '有赞，是一个商家服务公司。我们帮助每一位重视产品和服务的商家私有化顾客资产、拓展互联网客群、提高经营效率，全面助力商家成功。我们致力于成为商家服务领域里最被信任的引领者；并持续作一个Enjoy的组织。';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false
		};
	}

	handleToggle = () => {
		this.setState({
			toggle: !this.state.toggle
		});
	}

	render() {
		const text = this.state.toggle ? descriptionA : descriptionB;
		return (
			<div>
				<div style={{ width: "50%", color: '#666', fontSize: 14 }}>
					<ClampLines
						lines={2}
						resizable
						popWidth={400}
						extra={(
							<a>更多</a>
						)}
						text={text}
					/>
				</div>
				<Button onClick={this.handleToggle}>切换文案</Button>
			</div>
		)
	}
}

ReactDOM.render(
	<Wrapper />
	, mountNode
);
```