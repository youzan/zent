/**
 * 上传图片输入框
 */

import React, { PureComponent, Component } from 'react';
import toArray from 'lodash/toArray';
import createObjectURL from 'utils/createObjectURL';

import uploadLocalImage from './UploadLocal';

export default class FileInput extends (PureComponent || Component) {
  onFileChange = evt => {
    const { onChange } = this.props;

    const files = toArray(evt.target.files);

    if (onChange) {
      onChange(files);
    } else {
      uploadLocalImage(this.props, {
        localFiles: files.map(f => ({ file: f, src: createObjectURL(f) }))
      });
    }

    // 清楚当前的值，否则选同一张图片不会触发事件
    evt.target.value = null;
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
