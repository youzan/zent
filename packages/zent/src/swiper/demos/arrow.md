---
order: 2
zh-CN:
	title: 带左右箭头, 自动切换
	from: 从
	to: 到
	arrows: 箭头
	hiddenArrows: 不显示
	showArrows: 显示
	hoverShowArrows: hover时显示
en-US:
	title: With Arrows, Switch Automaticly
	from: from
	to: to
	arrows: Arrows
	hiddenArrows: Hidden
	showArrows: Show
	hoverShowArrows: Appear When Hovered
---

```js
import { Carousel, Radio } from 'zent';

const pages = [1, 2, 3, 4, 5];

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Simple extends React.Component {
	state = {
		arrows: false,
	};

	handleChangeArrows = e => {
		this.setState({ arrows: e.target.value });
	};

	handleChangeArrowsSize = e => {
		this.setState({ arrowsSize: e.target.value });
	};

	render() {
		const { arrows } = this.state;
		return (
			<div>
				<p className="zent-carousel-demo__arrow-radio">
					{i18n.arrows}:
					<RadioGroup onChange={this.handleChangeArrows} value={arrows}>
						<RadioButton value={false}>{i18n.hiddenArrows}</RadioButton>
						<RadioButton value={true}>{i18n.showArrows}</RadioButton>
						<RadioButton value="hover">{i18n.hoverShowArrows}</RadioButton>
					</RadioGroup>
				</p>
				<div className="carousel-demo-container">
					<Carousel
						className="carousel-demo-simple"
						dotsSize="small"
						arrows={arrows}
						autoplay
					>
						{pages.map((item, index) => {
							return (
								<div className="carousel-demo-simple-h" key={index}>
									{item}
								</div>
							);
						})}
					</Carousel>
					<Carousel
						className="carousel-demo-simple carousel-demo-simple--large"
						dotsSize="small"
						arrows={arrows}
						arrowsSize="large"
						autoplay
					>
						{pages.map((item, index) => {
							return (
								<div className="carousel-demo-simple-h" key={index}>
									{item}
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
	.zent-carousel-demo__arrow-radio {
		margin-bottom: 16px;
	}

	.zent-radio-group {
		margin-left: 4px;
		margin-right: 12px;
	}
	.carousel-demo-simple.carousel-demo-simple--large {
		width: 624px;
		height: 256px;
	}
	.carousel-demo-simple.carousel-demo-simple--large .carousel-demo-simple-h {
		line-height: 256px;
		font-size: 70px;
	}
</style>
