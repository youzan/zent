/**
 * 上传图片输入框
 */

import React from 'react';
import uploadLocalImage from './UploadLocal';

export default function FileInput(props) {
  return (
    <input
      type="file"
      placeholder="添加 +"
      multiple={props.maxAmount !== 1}
      accept={props.accept}
      onChange={props.onChange || uploadLocalImage.bind(this, props)}
    />
  );
}
