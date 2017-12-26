---
title: CopyButton
subtitle: 复制按钮
path: component/copy-btn
group: 数据
---

## CopyButton 复制按钮

复制按钮，点击后复制指定的文本到系统剪贴板中。

### 使用指南

- 当需要复制某些文本的时候，可以使用此组件
- 不依赖 Flash，所以在某些老版本浏览器上可能失败

### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| text        | 需要复制的文本                    | text   |     |
| onCopySuccess | 复制成功后的回调函数，如果是字符串则使用 `Notify.info` 提示    | function \| string  | `'复制成功'` |
| onCopyError   | 复制失败后的回调函数，如果是字符串则使用 `Notify.error` 提示     | function \| string  | `'复制失败'` |

