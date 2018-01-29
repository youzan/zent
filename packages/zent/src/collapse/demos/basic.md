---
order: 1
zh-CN:
	title: 基础用法
	panelOneTitle: 南歌子（暮春）
	panelOneContent: "紫陌寻春去，红尘拂面来。无人不道看花回。惟见石榴新蕊、一枝开。冰簟堆云髻，金尊滟玉醅。绿阴青子相催。留取红巾千点、照池台。"
	panelTwoTitle: 沁园春
	panelTwoContent: "孤馆灯青，野店鸡号，旅枕梦残。渐月华收练，晨霜耿耿，云山摛锦，朝露漙漙。世路无穷，劳生有限，似此区区长鲜欢。微吟罢，凭征鞍无语，往事千端。

当时共客长安。似二陆初来俱少年。有笔头千字，胸中万卷，致君尧舜，此事何难。用舍由时，行藏在我，袖手何妨闲处看。身长健，但优游卒岁，且斗尊前。"
en-US:
	title: Basic usage
	panelOneTitle: one
	panelOneContent: one content
	panelTwoTitle: two
	panelTwoContent: two content
---

```jsx
import { Collapse } from 'zent';

class Simple extends React.Component {
	state = {
		activeKey: '1'
	};

	handleChange(activeKey) {
		this.setState({
			activeKey
		});
	}

	render() {
		const { activeKey } = this.state;
		return (
			<Collapse activeKey={activeKey} onChange={this.handleChange.bind(this)}>
				<Collapse.Panel title="{i18n.panelOneTitle}" key="1">{i18n.panelOneContent}</Collapse.Panel>
				<Collapse.Panel title="{i18n.panelTwoTitle}" key="2">{i18n.panelTwoContent}</Collapse.Panel>
				<Collapse.Panel title="33" key="3" disabled>foobar3</Collapse.Panel>
			</Collapse>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
