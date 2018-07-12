import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Notify from 'notify';
import toArray from 'lodash/toArray';
import forEach from 'lodash/forEach';
import isPromise from 'utils/isPromise';
import { I18nReceiver as Receiver } from 'i18n';
import { Upload as I18nDefault } from 'i18n/default';

import {
  formatFileSize,
  base64ToArrayBuffer,
  formatErrorMessages,
} from '../utils';
import fileType from '../utils/file-type';
import uploadLocalImage from './UploadLocal';
import { UID_KEY, DEFAULT_ACCEPT } from '../constants';

const noop = res => res;

export default class FileInput extends PureComponent {
  static defaultProps = {
    initIndex: 0,
    maxAmount: 0,
    silent: false,
    maxSize: 0,
    type: '',
    filterFiles: noop,
    onError: noop,
  };

  static propTypes = {
    initIndex: PropTypes.number,
    maxAmount: PropTypes.number,
    silent: PropTypes.bool,
    maxSize: PropTypes.number,
    type: PropTypes.string,
    filterFiles: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    let { accept, type } = props;
    // 根据type设置accept默认值
    if (!accept) {
      accept = DEFAULT_ACCEPT[type];
    }

    this.state = {
      accept,
    };
  }

  onFileChange = localFiles => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(localFiles);
    } else {
      uploadLocalImage(this.props, {
        localFiles,
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
    const {
      type,
      maxSize,
      maxAmount,
      silent,
      initIndex,
      errorMessages,
    } = this.props;

    forEach(files, (file, index) => {
      if (maxAmount && index + initIndex >= maxAmount) {
        let message = formatErrorMessages(
          errorMessages.overMaxAmount,
          { maxAmount, type },
          i18n.input.maxAmount
        );
        !silent && message && Notify.error(message);
        return false;
      }
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file, index, i18n);
      } else {
        let message = formatErrorMessages(
          errorMessages.overMaxSize,
          {
            maxSize: formatFileSize(maxSize),
            type,
          },
          i18n.input.maxSize
        );
        !silent && message && Notify.error(message);
      }
    });
  };

  addFile(file, index, i18n) {
    let fileReader = new FileReader();
    let { type, initIndex, silent, errorMessages } = this.props;
    let { accept } = this.state;
    let localFiles = [];

    fileReader.onload = e => {
      const mimeType = fileType(
        base64ToArrayBuffer(e.target.result.replace(/^(.*?)base64,/, ''))
      );
      if (
        accept &&
        (!mimeType ||
          mimeType.mime.match(new RegExp(accept.replace(/, ?/g, '|'))))
      ) {
        localFiles.push({
          src: e.target.result,
          file,
          [UID_KEY]: initIndex + index,
        });
      } else {
        let message = formatErrorMessages(
          errorMessages.wrongMimeType,
          { type },
          i18n.input.type
        );
        !silent && message && Notify.error(message);
      }
      this.onFileChange(localFiles);
    };

    fileReader.readAsDataURL(file);
  }

  autoShowInput = fileInput => {
    let { maxAmount, auto } = this.props;
    if (
      auto &&
      maxAmount === 1 &&
      fileInput &&
      typeof fileInput.click === 'function'
    ) {
      fileInput.click();
    }
  };

  render() {
    let { maxAmount } = this.props;
    let { accept } = this.state;

    return (
      <Receiver componentName="Upload" defaultI18n={I18nDefault}>
        {i18n => (
          <input
            ref={this.autoShowInput}
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
