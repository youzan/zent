## Swiper 幻灯片

幻灯片切换组件

### 使用指南

-  常用于一组平级内容的轮播展示

### 代码演示

:::demo 基础用法
```jsx
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
					dotsColor="primary"
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
:::

:::demo 带有左右箭头，自动切换
```jsx
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
					dotsColor="danger"
					dotsSize="small"
					arrows
					onChange={this.handleChange}
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
				<Swiper />
				{
					typeof current === 'number' && typeof prev === 'number' &&
						<div className="swiper-demo-simple-text">从{prev}到{current}</div>
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
:::

### API

| 参数             | 说明                          | 类型                | 默认值       		 | 备选值           							  			|
| --------------- | ---------------------------- | ------------------- | --------------- | ------------------------------------ |
| autoplay      	| 是否自动切换                   | bool                | `false`         | `false`, `true` 							  			|
| autoplayIterval | 自动切换间隔时间(ms) 						| number 							| `3000` 				  | 														   			 |
| dots 						| 是否显示下方翻页按钮 						 | bool 							 | `true` 				 | `true`, `false`                      |
| dotsColor       | 下方翻页按钮颜色                | string              | `'default'`     | `'primary'`, `'danger'`, `'success'` |
| dotsSize        | 下方翻页按钮大小                | string              | `'normal'`      | `'small'`, `'large'`                 |
| arrows          | 是否显示两侧翻页按钮             | bool                | `false`				 | `true`, `false`                      |
| onChange        | 切换时回调函数									 | func(current, prev) | `noop`          |                                      |

<style>
.swiper-demo-container {
	display: flex;
}
.swiper-demo-simple {
	height: 150px;
	width: 300px;
	background: #f2f2f2;
	margin-right: 10px;
}
.swiper-demo-simple-h {
	text-align: center;
	font-size: 18px;
	line-height: 150px;
}
.swiper-demo-simple-text {
	margin-top: 10px;
}
</style>
