---
title: Swiper
subtitle: 轮播
path: component/swiper
group: 展示
---

## Swiper 轮播

Swiper 主要用于对一组平级内容进行轮播展示

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
| prev | 切换至上一张轮播图 |  |  |
| next | 切换至下一张轮播图 |  |  |

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
