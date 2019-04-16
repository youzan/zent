---
order: 3
zh-CN:
	title: 无边框样式
	showBg: 底色
	panelOneTitle: 南歌子（暮春）
	panelOneContent: "紫陌寻春去，红尘拂面来。无人不道看花回。惟见石榴新蕊、一枝开。
	冰簟堆云髻，金尊滟玉醅。绿阴青子相催。留取红巾千点、照池台。"
	panelTwoTitle: 沁园春
	panelTwoContent: "孤馆灯青，野店鸡号，旅枕梦残。渐月华收练，晨霜耿耿，云山摛锦，朝露漙漙。世路无穷，劳生有限，似此区区长鲜欢。微吟罢，凭征鞍无语，往事千端。
当时共客长安。似二陆初来俱少年。有笔头千字，胸中万卷，致君尧舜，此事何难。用舍由时，行藏在我，袖手何妨闲处看。身长健，但优游卒岁，且斗尊前。"
	panelThreeTitle: 浣溪沙
	panelThreeContent: "缥缈红妆照浅溪。薄云疏雨不成泥。送君何处古台西。

废沼夜来秋水满，茂林深处晚莺啼。行人肠断草凄迷。"
en-US:
	title: No border
	showBg: Background
	panelOneTitle: A Lover's Complaint
	panelOneContent: "FROM off a hill whose concave womb reworded
A plaintful story from a sistering vale,
My spirits to attend this double voice accorded,
And down I laid to list the sad-tuned tale;
Ere long espied a fickle maid full pale,
Tearing of papers, breaking rings a-twain,
Storming her world with sorrow's wind and rain."
	panelTwoTitle: A Lover's Complaint
	panelTwoContent: "Upon her head a platted hive of straw,
Which fortified her visage from the sun,
Whereon the thought might think sometime it saw
The carcass of beauty spent and done:
Time had not scythed all that youth begun,
Nor youth all quit; but, spite of heaven's fell rage,
Some beauty peep'd through lattice of sear'd age."
	panelThreeTitle: A Lover's Complaint
	panelThreeContent: "Oft did she heave her napkin to her eyne,
Which on it had conceited characters,
Laundering the silken figures in the brine
That season'd woe had pelleted in tears,
And often reading what contents it bears;
As often shrieking undistinguish'd woe,
In clamours of all size, both high and low."
---

```jsx
import { Collapse } from 'zent';

class Simple extends React.Component {
	state = {
		activeKey: '1',
		bg: false,
	};

	handleChange = activeKey => {
		this.setState({
			activeKey,
		});
	};

	handleBgChange = bg => {
		this.setState({ bg });
	};

	render() {
		const { activeKey, bg } = this.state;
		const titleBg = bg ? 'default' : 'none';

		return (
			<>
				<div style={{ marginBottom: 20 }}>
					<Switch
						size="small"
						checked={this.state.bg}
						onChange={this.handleBgChange}
					/>
					<span> {i18n.showBg}</span>
				</div>
				<Collapse
					panelTitleBackground={titleBg}
					activeKey={activeKey}
					onChange={this.handleChange}
					bordered={false}
				>
					<Collapse.Panel title="{i18n.panelOneTitle}" key="1">
						{i18n.panelOneContent}
					</Collapse.Panel>
					<Collapse.Panel title="{i18n.panelTwoTitle}" key="2">
						{i18n.panelTwoContent}
					</Collapse.Panel>
					<Collapse.Panel title="{i18n.panelThreeTitle}" key="3">
						{i18n.panelThreeContent}
					</Collapse.Panel>
				</Collapse>
			</>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
