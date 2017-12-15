/**
 * 上传图片弹框
 */

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';

const ITEM = 'uploadImageItem';

class UploadImageItem extends (PureComponent || Component) {
  static propTypes = {
    // 组件所在位置的下标
    index: PropTypes.number.isRequired,
    // 是否可拖拽
    isDragable: PropTypes.bool.isRequired,
    // 删除组件的回调函数
    onDelete: PropTypes.func.isRequired,
    // 拖拽时移动组件的回调函数
    onMove: PropTypes.func.isRequired
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
    let {
      progress,
      src,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;

    let { hideDeleteIcon } = this.state;

    const style = {
      opacity: isDragging ? 0.3 : 1
    };

    const node = (
      <li
        className="upload-local-image-item"
        style={style}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
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

    return connectDragSource(connectDropTarget(node));
  }
}

const dndSource = {
  canDrag(props) {
    return props.isDragable;
  },

  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const dndTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const isInline = props.isInline;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (isInline) {
      if (
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY &&
        hoverClientX < hoverMiddleX
      ) {
        return;
      }
    } else if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (isInline) {
      if (
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY &&
        hoverClientX > hoverMiddleX
      ) {
        return;
      }
    } else if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

/* eslint-disable new-cap, no-use-before-define */
export default DropTarget(ITEM, dndTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ITEM, dndSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(UploadImageItem)
);
/* eslint-enable new-cap, no-use-before-define */
