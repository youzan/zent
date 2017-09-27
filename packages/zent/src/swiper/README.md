## Swiper 轮播

轮播组件

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
						<div className="swiper-demo-simple-text">从{prev + 1}到{current + 1}</div>
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

:::demo 由外部控制轮播图切换
```jsx

import { Swiper, Button } from 'zent';

const pages = [1, 2, 3, 4, 5];

class Simple extends React.Component {

	go = (index) => {
		this.swiper.swipeTo(index);
	}

	prev = () => {
		this.swiper.prev();
	}

	next = () => {
		this.swiper.next();
	}

	render() {
		return (
			<div className="swiper-demo-container no-flex">
				<Swiper
					ref={(swiper) => this.swiper = swiper}
					className="swiper-demo-simple"
				>
					{
						pages.map((item, index) => {
							return <div className="swiper-demo-simple-h" key={index}>{item}</div>;
						})
					}
				</Swiper>
				<div className="swiper-demo-btn-group">
					{
						pages.map((item, index) => {
							return (
								<Button
									key={index}
									type="primary"
									onClick={() => this.go(index)}
								>
									{item}
								</Button>
							);
						})
					}
					<Button
						type="primary"
						outline
						onClick={() => this.prev()}>
						prev
					</Button>
					<Button
						type="primary"
						outline
						onClick={() => this.next()}>
						next
					</Button>
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
:::

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| transitionDuration | 切换动画持续时间(ms)            | number              | `300`            |                                               |
| autoplay      		 | 是否自动切换                   | bool                | `false`          | `false`, `true` 							  			         |
| autoplayInterval   | 自动切换间隔时间(ms) 					 | number 						 | `3000` 				  | 														   			          |
| dots 						   | 是否显示下方翻页按钮 						| bool 							  | `true` 				   | `true`, `false`                               |
| dotsColor          | 下方翻页按钮颜色                | string              | `'black'`        | `'blue'`, `'red'`, `'green'`, `自定义css颜色值` |
| dotsSize           | 下方翻页按钮大小                | string              | `'normal'`       | `'small'`, `'large'`                          |
| arrows             | 是否显示两侧翻页按钮             | bool                | `false`				   | `true`, `false`                               |
| arrowsType         | 两侧箭头颜色                    | string              | `'dark'`         | `'dark'`, `'light'`     						          |
| onChange           | 切换时回调函数									| (current: number, prev: number): void | `noop`           |                                               |
| className          | 自定义额外类名                  | string              | `''`						 |                                               |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |																			           |

### 实例方法
| 方法名 | 说明 | 参数名 | 参数描述 |
| ----------- | --------------------------------------- | ------ | ------ |
| swipeTo | 手动切换轮播图 | index | 需要切换的轮播图索引,从0开始 |
| prev | 切换至上一张轮播图 | 无 | 无 |
| next | 切换至下一张轮播图 | 无 | 无 |

<style>
.swiper-demo-container {
	display: flex;
}
.swiper-demo-simple {
	height: 150px;
	width: 300px;
	background: #FAFAFA;
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
.swiper-demo-btn-group {
	margin-top: 20px;
}
.no-flex {
	display: block !important;
}
</style>
