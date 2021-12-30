---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Carousel } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {
	render() {
		return (
			<div className="carousel-demo-container">
				<Carousel className="carousel-demo-simple">
					{pages.map((item, index) => {
						return (
							<div className="carousel-demo-simple-h" key={index}>
								{item}
							</div>
						);
					})}
				</Carousel>
				<Carousel
					className="carousel-demo-simple"
					dotsColor="#31A896"
					dotsSize="small"
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
.carousel-demo-container {
	display: flex;
}
.carousel-demo-simple {
	height: 150px;
	width: 300px;
	background: #FAFAFA;
	margin-right: 10px;
}
.carousel-demo-simple-h {
	text-align: center;
	background: #CCC;
	font-family: Avenir-BlackOblique;
	font-size: 48px;
	color: #FFFFFF;
	line-height: 150px;
	font-weight: 900;	
}
.carousel-demo-simple-text {
	margin-top: 10px;
}
.carousel-demo-btn-group {
	margin-top: 20px;
}
.no-flex {
	display: block !important;
}
</style>
