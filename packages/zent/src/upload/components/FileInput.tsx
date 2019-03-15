import * as React from 'react';
import { PureComponent } from 'react';
import toArray from 'lodash-es/toArray';
import forEach from 'lodash-es/forEach';
import isPromise from '../../utils/isPromise';
import { I18nReceiver as Receiver } from '../../i18n';
import Notify from '../../notify';

import {
  formatFileSize,
  base64ToArrayBuffer,
  formatErrorMessages,
} from '../utils';
import fileType from '../utils/file-type';
import uploadLocalImage from './UploadLocal';
import { UID_KEY, DEFAULT_ACCEPT } from '../constants';
import { IUploadErrorMessage } from '../Upload';

const noop = res => res;

export interface IUploadLocalFile {
  src: string;
  file: Blob;
  __uid: number;
}

export interface IFileInputProps {
  initIndex: number;
  maxAmount: number;
  silent: boolean;
  maxSize: number;
  type: string;
  auto?: boolean;
  filterFiles: (files: File[]) => File[] | Promise<File[]>;
  onError: () => void;
  onChange?: (files: IUploadLocalFile[]) => void;
  errorMessages?: IUploadErrorMessage;
  i18n: any;
}

export default class FileInput extends PureComponent<IFileInputProps, any> {
  static defaultProps = {
    initIndex: 0,
    maxAmount: 0,
    silent: false,
    maxSize: 0,
    type: '',
    filterFiles: noop,
    onError: noop,
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

    const filterResult = filterFiles(files);
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

  iteratorFiles = i18n => (files: File[]) => {
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
        const message = formatErrorMessages(
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
        const message = formatErrorMessages(
          errorMessages.overMaxSize,
          {
            maxSize: formatFileSize(maxSize),
            type,
          },
          i18n.input.maxSize
        );
        !silent && message && Notify.error(message);
      }

      return true;
    });
  };

  addFile(file, index, i18n) {
    const fileReader = new FileReader();
    const { type, initIndex, silent, errorMessages } = this.props;
    const { accept } = this.state;
    const localFiles = [];

    fileReader.onload = e => {
      const mimeType = fileType(
        base64ToArrayBuffer(
          (e.target as any).result.replace(/^(.*?)base64,/, '')
        )
      );
      if (
        accept &&
        (!mimeType ||
          mimeType.mime.match(new RegExp(accept.replace(/, ?/g, '|'))))
      ) {
        localFiles.push({
          src: (e.target as any).result,
          file,
          [UID_KEY]: initIndex + index,
        });
      } else {
        const message = formatErrorMessages(
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
    const { maxAmount, auto } = this.props;
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
    const { maxAmount } = this.props;
    const { accept } = this.state;

    return (
      <Receiver componentName="Upload">
        {(i18n: any) => (
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
