import * as React from 'react';
import AbstractTrigger from '../AbstractTrigger';
import { IImageUploadFileItem } from '../../types';
import Icon from '../../../icon';

class ImageUploadTrigger extends AbstractTrigger<IImageUploadFileItem> {
  render() {
    return (
      <div
        className="zent-image-upload-trigger"
        onClick={this.clickFileInput}
        onDragOver={this.onTriggerDragOver}
        onDrop={this.onTriggerDrop}
      >
        <Icon type="plus" className="zent-image-upload-trigger-add-icon" />
        {this.renderFileInput()}
      </div>
    );
  }
}

export default ImageUploadTrigger;
