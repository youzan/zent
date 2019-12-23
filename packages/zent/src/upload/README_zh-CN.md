---
title: Upload
subtitle: 文件上传
path: component/upload
group: 数据
---

# Upload 文件上传

文件上传组件。

### API

#### Upload 公共参数

| 参数            | 说明                                                                                                              | 类型                                      | 默认值     | 是否必填 |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- | -------- |
| className       | 自定义类名                                                                                                        | string                                    |            | 否       |
| fileList        | 受控模式下使用的上传文件列表                                                                                      | `IUploadFileItem`                         |            | 否       |
| defaultFileList | 非受控模式下使用的默认文件列表                                                                                    | `IUploadFileItem`                         |            | 否       |
| onChange        | 上传内容发生变化时的回调函数，任何修改文件列表及其内容的行为都会触发该函数                                        | `IUploadOnChangeHandler`                  |            | 是       |
| beforeUpload    | 文件上传前的预处理函数，若返回 false 或 reject 的 Promie，则不上传该文件                                          | `(file: File) => boolean | Promise<void>` |            | 否       |
| skipUpload      | 是否跳过上传操作，若设置为 true，所有进度更新、上传成功失败、重试等数据更新都需要手动进行维护                     | boolean                                   | false            | 否       |
| onUpload        | 文件上传处理                                                                                                      | `IUploadOnUploadHandler`                  |            | 否       |
| onError         | 发生内部错误时的统一回调函数，错误类型见 `IUploadErrorMessageConfigMap`                                           | `IUploadOnErrorHandler`                   | 否         |
| multiple        | 是否支持文件多选                                                                                                  | boolean                                   | false      | 否       |
| maxSize         | 图片大小限制，单位为 byte，`Infinity` 为不限制                                                                    | number                                    | `Infinity` | 否       |
| maxAmount       | 图片数量限制，`Infinity` 为不限制                                                                                 | number                                    | `Infinity` | 否       |
| accept          | 可选文件类型，与 [input accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) 一致 | string                                    |            | 否       |
| disabled        | 是否禁用上传                                                                                                      | boolean                                   |            | 否       |
| sortable        | 是否可拖拽排序                                                                                                    | boolean                                   | false      | 否       |
| tips            | 提示文案                                                                                                          | string \| `IUploadTipsFunc`               |            | 否       |

#### Upload

| 参数         | 说明                         | 类型     | 默认值 | 是否必填 |
| ------------ | ---------------------------- | -------- | ------ | -------- |
| supportTypes | 覆盖提示文案中自动推导的格式 | string[] |        | 否       |
| pagination   | 是否对文件列表进行分页       | boolean  | false  | 否       |
| pageSize     | 分页时的每页展示数量         | number   | 5      | 否       |

#### ImageUpload

| 参数                | 说明                                                | 类型                                       | 默认值          | 是否必填 |
| ------------------- | --------------------------------------------------- | ------------------------------------------ | --------------- | -------- |
| preview             | 自定义点击图片时的展示逻辑                          | `IImageUploadPreviewHandler`               | PreviewImages   | 否       |
| getThumbSrcFromFile | 自定义选择图片时将其转化为展示用的缩略图 src 的函数 | `(file: File) => string | Promise<string>` | FileReader 实现 | 否       |

### 相关类型

#### IUploadFileItem

单个文件上传项对象

```ts
/** 通用文件上传项 */
interface IUploadFileItem {
	// 文件名称
	name: string;
	// 文件类型
	type: string;
	// 上传状态
	status: FILE_UPLOAD_STATUS;
	// 上传进度（上限为100）
	percent?: number;
}

/** 图片文件上传项，src 和 thunmSrc 至少需要提供一个用于缩略图显示 */
interface IImageUploadFileItem extends IUploadFileItem {
	src?: string;
	thumbSrc?: string;
}
```

#### IUploadOnChangeHandler

文件上传回调函数

```ts
// onChange 回调函数的 detail 参数类型
interface IUploadChangeDetail<UPLOAD_ITEM extends IUploadFileItem> {
	item: UPLOAD_ITEM;
	// 发生变化的类型
	type: 'change' | 'add' | 'delete' | 'retry';
}

type IUploadOnChangeHandler<UPLOAD_ITEM extends IUploadFileItem> = (
	list: UPLOAD_ITEM[],
	detail?: IUploadChangeDetail<UPLOAD_ITEM> // 拖拽排序操作触发的 onChange 不会有 detail 参数
) => void;
```

#### IUploadOnErrorHandler

错误回调函数的类型映射表，字段名为 onError 的 type 参数，对应的类型为 onError 的 data 参数类型

```ts
interface IUploadErrorMessageConfigMap {
	/** 文件大小超出限制 */
	overMaxSize: { maxSize: number };
	/** 选择文件数量超出限制 */
	overMaxAmount: { maxAmount: number };
}

type IUploadOnErrorHandler = <Type extends keyof IUploadErrorMessageConfigMap>(
	type: Type,
	data: IUploadErrorMessageConfigMap[Type]
) => void;
```

#### IImageUploadPreviewHandler

图片上传时的预览函数，默认使用 zent 的 `PreviewImages` 功能，且不展示上传失败的图片

```ts
type IImageUploadPreviewHandler = (
	file: IImageUploadFileItem,
	fileList: IImageUploadFileItem[]
) => void;
```
