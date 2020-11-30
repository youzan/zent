---
title: Upload
path: component/upload
group: Data Entry
---

# Upload

File uploader.

### API

#### Common Props

| Property         | Description                                                                                                               | Type                                   | Default                | Required |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------- | -------- | --- |
| className        | Custom classname                                                                                                          | string                                 |                        | No       |
| beforeUpload     | The pre handler before file start upload, upload will be ignore when handler return false or a rejected Promise           | `(file: File) => boolean               | Promise<void>`         |          | No  |
| manualUpload     | Is control upload manually, if value is true, you should change file list data by yourself when upload event update       | boolean                                | false                  | No       |
| onUpload         | The file upload handler                                                                                                   | `IUploadOnUploadHandler`               |                        | No       |
| onError          | The unified callbak when some error happened, you can find detail in `IUploadErrorMessageConfigMap`                       | `IUploadOnErrorHandler`                | No                     |
| maxSize          | The size limit of file, unit is byte，unlimited when value is `Infinity`                                                  | number                                 | `Infinity`             | No       |
| accept           | Allowed file types, same with [input accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string                                 |                        | No       |
| disabled         | Is disable upload                                                                                                         | boolean                                |                        | No       |
| tips             | The tips content or generator                                                                                             | `React.ReactNode` \| `IUploadTipsFunc` |                        | No       |
| customUploadItem | Custom Upload display item                                                                                                | `React.ComponentType<IUploadFileItem   | IImageUploadFileItem>` |          | No  |

#### SingleUplaod

| Property | Description                                                    | Type                     | Default | Required |
| -------- | -------------------------------------------------------------- | ------------------------ | ------- | -------- |
| value    | upload item                                                    | IUploadFileItem          |         | No       |
| onChange | Callback when item changed, any behavior on item will emit it. | `IUploadOnChangeHandler` |         | Yes       |

#### Multi Common Props

| Property        | Description                                                                             | Type                                               | Default    | Required |
| --------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------- | -------- |
| fileList        | The file list in controlled mode                                                        | Array<`IUploadFileItem` \| `IImageUploadFileItem`> |            | No       |
| defaultFileList | The default file list in uncontrolled mode                                              | Array<`IUploadFileItem` \| `IImageUploadFileItem`> |            | No       |
| onChange        | Callback when file list changed, any behavior change file list or content will emit it. | `IUploadOnChangeHandler`                           |            | Yes      |
| multiple        | Is support file multiple select                                                         | boolean                                            | false      | No       |
| maxAmount       | The count limit of files, unlimited when value is `Infinity`                            | number                                             | `Infinity` | No       |
| sortable        | Is allow sort file list                                                                 | boolean                                            | false      | No       |

#### Upload

| Property   | Description                           | Type    | Default | Required |
| ---------- | ------------------------------------- | ------- | ------- | -------- |
| pagination | Is paging file list                   | boolean | false   | No       |
| pageSize   | The page size of pagination component | number  | 5       | No       |

#### ImageUpload

| Property            | Description                                                            | Type                         | Default                                | Required             |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------- | -------------------------------------- | -------------------- | --- |
| preview             | Custom preview handler when click image                                | `IImageUploadPreviewHandler` | PreviewImages( without failed images ) | No                   |
| getThumbSrcFromFile | Custom function to transform file to thumbSrc attribute of upload item | `(file: File) => string      | Promise<string>`                       | FileReader implement | No  |
