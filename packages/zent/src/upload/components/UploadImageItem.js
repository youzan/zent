/**
 * 上传图片弹框
 */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class UploadImageItem extends (PureComponent || Component) {
  static propTypes = {
    // 组件所在位置的下标
    index: PropTypes.number.isRequired,
    // 删除组件的回调函数
    onDelete: PropTypes.func.isRequired
  };

  state = {
    hideDeleteIcon: false
  };

  handleRemove = () => {
    let { index, onDelete } = this.props;
    onDelete(index);
  };

  handleDragStart = () => {
    this.setState({
      hideDeleteIcon: true
    });
  };

  handleDragEnd = () => {
    this.setState({
      hideDeleteIcon: false
    });
  };

  render() {
    let { progress, src, index } = this.props;

    let { hideDeleteIcon } = this.state;

    return (
      <li
        className="upload-local-image-item"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        data-id={index}
      >
        <div
          className="image-box"
          style={{
            backgroundImage: `url(${src})`
          }}
        />
        {!hideDeleteIcon && (
          <span className="close-modal small" onClick={this.handleRemove}>
            ×
          </span>
        )}
        {progress && (
          <div className="image-progress">{`${progress.toFixed(1)}%`}</div>
        )}
      </li>
    );
  }
}

export default UploadImageItem;
