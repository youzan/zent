---
order: 4
zh-CN:
	title: 左右箭头禁用
en-US:
	title: Arrows Disabled
---

```js
import { Carousel } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {
	state = {
		current: 0,
	};

	handleChange = cur => {
		this.setState({ current: cur });
	};

	render() {
		const { current } = this.state;
		return (
			<div className="carousel-demo-container">
				<Carousel
					className="carousel-demo-simple"
					onChange={this.handleChange}
					arrows
					arrowsDisabled={{
						left: current === 0,
						right: current === pages.length - 1,
					}}
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
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
