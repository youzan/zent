---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Swiper } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {
	render() {
		return (
			<div className="swiper-demo-container">
				<Swiper
					className="swiper-demo-simple"
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
				<Swiper
					className="swiper-demo-simple"
					dotsColor="#31A896"
					dotsSize="small"
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
			</div>

		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
