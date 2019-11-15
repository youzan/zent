import * as React from 'react';
import { PureComponent } from 'react';
import toArray from 'lodash-es/toArray';
import constant from 'lodash-es/constant';
import isPromise from '../../utils/isPromise';
import { IFileInputProps } from '../types';

/**
 * 文件上传 Input 控件
 */
export default class FileInput extends PureComponent<IFileInputProps> {
  static defaultProps = {
    maxAmount: 0,
    maxSize: 0,
    filterFiles: constant,
  };

  inputRef = React.createRef<HTMLInputElement>();

  open = () => {
    this.inputRef.current && this.inputRef.current.click();
  };

  /**
   * input onChange handler
   */
  private onFileInputChange = () => (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = toArray(evt.target.files);
    const { filterFiles } = this.props;

    const filterResult = filterFiles(files);
    if (isPromise(filterResult)) {
      filterResult.then(this.props.onChange);
    } else {
      this.props.onChange(filterResult);
    }

    // 清除当前的值，否则选同一个文件不会触发事件
    evt.target.value = null;
  };

  render() {
    const { remainAmount, accept } = this.props;

    return (
      <input
        ref={this.inputRef}
        disabled={remainAmount === 0}
        type="file"
        multiple={remainAmount !== 1}
        accept={accept}
        onChange={this.onFileInputChange}
      />
    );
  }
}
