---
order: 4
zh-CN:
	title: 动态增减子元素
	add: 增加
	remove: 移除
en-US:
	title: Dynamically add or remove child elements
	add: add
	remove: remove
---

```js
import { Swiper, Button } from 'zent';

class Simple extends React.Component {

	state = {
		pages: [1, 2, 3, 4, 5]
	}

	handleAddPage = () => {
		const { pages } = this.state;
		const lastItem = pages[pages.length - 1];
		console.log(lastItem);
		this.setState({
			pages: [...pages, lastItem + 1]
		});
	}

	handleRemovePage = () => {
		const { pages } = this.state;
		const newPages = pages.filter((item, index) => index !== pages.length - 1);
		this.setState({
			pages: newPages
		});
	}

	render() {
		const { pages } = this.state;
		return (
			<div>
				<Swiper
					className="swiper-demo-simple"
					dotsColor="#fc0"
					dotsSize="small"
					arrows
					autoplay
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
				<div style={{ marginTop: '20px' }}>
					<Button type="primary" onClick={this.handleAddPage}>{i18n.add}</Button>
					<Button type="primary" outline onClick={this.handleRemovePage}>{i18n.remove}</Button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
