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

| Props          | Description                          | Type     | Default |
| -------------- | ---------------------------------------- | ------ | -------- |
| show           | Show loading                    | bool   | `false`  |
| float          | Remove from the normal document flow     | bool   | `false`   |
| height         | Available only when `float` is `false` | number | `160`    |
| zIndex         | `z-index` of loading            | number | `9998`   |
| className      | Custom classname                           | string | `''`     |
| containerClass | Custom classname of loading container      | string | `''`     |
| prefix         | Custom prefix                            | string | `'zent'` |
