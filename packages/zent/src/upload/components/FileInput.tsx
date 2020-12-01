import { createRef, PureComponent } from 'react';
import { IFileInputProps } from '../types';

/**
 * 文件上传 Input 控件
 */
export default class FileInput extends PureComponent<IFileInputProps> {
  inputRef = createRef<HTMLInputElement>();

  open = () => {
    this.inputRef.current && this.inputRef.current.click();
  };

  /**
   * input onChange handler
   */
  private onFileInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.target.files) {
      const files = Array.from(evt.target.files);
      this.props.onChange(files);
    }
  };

  private onFileInputClick = () => {
    // 清除当前的值，否则选同一个文件不会触发事件
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
    }
  };

  render() {
    const { remainAmount, accept, multiple, disabled } = this.props;

    const isDisabled = disabled;
    const isMultiple = multiple && remainAmount > 1;

    return (
      <input
        hidden
        ref={this.inputRef}
        type="file"
        disabled={isDisabled}
        multiple={isMultiple}
        accept={accept}
        onClick={this.onFileInputClick}
        onChange={this.onFileInputChange}
      />
    );
  }
}
