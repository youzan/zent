/**
 * 上传图片组件
 * @author huangshiyu <huangshiyu@youzan.com>
 * @version v0.0.8
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import { Dialog } from 'zent';
import UploadPopup from './components/UploadPopup';
import FileInput from './components/FileInput';

const noop = res => res;

const promiseNoop = () =>
  new Promise(resolve => {
    resolve([]);
  });

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeId: 'materials'
    };
    this.showUpload = this.showUpload.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    if (this.props.auto) {
      this.showUpload();
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  closePopup() {
    this.setState({
      visible: false
    });
  }

  render() {
    let {
      trigger,
      prefix,
      className,
      triggerClassName,
      tips,
      children,
      inline,
      materials,
      ...uploadOptions
    } = this.props;

    let { visible } = this.state;

    let Node = trigger;

    // 防止类名重复
    if (className === `${prefix}-upload`) {
      className = '';
    }
    className = classnames([
      `${prefix}-upload`,
      {
        inline
      },
      className
    ]);

    return (
      <div className={className}>
        <div
          className={triggerClassName}
          onClick={this.showUpload.bind(this, true)}
        >
          {children || (Node && <Node />) || <span>+</span>}
          {uploadOptions.localOnly && uploadOptions.maxAmount === 1
            ? <FileInput {...uploadOptions} />
            : ''}
        </div>
        <p className={`${prefix}-upload-tips`}>{tips}</p>
        <Dialog
          title="图片选择"
          visible={visible}
          className={className}
          onClose={this.closePopup}
        >
          {this.renderUploadPopup(uploadOptions)}
        </Dialog>
      </div>
    );
  }

  /**
   * 显示上传图片弹框
   */
  renderUploadPopup(options) {
    const { prefix, accept, className } = this.props;
    return (
      <UploadPopup
        prefix={`${prefix}-upload`}
        options={options}
        accept={accept}
        className={className}
        showUploadPopup={this.showUpload}
      />
    );
  }

  /**
   * 设置弹框是否显示
   * @param [boolean] visible 是否显示弹框
   */
  showUpload = (visible = true) => {
    let { localOnly, maxAmount } = this.props;

    if (!localOnly || maxAmount !== 1) {
      // 直接打开本地文件
      this.setState({
        visible
      });
    }
  };
}

Upload.defaultProps = {
  prefix: 'zent',
  className: '',
  triggerClassName: 'zent-upload-trigger',
  maxSize: 1 * 1024 * 1024,
  maxAmount: 0,
  accept: 'image/gif, image/jpeg, image/png',
  tips: '',
  localOnly: false,
  auto: false,
  fetchUrl: '',
  tokenUrl: '',
  uploadUrl: '//upload.qbox.me',
  filterFiles: noop,
  onFetch: promiseNoop,
  onUpload: promiseNoop,
  inline: false,
  silent: false
};

export default Upload;
