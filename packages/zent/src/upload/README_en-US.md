---
title: Upload
path: component/upload
group: Data Entry
---

# Upload

File uploader.

### API

#### Upload 公共参数

| Property        | Description                                                                                                               | Type                                      | Default    | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- | -------- |
| className       | Custom classname                                                                                                          | string                                    |            | No       |
| fileList        | The file list in controlled mode                                                                                          | `IUploadFileItem`                         |            | No       |
| defaultFileList | The default file list in uncontrolled mode                                                                                | `IUploadFileItem`                         |            | No       |
| onChange        | Callback when file list changed, any behavior change file list or content will emit it.                                   | `IUploadOnChangeHandler`                  |            | Yes      |
| beforeUpload    | The pre handler before file start upload, upload will be ignore when handler return false or a rejected Promise           | `(file: File) => boolean | Promise<void>` |            | No       |
| skipUpload      | Is skip onUpload emit step, if value is true, you should change file list data by yourself when upload event update       | boolean                                   | false      | No       |
| onUpload        | The file upload handler                                                                                                   | `IUploadOnUploadHandler`                  |            | No       |
| onError         | The unified callbak when some error happened, you can find detail in `IUploadErrorMessageConfigMap`                       | `IUploadOnErrorHandler`                   | No         |
| multiple        | Is support file multiple select                                                                                           | boolean                                   | false      | No       |
| maxSize         | The size limit of file, unit is byte，unlimited when value is `Infinity`                                                  | number                                    | `Infinity` | No       |
| maxAmount       | The count limit of files, unlimited when value is `Infinity`                                                              | number                                    | `Infinity` | No       |
| accept          | Allowed file types, same with [input accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string                                    |            | No       |
| disabled        | Is disable upload                                                                                                         | boolean                                   |            | No       |
| sortable        | Is allow sort file list                                                                                                   | boolean                                   | false      | No       |
| tips            | The tips content or generator                                                                                             | string \| `IUploadTipsFunc`               |            | No       |

#### Upload

| Property     | Description                                    | Type     | Default | Required |
| ------------ | ---------------------------------------------- | -------- | ------- | -------- |
| supportTypes | Cover the support type auto guess by component | string[] |         | No       |
| pagination   | Is paging file list                            | boolean  | false   | No       |
| pageSize     | The page size of pagination component          | number   | 5       | No       |

#### ImageUpload

| Property            | Description                                                            | Type                                       | Default              | Required |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------ | -------------------- | -------- |
| preview             | Custom preview handler when click image                                | `IImageUploadPreviewHandler`               | PreviewImages        | No       |
| getThumbSrcFromFile | Custom function to transform file to thumbSrc attribute of upload item | `(file: File) => string | Promise<string>` | FileReader implement | No       |

### Relation Types

#### IUploadFileItem

```ts
interface IUploadFileItem {
	name: string;
	type: string;
	status: FILE_UPLOAD_STATUS;
	percent?: number;
}

/** at least provide one of src or thunmSrc using in preview */
interface IImageUploadFileItem extends IUploadFileItem {
	src?: string;
	thumbSrc?: string;
}
```

#### IUploadOnChangeHandler

```ts
interface IUploadChangeDetail<UPLOAD_ITEM extends IUploadFileItem> {
	item: UPLOAD_ITEM;
	type: 'change' | 'add' | 'delete';
}

type IUploadOnChangeHandler<UPLOAD_ITEM extends IUploadFileItem> = (
	list: UPLOAD_ITEM[],
	detail?: IUploadChangeDetail<UPLOAD_ITEM>
) => void;
```

#### IUploadOnErrorHandler

Callback of onError, the field key is the type param, and the value type is the data param type.

```ts
interface IUploadErrorMessageConfigMap {
	overMaxSize: { maxSize: number };
	overMaxAmount: { maxAmount: number };
}

type IUploadOnErrorHandler = <Type extends keyof IUploadErrorMessageConfigMap>(
	type: Type,
	data: IUploadErrorMessageConfigMap[Type]
) => void;
```

#### IImageUploadPreviewHandler

Preview function using in ImageUpload, default use zent's `PreviewImages`, and don't preview the image failed.

```ts
type IImageUploadPreviewHandler = (
	file: IImageUploadFileItem,
	fileList: IImageUploadFileItem[]
) => void;
```
