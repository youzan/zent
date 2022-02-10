---
order: 3
zh-CN:
	title: 两种指示器主题，`light`适用于浅色背景，`dark`适用于深色背景
en-US:
	title: There are two indicator themes, 'light' for light backgrounds and 'dark' for dark backgrounds
---

```js
import { Carousel } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {
	render() {
		return (
			<div className="carousel-demo-container">
				<Carousel className="carousel-demo-simple" autoplay>
					{pages.map((item, index) => {
						return (
							<div className="carousel-demo-simple-h" key={index}>
								{item}
							</div>
						);
					})}
				</Carousel>
				<Carousel
					className="carousel-demo-simple carousel-demo-simple--light"
					dotsTheme="light"
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
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
	.carousel-demo-simple--light .carousel-demo-simple-h {
		background: #f7f7f7;
		color: #ccc;
	}
</style>
