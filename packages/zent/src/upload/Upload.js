/**
 * 上传图片组件
 * @author huangshiyu <huangshiyu@youzan.com>
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import identity from 'lodash/identity';

import Dialog from 'dialog';
import { I18nReceiver as Receiver } from 'i18n';
import { Upload as I18nDefault } from 'i18n/default';

import UploadPopup from './components/UploadPopup';
import FileInput from './components/FileInput';
import { DEFAULT_ACCEPT } from './constants';

const promiseNoop = () => new Promise(resolve => resolve([]));

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showUpload = this.showUpload.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    if (this.props.auto) {
      this.showUpload();
    }
    if (this.props.silent) {
      console.warn(
        'silent is deprecated, please use errorMessages to instead.'
      );
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  closePopup() {
    this.setState({
      visible: false,
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
      triggerInline,
      withoutPopup,
      ...uploadOptions
    } = this.props;

    let { visible } = this.state;

    let Node = trigger;

    // 防止类名重复
    if (className === `${prefix}-upload`) {
      className = '';
    }

    let dialogClassName = classnames([`${prefix}-upload`, className]);

    className = classnames([
      dialogClassName,
      {
        inline: triggerInline,
      },
    ]);

    // 根据type设置accept默认值
    const accept = uploadOptions.accept || DEFAULT_ACCEPT[uploadOptions.type];

    return (
      <Receiver componentName="Upload" defaultI18n={I18nDefault}>
        {i18n =>
          withoutPopup ? (
            <UploadPopup
              prefix={`${prefix}-upload`}
              options={uploadOptions}
              accept={accept}
              className={className}
              i18n={i18n}
              showUploadPopup={this.showUpload}
            />
          ) : (
            <div className={className}>
              <span
                className={triggerClassName}
                onClick={this.showUpload.bind(this, true)}
              >
                {children || (Node && <Node />) || <span>+</span>}
                {uploadOptions.localOnly &&
                  uploadOptions.maxAmount === 1 && (
                    <FileInput {...uploadOptions} i18n={i18n} />
                  )}
              </span>
              <p className={`${prefix}-upload-tips`}>{tips}</p>
              <Dialog
                title={i18n[`title_${this.props.type}`]}
                visible={visible}
                className={dialogClassName}
                onClose={this.closePopup}
              >
                <UploadPopup
                  prefix={`${prefix}-upload`}
                  options={uploadOptions}
                  accept={accept}
                  className={className}
                  i18n={i18n}
                  showUploadPopup={this.showUpload}
                />
              </Dialog>
            </div>
          )
        }
      </Receiver>
    );
  }

  /**
   * 设置弹框是否显示
   * @param [boolean] visible 是否显示弹框
   */
  showUpload = (visible = true) => {
    let { localOnly, maxAmount } = this.props;

    if (!this.isUnmount && (!localOnly || maxAmount !== 1)) {
      // 直接打开本地文件
      this.setState({
        visible,
      });
    }
  };
}

Upload.defaultProps = {
  prefix: 'zent',
  className: 'zent-upload',
  triggerClassName: 'zent-upload-trigger',
  maxSize: 1 * 1024 * 1024,
  maxAmount: 0,
  tips: '',
  localOnly: false,
  auto: false,
  type: 'image',
  filterFiles: identity,
  onFetch: promiseNoop,
  onUpload: promiseNoop,
  categoryList: [],
  categoryId: '',
  triggerInline: false,
  silent: false,
  withoutPopup: false,
  errorMessages: {},
};

Upload.FileInput = FileInput;

export default Upload;
