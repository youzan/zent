import previewImage from '../../preview-image';
import { FILE_UPLOAD_STATUS } from '../constants';
import { IImageUploadFileItem } from '../types';

/**
 * 默认获取缩略图方法
 */
export function defaultGetThumbSrcFromFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => resolve(fileReader.result as string);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
}

/**
 * 默认点击图片时的放大预览方法，排除上传失败的图片
 */
export function defaultPreview(
  file: IImageUploadFileItem,
  fileList: IImageUploadFileItem[]
) {
  const previeFiles = fileList.filter(
    item => item.status !== FILE_UPLOAD_STATUS.failed
  );
  const previewIndex = previeFiles.indexOf(file);
  previewImage({
    index: previewIndex,
    images: previeFiles.map(item => item.src || item.thumbSrc),
  });
}
