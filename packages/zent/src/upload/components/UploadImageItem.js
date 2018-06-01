import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UploadImageItem extends PureComponent {
  static propTypes = {
    // 组件所在位置的下标
    index: PropTypes.number.isRequired,
    // 删除组件的回调函数
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    hideDeleteIcon: false,
  };

  handleRemove = () => {
    let { index, onDelete } = this.props;
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
    let { progress, src, index, prefix } = this.props;

    let { hideDeleteIcon } = this.state;

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
