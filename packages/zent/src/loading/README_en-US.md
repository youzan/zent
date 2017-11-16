---
title: Loading
path: component/loading
group: Feedback
---

## Loading

Loading is used for indicate loading state of section.

### Guides

-  You can use this component to reduce users' anxiety when the page is rendering or some data is loaded asynchronously.

### API

| Props             | Description                                                     | Type     | Default |
| -------------- | ------------------------------------------------------ | ------ | -------- |
| show           | display control switch                                                   | bool   | `false`  |
| float         | Whether from the document flow, set to `true` in global mode        | bool   | `false`   |
| height       | set height when `float` prop is `false` | number | `160`    |
| zIndex         | set z-index property of loading                                          | number | `9998`   |
| className      | custom classname                           | string | `''`     |
| containerClass | custom classname of wrapper                                     | string | `''`     |
| prefix         | custom prefix                            | string | `'zent'` |
