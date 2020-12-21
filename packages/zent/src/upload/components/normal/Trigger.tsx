import cn from 'classnames';

import Icon from '../../../icon';
import { IUploadFileItem } from '../../types';
import AbstractTrigger from '../AbstractTrigger';

export default class NormalUploadTrigger extends AbstractTrigger<IUploadFileItem> {
  renderFileItemCount() {
    const { fileList, maxAmount } = this.props;
    if (maxAmount === Infinity) {
      return null;
    }
    return (
      <span className="zent-file-upload-trigger-text-count">
        {fileList?.length || 0}/{maxAmount}
      </span>
    );
  }

  render() {
    const { i18n, disabled, remainAmount } = this.props;

    const isDisabled = disabled || remainAmount <= 0;

    return (
      <div
        className={cn('zent-file-upload-trigger', {
          ['zent-file-upload-trigger__disabled']: isDisabled,
        })}
        onClick={this.onClickTrigger}
        onDragOver={this.onTriggerDragOver}
        onDrop={this.onTriggerDrop}
      >
        <Icon type="upload" className="zent-file-upload-trigger-icon" />
        <span className="zent-file-upload-trigger-text">
          {i18n.add}
          {this.renderFileItemCount()}
        </span>
        {this.renderFileInput()}
      </div>
    );
  }
}
