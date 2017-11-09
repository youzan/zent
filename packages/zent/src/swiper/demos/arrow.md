---
order: 2
zh-CN:
	title: 带左右箭头, 自动切换
	from: 从
	to: 到
en-US:
	title: With Arrows, Switch Automaticly
	from: from
	to: to
---

```js
import { Swiper } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {

	state = {
		current: null,
		prev: null
	}

	handleChange = (current, prev) => {
		this.setState({ current, prev });
	}

	render() {
		const { current, prev } = this.state;
		return (
			<div>
				<Swiper
					className="swiper-demo-simple"
					dotsColor="red"
					dotsSize="small"
					arrows
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
