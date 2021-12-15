---
order: 2
zh-CN:
	title: 带左右箭头, 自动切换
	from: 从
	to: 到
	arrows: 箭头
	arrowsSize: 箭头尺寸
	hiddenArrows: 不显示
	showArrows: 显示
	hoverShowArrows: hover时显示
	normalArrowsSize: 普通尺寸
	largeArrowsSize: 大尺寸
en-US:
	title: With Arrows, Switch Automaticly
	from: from
	to: to
	arrows: Arrows
	arrowsSize: Arrows Size
	hiddenArrows: Hidden
	showArrows: Show
	hoverShowArrows: Appear When Hovered
	normalArrowsSize: Normal Size
	largeArrowsSize: Large Size
---

```js
import { Swiper, Radio } from 'zent';

const pages = [1, 2, 3, 4, 5];

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Simple extends React.Component {

	state = {
		current: null,
		prev: null,
		arrows: false,
		arrowsSize: 'normal',
	}

	handleChange = (current, prev) => {
		this.setState({ current, prev });
	}

	handleChangeArrows = (e) => {
		this.setState({ arrows: e.target.value });
	}

	handleChangeArrowsSize = (e) => {
		this.setState({ arrowsSize: e.target.value });
	}

	render() {
		const { current, prev, arrows, arrowsSize } = this.state;
		return (
			<div>
				<p className="zent-swiper-demo__arrow-radio">
					{i18n.arrows}:
					<RadioGroup onChange={this.handleChangeArrows} value={arrows}>
						<RadioButton value={false}>{i18n.hiddenArrows}</RadioButton>
						<RadioButton value={true}>{i18n.showArrows}</RadioButton>
						<RadioButton value='hover'>{i18n.hoverShowArrows}</RadioButton>
					</RadioGroup>
					{i18n.arrowsSize}:
					<RadioGroup onChange={this.handleChangeArrowsSize} value={arrowsSize}>
						<RadioButton value='normal'>{i18n.normalArrowsSize}</RadioButton>
						<RadioButton value='large'>{i18n.largeArrowsSize}</RadioButton>
					</RadioGroup>
				</p>
				<Swiper
					className="swiper-demo-simple"
					dotsSize="small"
					arrows={arrows}
					arrowsSize={arrowsSize}
					autoplay
					onChange={this.handleChange}
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
				{
					typeof current === 'number' && typeof prev === 'number' &&
						<div className="swiper-demo-simple-text">{i18n.from} {prev + 1} {i18n.to} {current + 1}</div>
				}
			</div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```

<style>
	.zent-swiper-demo__arrow-radio {
		margin-bottom: 16px;
	}

	.zent-radio-group {
		margin-left: 4px;
		margin-right: 12px;
	}
</style>
