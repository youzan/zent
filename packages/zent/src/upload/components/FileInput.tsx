import * as React from 'react';
import { PureComponent } from 'react';
import toArray from 'lodash-es/toArray';
import { IFileInputProps } from '../types';

/**
 * 文件上传 Input 控件
 */
export default class FileInput extends PureComponent<IFileInputProps> {
  inputRef = React.createRef<HTMLInputElement>();

  open = () => {
    this.inputRef.current && this.inputRef.current.click();
  };

  /**
   * input onChange handler
   */
  private onFileInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    const files = toArray(evt.target.files);
    this.props.onChange(files);
  };

  private onFileInputClick = () => {
    // 清除当前的值，否则选同一个文件不会触发事件
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
    }
  };

  render() {
    const { remainAmount, accept, multiple, disabled } = this.props;

    const canContinueUpload = disabled || remainAmount === 0;
    const canMultiple = multiple && remainAmount > 1;

    return (
      <input
        className="zent-upload-file-input"
        hidden
        ref={this.inputRef}
        type="file"
        disabled={canContinueUpload}
        multiple={canMultiple}
        accept={accept}
        onClick={this.onFileInputClick}
        onChange={this.onFileInputChange}
      />
    );
  }
}
