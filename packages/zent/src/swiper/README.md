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
			<Swiper
	    	className="swiper-demo-smiple"
	      dotsColor="danger"
	      dotsSize="small"
	    >
				{
					pages.map((item, index) => {
						return <div className="swiper-demo-smiple-h" key={index}>{item}</div>;
					})
				}
			</Swiper>
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
| transition      | 切换时的动画函数								| string              | `'ease-in-out'` | `transition-timing-function`      	 |
| dots 						| 是否显示下方翻页按钮 						 | bool 							 | `true` 				 | `true`, `false`                      |
| dotsColor       | 下方翻页按钮颜色                | string              | `'default'`     | `'primary'`, `'danger'`, `'success'` |
| dotsSize        | 下方翻页按钮大小                | string              | `'normal'`      | `'small'`, `'large'`                 |
| onChange        | 切换时回调函数									 | func(current, prev) | `noop`          |                                      |

<style>
.swiper-demo-smiple {
	height: 200px;
	width: 400px;
	background: #f2f2f2;
}
.swiper-demo-smiple-h {
	text-align: center;
	font-size: 18px;
	line-height: 180px;
}
</style>
