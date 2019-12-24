import * as React from 'react';
import cn from 'classnames';
import AbstractTrigger from '../AbstractTrigger';
import { IImageUploadFileItem } from '../../types';
import Icon from '../../../icon';

class ImageUploadTrigger extends AbstractTrigger<IImageUploadFileItem> {
  render() {
    const { disabled } = this.props;
    return (
      <div
        className={cn('zent-image-upload-trigger', {
          ['zent-image-upload-trigger__disabled']: disabled,
        })}
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
