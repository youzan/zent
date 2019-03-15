import * as React from 'react';
import { PureComponent } from 'react';

export interface IUploadImageItemProps {
  index: number;
  onDelete(index: number): void;
  prefix: string;
  src: string;
  progress?: number;
}

export class UploadImageItem extends PureComponent<IUploadImageItemProps> {
  state = {
    hideDeleteIcon: false,
  };

  handleRemove = () => {
    const { index, onDelete } = this.props;
    onDelete(index);
  };

  handleDragStart = () => {
    this.setState({
      hideDeleteIcon: true,
    });
  };

  handleDragEnd = () => {
    this.setState({
      hideDeleteIcon: false,
    });
  };

  render() {
    const { progress, src, index, prefix } = this.props;

    const { hideDeleteIcon } = this.state;

    return (
      <li
        className={`${prefix}-image-item`}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        data-id={index}
      >
        <div
          className={`${prefix}-image-item__box`}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        {!hideDeleteIcon && (
          <span
            className={`${prefix}__close-modal`}
            onClick={this.handleRemove}
          >
            ×
          </span>
        )}
        {progress && (
          <div
            className={`${prefix}-image-item__progress`}
          >{`${progress.toFixed(1)}%`}</div>
        )}
      </li>
    );
  }
}

export default UploadImageItem;
