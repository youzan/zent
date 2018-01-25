/**
 * 上传图片弹框
 */

import React, { Component } from 'react';
import Button from 'button';
import Input from 'input';
import Select from 'select';
import FileInput from './FileInput';
import uploadLocalImage from './UploadLocal';
import UploadImageItem from './UploadImageItem';
import { initSortable, swapArray } from '../utils/sortable';
import { formatFileSize } from '../utils';

class UploadPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.options.categoryId,
      networkImage: props.networkImage,
      networkUploading: props.networkUploading,
      localUploading: props.localUploading,
      buttonText: props.i18n.popup.extract, // hacky
      localFiles: []
    };
    this.networkUrl = '';
    this.confirmNetworkUrl = this.confirmNetworkUrl.bind(this);
    this.networkUrlChanged = this.networkUrlChanged.bind(this);
    this.uploadLocalImages = this.uploadLocalImages.bind(this);
    this.fileProgressHandler = this.fileProgressHandler.bind(this);
    this.setCategoryId = this.setCategoryId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { categoryId } = nextProps.options;
    if (this.props.options.categoryId !== categoryId) {
      this.setState({
        categoryId
      });
    }
  }

  render() {
    let { prefix, options, className } = this.props;
    const { categoryList } = options;

    return (
      <div className={className}>
        <div className={`${prefix}-container`}>
          {categoryList.length > 0 && this.renderUploadGroup(this.props)}
          {!options.localOnly &&
            options.type !== 'voice' &&
            this.renderNetworkRegion(this.props)}
          {this.renderLocalUploadRegion(this.props)}
        </div>
        {this.renderFooterRegion()}
      </div>
    );
  }

  setCategoryId(evt, data) {
    this.setState({ categoryId: data.id });
  }

  /**
   * 渲染上传分组
   */
  renderUploadGroup(props) {
    let { prefix, i18n, options: { categoryList } } = props;
    const { categoryId } = this.state;
    return (
      <div className={`${prefix}-group-region`}>
        <div className={`${prefix}-title`}>{i18n.popup.group}：</div>
        <div className={`${prefix}-content`}>
          <Select
            width={300}
            autoWidth
            data={categoryList}
            value={categoryId}
            optionValue="id"
            optionText="name"
            onChange={this.setCategoryId.bind(this)}
          />
        </div>
      </div>
    );
  }

  /**
   * 网络图片渲染
   */
  renderNetworkRegion(props) {
    let { prefix, i18n } = props;
    let { networkImage, networkUploading, buttonText } = this.state;
    return (
      <div className={`${prefix}-network-image-region`}>
        <div className={`${prefix}-title`}>{i18n.popup.web}：</div>
        <div className={`${prefix}-content`}>
          <div className={`${prefix}-input-append`}>
            <Input
              type="text"
              placeholder={i18n.popup.holder}
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
    let { prefix, accept, options, i18n } = props;
    let { localFiles } = this.state;
    // 记录最后一项的索引
    let lastIndex = 0;
    let filesLength = localFiles.length;
    if (filesLength > 0) {
      // 保证新添加的都是在旧添加的文件后面
      lastIndex = localFiles[filesLength - 1].__uid + 1; // eslint-disable-line
    }
    return (
      <div className={`${prefix}-local-attachment-region`}>
        <div className={`${prefix}-title`}>
          {`${i18n.popup[`title_${options.type}`]}：`}
        </div>
        <div className={`${prefix}-content`}>
          <ul
            ref={this.onListRefChange}
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
                i18n={i18n}
                accept={accept}
                initIndex={lastIndex}
                onChange={this.handleChange}
              />
            </div>
          ) : (
            ''
          )}
          <div className={`${prefix}-local-tips c-gray`}>
            {i18n.popup.type({
              types: accept.replace(/image\/?|audio\/?/g, '').split(','),
              size: formatFileSize(options.maxSize)
            })}
          </div>
        </div>
      </div>
    );
  }

  renderFooterRegion() {
    const { localUploading, localFiles } = this.state;
    const { i18n } = this.props;
    return (
      <div className="text-center">
        <Button
          type="primary"
          size="large"
          disabled={localFiles.length === 0}
          loading={localUploading}
          onClick={this.uploadLocalImages}
        >
          {i18n.confirm}
        </Button>
      </div>
    );
  }

  handleMove = (fromIndex, toIndex) => {
    let { localFiles } = this.state;
    localFiles = swapArray(localFiles, fromIndex, toIndex);
    this.setState({
      localFiles: localFiles.map((item, index) => {
        // 拖拽移动以后重建索引
        item.__uid = index; // eslint-disable-line
        return item;
      })
    });
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
    let { localFiles, categoryId } = this.state;
    this.setState({
      localUploading: true
    });
    uploadLocalImage(options, {
      localFiles,
      categoryId,
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
    localFiles = localFiles.concat(files);
    // 根据索引进行排序，防止读取文件导致顺序错乱
    localFiles.sort((a, b) => (a.__uid > b.__uid ? 1 : -1)); // eslint-disable-line
    this.setState({
      localFiles
    });
  };

  /**
   * 提取网络图片
   */
  confirmNetworkUrl() {
    let { options, showUploadPopup, i18n } = this.props;
    const { categoryId } = this.state;

    if (!this.networkUrl) return false;
    this.setState({
      networkUploading: true,
      buttonText: i18n.popup.extracting
    });
    options.onFetch(this.networkUrl, categoryId).then(
      () => {
        this.setState({
          networkImage: {},
          networkUploading: false,
          buttonText: i18n.popup.extract
        });
        showUploadPopup(false);
      },
      () => {
        this.setState({
          networkUploading: false,
          buttonText: i18n.popup.extract
        });
      }
    );
  }

  onListRefChange = list => {
    if (list) {
      this.sortable = initSortable(list, this.handleMove);
    } else {
      this.sortable && this.sortable.destroy();
    }
  };
}

UploadPopup.defaultProps = {
  networkImage: {},
  networkUploading: false,
  buttonText: '',
  options: {},
  className: ''
};

export default UploadPopup;
