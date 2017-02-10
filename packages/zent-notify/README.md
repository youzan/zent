# zent-notify

Notify用于展示各种操作成功或者失败时展示给用户的一些提示信息

## API

`Notify.error(text: node, duration: number)`

`Notify.success(text: node, duration: number)`

`Notify.clear()`


| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | notify通知文案 | node | '' |
| duration | 持续时间 | number | 3000 |
| callback | 自定义notify结束回调 | func | |
