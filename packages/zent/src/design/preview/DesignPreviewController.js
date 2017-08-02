import React, { PureComponent, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import pick from 'lodash/pick';
import { DropTarget, DragSource } from 'react-dnd';

const COMPONENT = 'component';

class DesignPreviewController extends (PureComponent || Component) {
  static propTypes = {
    // 这个组件所在位置的下标
    index: PropTypes.number.isRequired,

    // 是否可以编辑，UMP里面有些地方config是不能编辑的
    editable: PropTypes.bool,

    // 组件是否可以拖拽
    dragable: PropTypes.bool,

    // 是否显示右下角的编辑区域
    configurable: PropTypes.bool,

    // 选中时是否高亮
    highlightWhenSelect: PropTypes.bool,

    // 当前是否选中
    isSelected: PropTypes.bool.isRequired,

    // 这个组件对应的值
    value: PropTypes.object.isRequired,

    // 选中的会掉函数
    onSelect: PropTypes.func.isRequired,

    // 编辑的回调函数
    onEdit: PropTypes.func.isRequired,

    // 添加新组件的回调函数
    onAdd: PropTypes.func.isRequired,

    // 删除组件的回调函数
    onDelete: PropTypes.func.isRequired,

    // 拖拽时移动组件的回调函数
    onMove: PropTypes.func.isRequired,

    // design 组件暴露的方法
    design: PropTypes.object.isRequired,

    // 用来渲染预览的组件
    component: PropTypes.func.isRequired,

    // 自定义配置
    globalConfig: PropTypes.object,

    // preview 额外的 props
    previewProps: PropTypes.object,

    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  render() {
    const {
      dragable,
      configurable,
      highlightWhenSelect,
      isSelected,
      isDragging,
      connectDragSource,
      connectDropTarget,
      component: PreviewComponent,
      previewProps,
      prefix
    } = this.props;
    const cls = cx(`${prefix}-design-preview-controller`, {
      [`${prefix}-design-preview-controller--selected`]: isSelected,
      [`${prefix}-design-preview-controller--highlight`]: highlightWhenSelect,
      [`${prefix}-design-preview-controller--dragable`]: dragable
    });
    const props = pick(this.props, ['value', 'design', 'globalConfig']);
    const style = {
      opacity: isDragging ? 0 : 1
    };
    const tree = (
      <div className={cls} style={style} onClick={this.onSelect}>
        <PreviewComponent prefix={prefix} {...previewProps} {...props} />
        {configurable &&
          <Actions
            prefix={prefix}
            onEdit={this.onEdit}
            onAdd={this.onAdd}
            onDelete={this.onDelete}
          />}
      </div>
    );

    if (!dragable) {
      return tree;
    }

    return connectDragSource(connectDropTarget(tree));
  }

  onSelect = evt => {
    const { editable } = this.props;
    if (!editable) {
      return;
    }

    this.invokeCallback('onSelect', evt, false);
  };

  onEdit = evt => {
    this.invokeCallback('onEdit', evt, true);
  };

  onAdd = evt => {
    this.invokeCallback('onAdd', evt, true);
  };

  onDelete = () => {
    this.invokeCallback('onDelete', null, true);
  };

  invokeCallback(action, evt, stopPropagation) {
    if (stopPropagation && evt) {
      evt.stopPropagation();
    }

    const { value } = this.props;
    const cb = this.props[action];
    cb && cb(value);
  }
}

const dndSource = {
  canDrag(props) {
    return props.dragable;
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

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

function Actions({ onEdit, onAdd, onDelete, prefix }) {
  return (
    <div className={`${prefix}-design-preview-controller__actions`}>
      <button
        onClick={onEdit}
        className={`${prefix}-design-preview-controller__action-btn`}
      >
        编辑
      </button>
      <button
        onClick={onAdd}
        className={`${prefix}-design-preview-controller__action-btn`}
      >
        加内容
      </button>
      <Pop
        content="确定删除？"
        trigger="click"
        position="left-center"
        centerArrow
        onConfirm={onDelete}
      >
        <button className={`${prefix}-design-preview-controller__action-btn`}>
          删除
        </button>
      </Pop>
    </div>
  );
}

/* eslint-disable new-cap, no-use-before-define */
export default DropTarget(COMPONENT, dndTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(COMPONENT, dndSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(DesignPreviewController)
);
/* eslint-enable new-cap, no-use-before-define */
