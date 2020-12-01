import cn from 'classnames';

import Icon from '../../../icon';
import { IImageUploadFileItem } from '../../types';
import AbstractTrigger from '../AbstractTrigger';

class ImageUploadTrigger extends AbstractTrigger<IImageUploadFileItem> {
  render() {
    const { disabled } = this.props;
    return (
      <div
        className={cn('zent-image-upload-trigger', {
          ['zent-image-upload-trigger__disabled']: disabled,
        })}
        onClick={this.onClickTrigger}
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
