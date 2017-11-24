/**
 * 将文件的Byte转换为可读性更好的GB\MB\KB\B
 * @param  {number} size    大小，单位Byte
 * @param  {number} toFixed 保留几位小数，默认值为1
 * @return {string}         格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 MB'
 */
export function formatFileSize(size, toFixed) {
  size = +size || 0;

  if (typeof toFixed === 'undefined') {
    toFixed = 1;
  }

  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(toFixed)} GB`;
  } else if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(toFixed)} MB`;
  } else if (size >= 1024) {
    return `${(size / 1024).toFixed(toFixed)} KB`;
  }
  return `${size.toFixed(toFixed)} B`;
}

/**
 * 将持续时间格式化成适合阅读的字符串
 * @param  {number} duration 秒
 * @return {string}
 * @example
 * formatDuration(100) => '01:40'
 * formatDuration(10000) => '02:46:40'
 */
export function formatDuration(duration) {
  duration = Math.max(0, (+duration || 0).toFixed(0));

  let secondPart = duration % 60;
  let minutePart = ((duration - secondPart) / 60) % 60;
  let hourPart = (duration - minutePart * 60 - secondPart) / 3600;

  // 补零
  let padding = n => (n < 10 ? `0${n}` : n);

  let result = [padding(minutePart), padding(secondPart)];

  if (hourPart > 0) {
    result.unshift(padding(hourPart));
  }

  return result.join(':');
}

export function responseParse(file) {
  let {
    attachmentFullUrl,
    attachmentId,
    attachmentSize,
    attachmentTitle,
    attachmentUrl,
    categoryId,
    createTime,
    fileExt,
    isDelete,
    kdtId,
    mediaExpireTime,
    mediaId,
    mediaType,
    thumbUrl,
    ...rest
  } = file;
  return {
    attachment_file: attachmentUrl || file.attachment_file,
    attachment_full_url: attachmentFullUrl || file.attachment_full_url,
    attachment_id: `${attachmentId}` || file.attachment_id,
    attachment_size: `${attachmentSize}` || file.attachment_size,
    attachment_title: attachmentTitle || file.attachment_title,
    attachment_url: attachmentFullUrl || file.attachment_url,
    category_id: categoryId || file.category_id,
    create_time: createTime || file.create_time,
    file_ext: fileExt || file.file_ext,
    is_delete: `${isDelete}` || file.is_delete,
    kdt_id: `${kdtId}` || file.kdt_id,
    media_expire_time: mediaExpireTime || file.media_expire_time,
    media_id: `${mediaId}` || file.media_id,
    media_type: mediaType || file.media_type,
    thumb_file: attachmentUrl || file.thumb_file,
    thumb_url: thumbUrl || file.thumb_url,
    ...rest
  };
}

export function isPromiseLike(p) {
  if (!p) {
    return false;
  }

  const proto = Object.getPrototypeOf ? Object.getPrototypeOf(p) : p.__proto__; // eslint-disable-line
  return typeof proto.then === 'function';
}

export function base64ToArrayBuffer(base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export function createObjectURL(object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}
