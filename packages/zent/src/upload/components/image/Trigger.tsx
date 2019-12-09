import * as React from 'react';
import AbstractTrigger from '../AbstractTrigger';
import { IImageUploadFileItem } from '../../types';

class ImageTrigger extends AbstractTrigger<IImageUploadFileItem> {
  renderFileItemCount() {
    const { availableUploadItemsCount, maxAmount } = this.props;
    if (!maxAmount) {
      return null;
    }
    return (
      <span className="zent-image-upload-trigger-text__count">
        {availableUploadItemsCount}/{maxAmount}
      </span>
    );
  }

  render() {
    const { i18n } = this.props;
    return (
      <div
        className="zent-image-upload-trigger"
        onClick={this.clickFileInput}
        onDragOver={this.onTriggerDragOver}
        onDrop={this.onTriggerDrop}
      >
        <span className="zent-image-upload-trigger-text">
          {i18n.normal.add} {this.renderFileItemCount()}
        </span>
        {this.renderFileInput()}
      </div>
    );
  }
}

export default ImageTrigger;
