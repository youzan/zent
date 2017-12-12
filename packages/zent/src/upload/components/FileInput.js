/**
 * 上传图片输入框
 */

import React, { PureComponent, Component } from 'react';
import Notify from 'notify';
import toArray from 'lodash/toArray';
import forEach from 'lodash/forEach';
import isPromise from 'utils/isPromise';
import { formatFileSize, base64ToArrayBuffer } from '../utils';
import fileType from '../utils/file-type';
import uploadLocalImage from './UploadLocal';

const DEFAULT_ACCEPT = {
  image: 'image/gif, image/jpeg, image/png',
  voice: 'audio/mpeg, audio/amr'
};

export default class FileInput extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    let { accept, type } = props;
    // 根据type设置accept默认值
    if (!accept) {
      accept = DEFAULT_ACCEPT[type];
    }

    this.state = {
      accept
    };
  }

  onFileChange = localFiles => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(localFiles);
    } else {
      uploadLocalImage(this.props, {
        localFiles
      });
    }
  };

  processFiles = evt => {
    let files = toArray(evt.target.files);
    const { filterFiles, onError } = this.props;

    let filterResult = filterFiles(files);
    if (isPromise(filterResult)) {
      filterResult.then(this.iteratorFiles, onError);
    } else {
      files = filterResult;
      this.iteratorFiles(files);
    }

    // 清除当前的值，否则选同一张图片不会触发事件
    evt.target.value = null;
  };

  iteratorFiles = files => {
    const { type, maxSize, silent, maxAmount } = this.props;
    const typeName = type === 'voice' ? '语音' : '图片';

    forEach(files, (file, index) => {
      if (maxAmount && index >= maxAmount) {
        !silent && Notify.error(`已经自动过滤超过${maxAmount}张的${typeName}文件`);
        return false;
      }
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file);
      } else {
        !silent &&
          Notify.error(`已经自动过滤大于${formatFileSize(maxSize)}的${typeName}文件`);
      }
    });
  };

  addFile(file) {
    let fileReader = new FileReader();
    let { silent, type } = this.props;
    let { accept } = this.state;
    let localFiles = [];

    fileReader.onload = e => {
      const mimeType = fileType(
        base64ToArrayBuffer(e.target.result.replace(/^(.*?)base64,/, ''))
      );
      if (accept && (!mimeType || accept.indexOf(mimeType.mime) > -1)) {
        localFiles.push({
          src: e.target.result,
          file
        });
      } else {
        !silent &&
          Notify.error(`已经自动过滤类型不正确的${type === 'voice' ? '语音' : '图片'}文件`);
      }
      this.onFileChange(localFiles);
    };

    fileReader.readAsDataURL(file);
  }

  render() {
    let { maxAmount } = this.props;
    let { accept } = this.state;

    return (
      <input
        type="file"
        placeholder="添加 +"
        multiple={maxAmount !== 1}
        accept={accept}
        onChange={this.processFiles}
      />
    );
  }
}
