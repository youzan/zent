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
import { DEFAULT_ACCEPT } from '../constants';

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
    const { type, maxSize, silent, maxAmount, i18n } = this.props;

    forEach(files, (file, index) => {
      if (maxAmount && index >= maxAmount) {
        !silent && Notify.error(i18n.input.maxAmount({ maxAmount, type }));
        return false;
      }
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file, index);
      } else {
        !silent &&
          Notify.error(
            i18n.input.maxSize({
              maxSize: formatFileSize(maxSize),
              type
            })
          );
      }
    });
  };

  addFile(file, index) {
    let fileReader = new FileReader();
    let { silent, type, initIndex, i18n } = this.props;
    let { accept } = this.state;
    let localFiles = [];

    fileReader.onload = e => {
      const mimeType = fileType(
        base64ToArrayBuffer(e.target.result.replace(/^(.*?)base64,/, ''))
      );
      if (accept && (!mimeType || accept.indexOf(mimeType.mime) > -1)) {
        localFiles.push({
          src: e.target.result,
          file,
          __uid: initIndex + index
        });
      } else {
        !silent && Notify.error(i18n.input.type({ type }));
      }
      this.onFileChange(localFiles);
    };

    fileReader.readAsDataURL(file);
  }

  render() {
    let { maxAmount, i18n } = this.props;
    let { accept } = this.state;

    return (
      <input
        type="file"
        placeholder={`${i18n.input.holder} +`}
        multiple={maxAmount !== 1}
        accept={accept}
        onChange={this.processFiles}
      />
    );
  }
}
