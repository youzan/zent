---
order: 3
zh-CN:
	title: 两种指示器主题，`light`适用于浅色背景，`dark`适用于深色背景
en-US:
	title: There are two indicator themes, 'light' for light backgrounds and 'dark' for dark backgrounds
---

```js
import { Swiper } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {
	render() {
		return (
			<div className="swiper-demo-container">
				<Swiper className="swiper-demo-simple" autoplay>
					{pages.map((item, index) => {
						return (
							<div className="swiper-demo-simple-h" key={index}>
								{item}
							</div>
						);
					})}
				</Swiper>
				<Swiper
					className="swiper-demo-simple swiper-demo-simple--light"
					dotsTheme="light"
					autoplay
				>
					{pages.map((item, index) => {
						return (
							<div className="swiper-demo-simple-h" key={index}>
								{item}
							</div>
						);
					})}
				</Swiper>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
	.swiper-demo-simple--light .swiper-demo-simple-h {
		background: #f7f7f7;
		color: #ccc;
	}
</style>
