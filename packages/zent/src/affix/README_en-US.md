---
title: Affix
path: component/affix
group: Navigation
---

## Affix

Used to fix the element in a specific area, it is common to fix navigation bar 

### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| offsetTop | trigger when the offset is  specified at the top of the viewport | number | 0 | '' |
| offsetBottom | trigger when the offset is  specified at the bottom of the viewport | number | null | null |
| onPin | execute callback  when affix trigger | function | null | null |
| onUnpin | execute callback when affix disappears | function | null | null |
| zIndex | affix z-index | number | 10 | null |
| className | custom extra class name  | string | `''`       |                                   |
| placeHoldClassName | position container class name  | string | `''`       |                                   |
| prefix    | custom prefix    | string | `'zent'`   |                                   |


If `offsetTop` and `offsetBottom` are both set , `offsetBottom` has higher priority.

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
