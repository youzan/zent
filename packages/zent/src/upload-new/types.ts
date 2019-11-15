import { FILE_UPLOAD_STATUS } from './constants';

export type IErrorMessageConfig<Data> = string | ((data: Data) => string);
export type IFilterFilesFunc = (files: File[]) => File[] | Promise<File[]>;

export interface IUploadErrorMessageConfigMap {
  overMaxSize?: IErrorMessageConfig<{ maxSize: string }>;
  overMaxAmount?: IErrorMessageConfig<{ maxAmount: number }>;
}

export interface IUploadProps {
  fileList: IUploadFileItem[];
}

export interface IUploadFileItem {
  // browser file object properties
  name: string;
  size: number;
  type: string;

  // upload file object properties
  status: FILE_UPLOAD_STATUS; // 上传状态
  percent?: number; // 上传进度
}

export interface IUploadTriggerProps {
  fileList: IUploadFileItem[];
  accept: string;
  maxSize: number;
  maxAmount: number;
  addFileItems: (items: IUploadFileItem[]) => void;
  filterFiles?: IFilterFilesFunc;
}

export interface IFileInputProps {
  accept: string;
  // 剩余可上传文件数量
  remainAmount: number;
  onChange: (files: File[]) => void;
  filterFiles?: IFilterFilesFunc;
}
