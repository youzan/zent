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
| onChange | switch callback | (current: number, prev: number): void | `noop` | |
| className | custom classname | string | `''` | |
| prefix | custom prefix | string | `'zent'` | |

### Instance Methods

| Method Name | Instruction | Parameter | Parameter Description |
| ----------- | --------------------------------------- | ------ | ------ |
| swipeTo | manual switch the content | index | figure index, 0 based |
| prev | switch to the previous |  |  |
| next | switch to the next |  |  |

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
