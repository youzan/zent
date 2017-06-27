/**
 * 上传图片输入框
 */

import React, { PureComponent, Component } from 'react';
import uploadLocalImage from './UploadLocal';

export default class FileInput extends (PureComponent || Component) {
  onFileChange = evt => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(evt);
    } else {
      uploadLocalImage(this.props, evt);
    }
  };

  render() {
    const { maxAmount, accept } = this.props;

    return (
      <input
        type="file"
        placeholder="添加 +"
        multiple={maxAmount !== 1}
        accept={accept}
        onChange={this.onFileChange}
      />
    );
  }
}
