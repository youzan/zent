/**
 * 上传图片输入框
 */

import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Notify from 'notify';
import toArray from 'lodash/toArray';
import forEach from 'lodash/forEach';
import isPromise from 'utils/isPromise';
import { I18nReceiver as Receiver } from 'i18n';
import { Upload as I18nDefault } from 'i18n/default';

import { formatFileSize, base64ToArrayBuffer } from '../utils';
import fileType from '../utils/file-type';
import uploadLocalImage from './UploadLocal';
import { DEFAULT_ACCEPT } from '../constants';

const noop = res => res;

export default class FileInput extends (PureComponent || Component) {
  static defaultProps = {
    initIndex: 0,
    maxAmount: 0,
    silent: false,
    maxSize: 0,
    type: '',
    filterFiles: noop,
    onError: noop
  };

  static propTypes = {
    initIndex: PropTypes.number,
    maxAmount: PropTypes.number,
    silent: PropTypes.bool,
    maxSize: PropTypes.number,
    type: PropTypes.string,
    filterFiles: PropTypes.func,
    onError: PropTypes.func
  };

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

  processFiles = i18n => evt => {
    let files = toArray(evt.target.files);
    const { filterFiles, onError } = this.props;

    let filterResult = filterFiles(files);
    const iterator = this.iteratorFiles(i18n);
    if (isPromise(filterResult)) {
      filterResult.then(iterator, onError);
    } else {
      files = filterResult;
      iterator(files);
    }

    // 清除当前的值，否则选同一张图片不会触发事件
    evt.target.value = null;
  };

  iteratorFiles = i18n => files => {
    const { type, maxSize, silent, maxAmount, initIndex } = this.props;

    forEach(files, (file, index) => {
      if (maxAmount && index + initIndex >= maxAmount) {
        !silent && Notify.error(i18n.input.maxAmount({ maxAmount, type }));
        return false;
      }
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file, index, i18n);
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

  addFile(file, index, i18n) {
    let fileReader = new FileReader();
    let { silent, type, initIndex } = this.props;
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
    let { maxAmount } = this.props;
    let { accept } = this.state;

    return (
      <Receiver componentName="Upload" defaultI18n={I18nDefault}>
        {i18n => (
          <input
            type="file"
            placeholder={`${i18n.input.holder} +`}
            multiple={maxAmount !== 1}
            accept={accept}
            onChange={this.processFiles(i18n)}
          />
        )}
      </Receiver>
    );
  }
}
