import { FILE_UPLOAD_STATUS } from './constants';

import { II18nLocaleUpload } from '../i18n';

// file item types
export interface IUploadFileItem {
  // browser file object properties
  name: string;
  type: string;

  // upload file object properties
  status: FILE_UPLOAD_STATUS; // 上传状态
  percent?: number; // 上传进度
}

export interface IImageUploadFileItem extends IUploadFileItem {
  // image extra attrs
  src?: string;
  thumbSrc?: string;
}

export type IUploadFileItemInner<
  UPLOAD_ITEM extends IUploadFileItem
> = UPLOAD_ITEM & {
  /** 判断上传文件的唯一id */
  _id?: string;
  /** 重试上传时的文件对象 */
  _file?: File;
};

// onChange types
export type IUploadOnChangeHandler<UPLOAD_ITEM extends IUploadFileItem> = (
  list: Array<IUploadFileItemInner<UPLOAD_ITEM>>,
  detail?: IUploadChangeDetail<UPLOAD_ITEM>
) => void;

export interface IUploadChangeDetail<UPLOAD_ITEM extends IUploadFileItem> {
  item: IUploadFileItemInner<UPLOAD_ITEM>;
  type: 'change' | 'add' | 'delete' | 'retry';
}

// onUpload types
export type IUploadOnUploadHandler<ON_UPLOAD_SUCCESS_RETURN = void> = (
  file: File,
  report: (percent: number) => void
) => Promise<ON_UPLOAD_SUCCESS_RETURN>;

// error types，错误类型映射表
export interface IUploadErrorMessageConfigMap {
  /** 文件大小超出限制 */
  overMaxSize: { maxSize: number; formattedMaxSize: string };
  /** 选择文件数量超出限制 */
  overMaxAmount: { maxAmount: number };
}

export type IUploadOnErrorHandler = <
  Type extends keyof IUploadErrorMessageConfigMap
>(
  type: Type,
  data: IUploadErrorMessageConfigMap[Type]
) => void;

// tips types
export type IUploadTipConfig<P> = P & {
  formattedMaxSize: string | null;
};

export type IUploadTipsFunc<PROPS> = (
  config: IUploadTipConfig<PROPS>
) => React.ReactNode;

// image upload types
export type IImageOnUploadSuccessReturn =
  | undefined
  | null
  | string
  | {
      src: string;
      thumbSrc: string;
    };

export type IImageUploadPreviewHandler = (
  file: IImageUploadFileItem,
  fileList: IImageUploadFileItem[]
) => void;

// react props
export interface IAbstractUploadProps<
  UPLOAD_ITEM extends IUploadFileItem,
  ON_UPLOAD_SUCCESS_RETURN = void
> {
  /** 自定义 className */
  className?: string;
  /** 上传组件文件列表 */
  fileList?: UPLOAD_ITEM[];
  /** 用于设置已上传的文件列表 */
  defaultFileList?: UPLOAD_ITEM[];
  /** 文件上传组件内容发生变化时的回调函数 */
  onChange: IUploadOnChangeHandler<UPLOAD_ITEM>;
  /** 文件上传前的处理函数，若返回 false 或 Promie.reject，则不上传该文件 */
  beforeUpload?: (file: File) => boolean | Promise<void>;
  /** 文件上传回调 */
  onUpload?: IUploadOnUploadHandler<ON_UPLOAD_SUCCESS_RETURN>;
  /** 发生内部错误时的统一回调函数，错误类型见 IUploadErrorMessageConfigMap */
  onError?: IUploadOnErrorHandler;
  /** 是否支持文件多选 */
  multiple?: boolean;
  /** 文件数量限制，Infinity 为无限制 */
  maxAmount?: number;
  /** 文件大小限制，Infinity 为无限制 */
  maxSize?: number;
  /** 可选文件类型 */
  accept?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否自动触发文件上传流程（即 onUpload 回调） */
  manualUpload?: boolean;
}

export interface IUploadProps extends IAbstractUploadProps<IUploadFileItem> {
  /** 提示文案 */
  tips?: string | IUploadTipsFunc<IUploadProps>;
  /** 是否展示分页信息 */
  pagination?: boolean;
  /** 分页大小 */
  pageSize?: number;
}

export interface IImageUploadProps
  extends IAbstractUploadProps<
    IImageUploadFileItem,
    IImageOnUploadSuccessReturn
  > {
  /** 提示文案 */
  tips?: string | IUploadTipsFunc<IImageUploadProps>;
  /** 点击图片展示时的回调 */
  preview?: IImageUploadPreviewHandler;
  /** 将图片文件转化为展示用的缩略图 src */
  getThumbSrcFromFile: (file: File) => string | Promise<string>;
}

export interface IAbstractUploadTriggerProps<
  UPLOAD_ITEM extends IUploadFileItem
> {
  i18n: II18nLocaleUpload;
  fileList: UPLOAD_ITEM[];
  disabled?: boolean;
  accept?: string;
  availableUploadItemsCount: number;
  remainAmount: number;
  maxSize: number;
  maxAmount: number;
  multiple?: boolean;
  onAddFile: (file: File) => void;
  onError: IUploadOnErrorHandler;
}

export interface IFileInputProps {
  accept?: string;
  disabled?: boolean;
  // 剩余可上传文件数量
  remainAmount: number;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

export interface IAbstractUploadListProps<UPLOAD_ITEM extends IUploadFileItem> {
  i18n: II18nLocaleUpload;
  fileList: UPLOAD_ITEM[];
  onRetry: (retryItem: IUploadFileItemInner<UPLOAD_ITEM>) => void;
  onDelete: (retryItem: IUploadFileItemInner<UPLOAD_ITEM>) => void;
  sortable?: boolean;
  onSortChange: (list: Array<IUploadFileItemInner<UPLOAD_ITEM>>) => void;
}

export interface IUploadListProps
  extends IAbstractUploadListProps<IUploadFileItem> {
  pagination: boolean;
  pageSize: number;
}

export interface IImageUploadListProps
  extends IAbstractUploadListProps<IImageUploadFileItem> {
  trigger: React.ReactNode;
  onPreview: IImageUploadPreviewHandler;
}

export interface IUploadItemProps<UPLOAD_ITEM extends IUploadFileItem> {
  item: IUploadFileItemInner<UPLOAD_ITEM>;
  i18n: II18nLocaleUpload;
  onRetry: IAbstractUploadListProps<UPLOAD_ITEM>['onRetry'];
  onDelete: IAbstractUploadListProps<UPLOAD_ITEM>['onDelete'];
}

export type INormalUploadItemProps = IUploadItemProps<IUploadFileItem>;

export type IImageUploadItemProps = IUploadItemProps<IImageUploadFileItem> & {
  onPreview: (file: IImageUploadFileItem) => void;
};
