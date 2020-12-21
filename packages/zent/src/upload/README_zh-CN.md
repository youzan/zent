---
title: Upload
subtitle: 文件上传
path: component/upload
group: 数据
---

# Upload 文件上传

文件上传组件。

### API

#### 公共参数

| 参数             | 说明                                                                                                              | 类型                                 | 默认值                 | 是否必填 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------- | -------- |
| className        | 自定义类名                                                                                                        | string                               |                        | 否       |
| beforeUpload     | 文件上传前的预处理函数，若返回 false 或 reject 的 Promie，则不上传该文件                                          | `(file: File) => boolean             | Promise<void>`         |          | 否  |
| manualUpload     | 是否手动进行上传操作，若设置为 true，所有进度更新、上传成功失败、重试等数据更新都需要手动进行维护                 | boolean                              | false                  | 否       |
| onUpload         | 文件上传处理                                                                                                      | `IUploadOnUploadHandler`             |                        | 否       |
| onError          | 发生内部错误时的统一回调函数，错误类型见 `IUploadErrorMessageConfigMap`                                           | `IUploadOnErrorHandler`              | 否                     |
| maxSize          | 图片大小限制，单位为 byte，`Infinity` 为不限制                                                                    | number                               | `Infinity`             | 否       |
| accept           | 可选文件类型，与 [input accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) 一致 | string                               |                        | 否       |
| disabled         | 是否禁用上传                                                                                                      | boolean                              |                        | 否       |
| tips             | 提示文案                                                                                                          | `React.ReactNode` \| `IUploadTipsFunc`          |                        | 否       |
| customUploadItem | 自定义上传项展示组件                                                                                              | `React.ComponentType<IUploadFileItem | IImageUploadFileItem>` |          | 否  |

#### SingleUplaod

| 参数     | 说明                                                               | 类型                     | 默认值 | 是否必填 |
| -------- | ------------------------------------------------------------------ | ------------------------ | ------ | -------- |
| value    | 上传文件值                                                         | IUploadFileItem          |        | 否       |
| onChange | 上传内容发生变化时的回调函数，任何修改文件状态的行为都会触发该函数 | `IUploadOnChangeHandler` |        | 是       |

#### 多项公共参数

| 参数            | 说明                                                                       | 类型                                               | 默认值     | 是否必填 |
| --------------- | -------------------------------------------------------------------------- | -------------------------------------------------- | ---------- | -------- |
| fileList        | 受控模式下使用的上传文件列表                                               | Array<`IUploadFileItem` \| `IImageUploadFileItem`> |            | 否       |
| defaultFileList | 非受控模式下使用的默认文件列表                                             | Array<`IUploadFileItem` \| `IImageUploadFileItem`> |            | 否       |
| onChange        | 上传内容发生变化时的回调函数，任何修改文件列表及其内容的行为都会触发该函数 | `IUploadOnChangeHandler`                           |            | 是       |
| multiple        | 是否支持文件多选                                                           | boolean                                            | false      | 否       |
| maxAmount       | 图片数量限制，`Infinity` 为不限制                                          | number                                             | `Infinity` | 否       |
| sortable        | 是否可拖拽排序                                                             | boolean                                            | false      | 否       |

#### Upload

| 参数       | 说明                   | 类型    | 默认值 | 是否必填 |
| ---------- | ---------------------- | ------- | ------ | -------- |
| pagination | 是否对文件列表进行分页 | boolean | false  | 否       |
| pageSize   | 分页时的每页展示数量   | number  | 5      | 否       |

#### ImageUpload

| 参数                | 说明                                                | 类型                         | 默认值                                | 是否必填        |
| ------------------- | --------------------------------------------------- | ---------------------------- | ------------------------------------- | --------------- |
| preview             | 自定义点击图片时的展示逻辑                          | `IImageUploadPreviewHandler` | PreviewImages（不展示上传失败的图片） | 否              |
| getThumbSrcFromFile | 自定义选择图片时将其转化为展示用的缩略图 src 的函数 | `(file: File) => string      | Promise<string>`                      | FileReader 实现 | 否  |
