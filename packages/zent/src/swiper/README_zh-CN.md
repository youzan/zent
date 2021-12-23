---
title: Swiper
subtitle: 轮播
path: component/swiper
group: 展示
---

## Swiper 轮播

以幻灯片的方式在页面中横向展示诸多内容的组件，轮播内容互相独立。

### 建议

- 在固定区域内展示一组平级内容时使用，常见内容为图片、视频和文本等；
- 轮播为左右水平方向进行切换；
- 默认开启自动播放，且保持循环轮播；

### 建议

- 当轮播内容为单个时，不允许展示指示器与切换箭头；

### API

**`children` 中的元素必须支持透传 `style` 到原生节点上，否则样式会失效。**

| 参数               | 说明                                 | 类型                                                   | 默认值     | 备选值                                                     |
| ------------------ | ------------------------------------ | ------------------------------------------------------ | ---------- | ---------------------------------------------------------- |
| transitionDuration | 切换动画持续时间(ms)                 | number                                                 | `300`      |                                                            |
| autoplay           | 是否自动切换                         | bool                                                   | `false`    | `false`, `true`                                            |
| autoplayInterval   | 自动切换间隔时间(ms)                 | number                                                 | `3000`     |                                                            |
| dots               | 是否显示下方翻页按钮及翻页按钮的样式 | bool \| `'round'` \| `'line'`                          | `true`     | `true`, `false`, `'round'`, `'line'`                       |
| dotsColor          | 下方翻页按钮颜色                     | string                                                 |            | `'black'`, `'blue'`, `'red'`, `'green'`, `自定义css颜色值` |
| dotsTheme          | 下方翻页按钮主题                     | string                                                 | `'dark'`   | `light`                                                    |
| dotsSize           | 下方翻页按钮大小                     | string                                                 | `'normal'` | `'small'`, `'large'`                                       |
| arrows             | 是否显示两侧翻页按钮                 | bool \| `'hover'`                                      | `false`    | `true`, `false`, `'hover'`                                 |
| arrowsType         | 两侧箭头颜色                         | string                                                 | `'dark'`   | `'dark'`, `'light'`                                        |
| arrowsSize         | 两侧箭头的大小                       | `'normal'` \| `'large'`                                | `'normal'` | `'normal'` \| `'large'`                                    |
| arrowsDisabled     | 是否禁用两侧箭头                     | `{ left?: bool, right?: bool }`                        | {}         |
| onChange           | 切换时回调函数                       | (current: number, prev: number): void                  | `noop`     |                                                            |
| renderPrevArrow    | 自定义渲染切换上一个的按钮           | `(onPrev: () => void, disabled: boolean) => ReactNode` | 默认按钮   |                                                            |
| renderNextArrow    | 自定义渲染切换下一个的按钮           | `(onNext: () => void, disabled: boolean) => ReactNode` | 默认按钮   |                                                            |
| className          | 自定义额外类名                       | string                                                 | `''`       |                                                            |

### 实例方法

| 方法名  | 说明               | 参数名 | 参数描述                       |
| ------- | ------------------ | ------ | ------------------------------ |
| swipeTo | 手动切换轮播图     | index  | 需要切换的轮播图索引,从 0 开始 |
| prev    | 切换至上一张轮播图 |        |                                |
| next    | 切换至下一张轮播图 |        |                                |

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
	background: #CCC;
	font-family: Avenir-BlackOblique;
	font-size: 48px;
	color: #FFFFFF;
	line-height: 150px;
	font-weight: 900;	
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
