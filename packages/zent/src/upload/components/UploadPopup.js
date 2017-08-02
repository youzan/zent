/**
 * 上传图片弹框
 */

import React, { Component } from 'react';
import Button from 'button';
import Input from 'input';
import Notify from 'notify';
import isPromise from 'utils/isPromise';

import FileInput from './FileInput';
import uploadLocalImage from './UploadLocal';
import { formatMaxSize } from '../utils';

const BUTTON_LOADING_TEXT = '提取中...';
const BUTTON_TEXT = '提取';

const ArrayForEach = Array.prototype.forEach;
const arraySlice = Array.prototype.slice;

class UploadPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkImage: props.networkImage,
      networkUploading: props.networkUploading,
      localUploading: props.localUploading,
      buttonText: props.buttonText,
      localFiles: []
    };
    this.networkUrl = '';
    this.confirmNetworkUrl = this.confirmNetworkUrl.bind(this);
    this.networkUrlChanged = this.networkUrlChanged.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.uploadLocalImages = this.uploadLocalImages.bind(this);
    this.fileProgressHandler = this.fileProgressHandler.bind(this);
  }

  /**
   * 网络图片渲染
   */
  renderNetworkRegion(props) {
    let { prefix } = props;
    let { networkImage, networkUploading, buttonText } = this.state;
    return (
      <div className={`${prefix}-network-image-region`}>
        <div className={`${prefix}-title`}>网络图片：</div>
        <div className={`${prefix}-content`}>
          <div className={`${prefix}-input-append`}>
            <Input
              type="text"
              placeholder="请添加网络图片地址"
              onChange={this.networkUrlChanged}
            />
          </div>
          <Button
            type="primary"
            outline
            loading={networkUploading}
            onClick={this.confirmNetworkUrl}
          >
            {buttonText}
          </Button>
          <div className={`${prefix}-image-preview`}>
            <img src={networkImage.attachment_url} alt="" role="presentation" />
          </div>
        </div>
      </div>
    );
  }

  /**
   * 本地图片
   */
  renderLocalImageRegion(props) {
    let { prefix, accept, options } = props;

    let { localFiles } = this.state;

    return (
      <div className={`${prefix}-local-image-region`}>
        <div className={`${prefix}-title`}>本地图片：</div>
        <div className={`${prefix}-content`}>
          <div>
            <ul className="image-list upload-local-image-list ui-sortable">
              {localFiles.map((item, index) => {
                return (
                  <li key={index} className="upload-local-image-item">
                    <div
                      className="image-box"
                      style={{
                        backgroundImage: `url(${item.src})`
                      }}
                    />
                    <span
                      className="close-modal small"
                      onClick={this.removeLocalImage.bind(this, item)}
                    >
                      ×
                    </span>
                    {item.progress
                      ? <div className="image-progress">{`${item.progress.toFixed(
                          1
                        )}%`}</div>
                      : ''}
                  </li>
                );
              })}
            </ul>
          </div>
          {!options.maxAmount || localFiles.length < options.maxAmount
            ? <div className={`${prefix}-add-local-image-button pull-left`}>
                +
                <FileInput {...props.options} onChange={this.processFiles} />
              </div>
            : ''}
          <div className={`${prefix}-local-tips c-gray`}>
            仅支持
            {accept.replace(/image\/?/g, '').replace(/, /g, '、')}
            三种格式, 大小不超过
            {formatMaxSize(options.maxSize)}
          </div>
        </div>
      </div>
    );
  }

  renderFooterRegion() {
    const { localUploading, localFiles } = this.state;
    return (
      <div className="text-center">
        <Button
          type="primary"
          size="large"
          disabled={localFiles.length === 0}
          loading={localUploading}
          onClick={this.uploadLocalImages}
        >
          确定
        </Button>
      </div>
    );
  }

  removeLocalImage(index) {
    let { localFiles } = this.state;
    localFiles.splice(index, 1);
    this.setState({
      localFiles
    });
  }

  uploadLocalImages() {
    let { options, showUploadPopup } = this.props;
    let { localFiles } = this.state;
    this.setState({
      localUploading: true
    });
    uploadLocalImage(options, {
      localFiles,
      onProgress: this.fileProgressHandler
    })
      .then(() => {
        this.setState({
          localFiles: [],
          localUploading: false
        });
        showUploadPopup(false);
      })
      .catch(() => {
        this.setState({
          localUploading: false
        });
      });
  }

  render() {
    let { prefix, options, className } = this.props;

    return (
      <div className={className}>
        <div className={`${prefix}-container`}>
          {!options.localOnly && this.renderNetworkRegion(this.props)}
          {this.renderLocalImageRegion(this.props)}
        </div>
        {this.renderFooterRegion()}
      </div>
    );
  }

  networkUrlChanged(evt) {
    this.networkUrl = evt.target.value;
  }

  iteratorFiles(files) {
    const { options } = this.props;
    const { maxSize, silent, maxAmount } = options;

    ArrayForEach.call(files, (file, index) => {
      if (maxAmount && index >= maxAmount) {
        !silent && Notify.error(`已经自动过滤超过${options.maxAmount}张的图片文件`);
        return false;
      }
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file);
      } else {
        !silent && Notify.error(`已经自动过滤大于${formatMaxSize(maxSize)}的图片文件`);
      }
    });
  }

  processFiles(evt) {
    const { options } = this.props;
    let files = arraySlice.call(evt.target.files);
    this.uploadFiles = files;

    let filterResult = options.filterFiles(files);
    if (isPromise(filterResult)) {
      filterResult.then(this.iteratorFiles, options.onError);
    } else {
      files = filterResult;
      this.iteratorFiles(files);
    }
  }

  fileProgressHandler(index, progress) {
    let { localFiles } = this.state;
    localFiles[index].progress = progress;
    this.setState(localFiles);
  }

  addFile(file) {
    let fileReader = new FileReader();
    let { localFiles } = this.state;

    fileReader.onload = e => {
      localFiles.push({
        src: e.target.result,
        file
      });
      this.setState({
        localFiles
      });
    };

    fileReader.readAsDataURL(file);
  }

  /**
   * 提取网络图片
   */
  confirmNetworkUrl() {
    let { options, showUploadPopup } = this.props;
    if (!this.networkUrl) return false;
    this.setState({
      networkUploading: true,
      buttonText: BUTTON_LOADING_TEXT
    });
    options.onFetch(this.networkUrl).then(
      () => {
        this.setState({
          networkImage: {},
          networkUploading: false,
          buttonText: BUTTON_TEXT
        });
        showUploadPopup(false);
      },
      () => {
        !options.silent && Notify.error('提取失败，请确认图片地址是否正确');
        this.setState({
          networkUploading: false,
          buttonText: BUTTON_TEXT
        });
      }
    );
  }
}

UploadPopup.defaultProps = {
  networkImage: {},
  networkUploading: false,
  buttonText: BUTTON_TEXT,
  options: {},
  className: ''
};

export default UploadPopup;
