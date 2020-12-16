import cn from 'classnames';

import { IUploadFileItem } from '../../types';
import AbstractTrigger from '../AbstractTrigger';

export default class SingleUploadTrigger extends AbstractTrigger<IUploadFileItem> {
  render() {
    const { i18n, disabled } = this.props;

    return (
      <div
        className={cn('zent-single-upload-trigger', {
          ['zent-single-upload-trigger__disabled']: disabled,
        })}
        onClick={this.onClickTrigger}
        onDragOver={this.onTriggerDragOver}
        onDrop={this.onTriggerDrop}
      >
        <a className="zent-single-upload-trigger-text">{i18n.add}</a>
        {this.renderFileInput()}
      </div>
    );
  }
}
