---
title: Upload
subtitle: 文件上传
path: component/upload
group: 数据
---

# Upload 文件上传

文件上传，支持图片和音频。

### API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| type | 上传类型，默认为image，语音上传为voice | string | `'image'` | 否 |
| localOnly | 是否只支持本地图片 | boolean | `false` | 否 |
| tips | 提示文案 | string | `''` | 否 |
| maxSize | 图片大小限制，单位为 byte | number | `1024 * 1024` | 否 |
| maxAmount | 图片数量限制，0为不限制，1为只支持单文件 | number | `0` | 否 |
| accept | 支持文件类型 | string | `'image/gif, image/jpeg, image/png, image/bmp'` | 否 |
| silent | Deprecated, 是否开启静默模式，不会提示成功/失败 | boolean | `false` | 否 |
| triggerInline | 是否行内属性 | boolean | `false` | 否 |
| onFetch | 提取网络图片 | function | `noop` | 否 |
| onUpload | 上传本地图片 | function | `noop` | 否 |
| filterFiles | 过滤文件，支持同步和promise的方式 | function | `noop` | 否 |
| categoryList | 分组数据 | array | [] | 否 |
| categoryId | 分组id | number | [] | 否 |
| auto | 是否自动弹出 | boolean | `false` | 否 |
| withoutPopup | 是否不渲染在弹层上 | boolean | `false` | 否 |
| triggerClassName | 重写trigger样式 | string | `'zent-upload-trigger'` | 否 |
| errorMessages | 自定义错误提示文案，包含 overMaxSize、overMaxAmount、wrongMimeType 这几种类型 | object | `{}` | 否 |
| className | 扩展类名 | string | `''` | 否 |
| prefix | 前缀命名空间 | string | `'zent'` | 否 |
