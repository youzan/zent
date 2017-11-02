---
title: Affix
subtitle: 固钉
path: component/affix
group: 导航
---

## Affix

used to fix the element in a specific area, it is common to fix navigation bar 

### demo

### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| offsetTop | emit when the offset is  specified at the top of the window | number | 0 | '' |
| offsetBottom | emit when the offset is  specified at the bottom of the window | number | null | null |
| onPin | execute callback function when affix emits | function | null | null |
| onUnpin | execute callback function when affix disappears | function | null | null |
| zIndex | affix z-index | number | 10 | null |
| className | 自定义额外类名  | string | `''`       |                                   |
| placeHoldClassName | 占位容器的类名  | string | `''`       |                                   |
| prefix    | 自定义前缀    | string | `'zent'`   |                                   |

如果 `offsetTop` 和 `offsetBottom` 同时设置，优先使用 `offsetBottom`

<style>
.demo-nav {
    width: 100%;
    height: 60px;
    background-color: #ededed;
    line-height: 60px;
    text-align: center;
    border: 1px solid #2B90ED;
}

.demo-bottom {
	opacity: 0.8;
}
</style>
