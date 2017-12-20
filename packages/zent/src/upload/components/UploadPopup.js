/**
 * 上传图片弹框
 */

import React, { Component } from 'react';
import Button from 'button';
import Input from 'input';
import Notify from 'notify';
import FileInput from './FileInput';
import uploadLocalImage from './UploadLocal';
import UploadImageItem from './UploadImageItem';
import { initSortable, swapArray } from '../utils/sortable';
import { formatFileSize } from '../utils';

const BUTTON_LOADING_TEXT = '提取中...';
const BUTTON_TEXT = '提取';

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

  // 上传图片列表
  renderLocalImage(item, index) {
    return (
      <UploadImageItem
        key={index}
        {...item}
        index={index}
        onDelete={this.handleDelete}
      />
    );
  }

  // 上传语音列表
  renderLocalVoice(item, index) {
    return (
      <li key={index} className="upload-local-voice-item voice-item">
        <div className="voice-icon" />
        <div className="voice-name">{item.file.name}</div>
        <div className="voice-createtime">{formatFileSize(item.file.size)}</div>
        <span
          className="close-modal small"
          onClick={this.handleDelete.bind(this, index)}
        >
          ×
        </span>
        {item.progress ? (
          <div className="voice-progress">{`${item.progress.toFixed(1)}%`}</div>
        ) : (
          ''
        )}
      </li>
    );
  }

  /**
   * 本地上传图片、语音
   */
  renderLocalUploadRegion(props) {
    let { prefix, accept, options } = props;
    let { localFiles } = this.state;
    return (
      <div className={`${prefix}-local-attachment-region`}>
        <div className={`${prefix}-title`}>
          本地{options.type === 'voice' ? '语音' : '图片'}：
        </div>
        <div className={`${prefix}-content`}>
          <ul
            ref={ref => {
              if (ref) {
                this.sortable = initSortable(ref, this.handleMove);
              } else {
                this.sortable && this.sortable.destroy();
              }
            }}
            className={`${options.type}-list upload-local-${options.type}-list`}
          >
            {localFiles.map((item, index) => {
              return options.type === 'voice'
                ? this.renderLocalVoice(item, index)
                : this.renderLocalImage(item, index);
            })}
          </ul>
          {!options.maxAmount || localFiles.length < options.maxAmount ? (
            <div className={`${prefix}-add-local-image-button pull-left`}>
              +
              <FileInput
                {...props.options}
                accept={accept}
                onChange={this.handleChange}
              />
            </div>
          ) : (
            ''
          )}
          <div className={`${prefix}-local-tips c-gray`}>
            仅支持{`${accept
              .replace(/image\/?|audio\/?/g, '')
              .replace(/, ?/g, '、')} ${accept.split(',').length}`}种格式, 大小不超过{formatFileSize(options.maxSize)}
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

  handleMove = (fromIndex, toIndex) => {
    let { localFiles } = this.state;
    this.setState({ localFiles: swapArray(localFiles, fromIndex, toIndex) });
  };

  handleDelete = index => {
    let { localFiles } = this.state;
    localFiles.splice(index, 1);
    this.setState({
      localFiles
    });
  };

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
          {!options.localOnly &&
            options.type !== 'voice' &&
            this.renderNetworkRegion(this.props)}
          {this.renderLocalUploadRegion(this.props)}
        </div>
        {this.renderFooterRegion()}
      </div>
    );
  }

  networkUrlChanged(evt) {
    this.networkUrl = evt.target.value;
  }

  fileProgressHandler(progress, index) {
    let { localFiles } = this.state;
    localFiles[index].progress = progress;
    this.setState(localFiles);
  }

  handleChange = files => {
    let { localFiles } = this.state;
    this.setState({
      localFiles: localFiles.concat(files)
    });
  };

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
