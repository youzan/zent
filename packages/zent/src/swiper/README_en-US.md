---
title: Swiper
path: component/swiper
group: Data Display
---

## Swiper

Swiper is used for a group of flat content circulated.

### API

| Property | Description | Type | Default | Optional |
| -------- | ----------- | ---- | ------- | -------  |
| transitionDuration | switch animation duration(ms) | number | `300` |  |
| autoplay | switch automatically | bool | `false` | `true`|
| autoplayInterval | automatic switch interval(ms) | number | `3000` |  |
| dots| wether to show the page button below | bool | `true` | `false` |
| dotsColor | page button color | string | `'black'` | any css color value in string |
| dotsSize | page button size | string | `'normal'` | `'small'`, `'large'` |
| arrows | wether to show flip button on both sides | bool | `false` |  |
| arrowsType | flip button color | string | `'dark'` | `'dark'`, `'light'` |
| onChange | switch callback | (current: number, prev: number): void | `noop`           |                                               |
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
