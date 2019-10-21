/**
 * 上传图片组件
 * @author huangshiyu <huangshiyu@youzan.com>
 */
import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import identity from 'lodash-es/identity';

import Dialog from '../dialog';
import { I18nReceiver as Receiver } from '../i18n';
import Icon from '../icon';

import UploadPopup from './components/UploadPopup';
import FileInput from './components/FileInput';
import { DEFAULT_ACCEPT } from './constants';

const promiseNoop = () => new Promise(resolve => resolve([]));

export interface IUploadErrorMessage {
  overMaxSize?: string | ((data: { maxSize: string; type: string }) => string);
  overMaxAmount?:
    | string
    | ((data: { maxAmount: number; type: string }) => string);
  wrongMimeType?: string | ((data: { type: string }) => string);
}

export interface IUploadLocalFile {
  file: File;
  src: string;
  __uid: number;
}

export interface IUploadConfig {
  categoryId: number;
  localFiles: IUploadLocalFile[];
  onProgress: (progress: number, index: number) => void;
}

export interface IUploadProps {
  prefix?: string;
  className?: string;
  type?: 'image' | 'video';
  triggerClassName?: string;
  maxSize?: number;
  maxAmount?: number;
  accept?: string;
  tips?: string;
  localOnly?: boolean;
  auto?: boolean;
  filterFiles?: (files: File[]) => File[] | Promise<File[]>;
  onFetch?: (networkUrl: string, categoryId: number) => Promise<any>;
  onUpload?: (
    localFiles: IUploadLocalFile[],
    uploadConfig: IUploadConfig
  ) => void | Promise<any>;
  categoryList?: Array<{
    value: any;
    text: string | number;
  }>;
  categoryId?: number;
  errorMessages?: IUploadErrorMessage;
  triggerInline?: boolean;
  silent?: boolean;
  withoutPopup?: boolean;
  trigger?: React.ComponentType<any>;
}

export class Upload extends Component<IUploadProps, any> {
  static FileInput = FileInput;
  static defaultProps = {
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

  isUnmount: boolean;

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

    const { visible } = this.state;

    const Node = trigger;

    // 防止类名重复
    if (className === `${prefix}-upload`) {
      className = '';
    }

    const dialogClassName = classnames([`${prefix}-upload`, className]);

    className = classnames([
      dialogClassName,
      {
        inline: triggerInline,
      },
    ]);

    // 根据type设置accept默认值
    const accept = uploadOptions.accept || DEFAULT_ACCEPT[uploadOptions.type];

    return (
      <Receiver componentName="Upload">
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
            <React.Fragment>
              <div className={className}>
                <span
                  className={triggerClassName}
                  onClick={this.showUpload.bind(this, true)}
                >
                  {children || (Node && <Node />) || <Icon type="plus" />}
                  {uploadOptions.localOnly && uploadOptions.maxAmount === 1 && (
                    <FileInput {...uploadOptions} i18n={i18n} />
                  )}
                </span>
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
              <p className={`${prefix}-upload-tips`}>{tips}</p>
            </React.Fragment>
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
    const { localOnly, maxAmount } = this.props;

    if (!this.isUnmount && (!localOnly || maxAmount !== 1)) {
      // 直接打开本地文件
      this.setState({
        visible,
      });
    }
  };
}

export default Upload;
