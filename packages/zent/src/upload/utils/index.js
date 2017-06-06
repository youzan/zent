export function formatMaxSize(size) {
  if (size < 1024) {
    return `${size}b`;
  } else if (size >= 1024 && size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)}K`;
  }
  return `${(size / 1024 / 1024).toFixed(0)}M`;
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
