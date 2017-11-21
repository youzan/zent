import React, { PureComponent, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import Icon from 'icon';
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
        {configurable && (
          <Pop
            content="确定删除？"
            trigger="click"
            position="left-center"
            centerArrow
            onConfirm={this.onDelete}
            wrapperClassName={`${prefix}-design-preview-controller__action-btn-delete`}
          >
            <Icon onClick={evt => evt.stopPropagation()} type="close-circle" />
          </Pop>
        )}
        {configurable && (
          <a
            className={`${prefix}-design-preview-controller__action-btn-add`}
            onClick={this.onAdd}
          >
            <IconAdd prefix={prefix} />
          </a>
        )}
        {configurable && (
          <div className={`${prefix}-design-preview-controller__add-marker`}>
            <i
              className={`${prefix}-design-preview-controller__add-marker-circle`}
            />
            <div
              className={`${prefix}-design-preview-controller__add-marker-line`}
            />
          </div>
        )}
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

/* Exported from Sketch */
function IconAdd({ prefix }) {
  return (
    <svg
      width="24px"
      height="19px"
      viewBox="0 0 24 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-421.000000, -510.000000)">
          <g transform="translate(0.000000, -1.000000)">
            <g transform="translate(100.000000, 60.000000)">
              <g transform="translate(320.000000, 451.000000)">
                <path
                  d="M9,16.4282444 C10.6993072,18.0231466 12.9855754,19 15.5,19 C20.7467051,19 25,14.7467051 25,9.5 C25,4.25329488 20.7467051,0 15.5,0 C12.9855754,0 10.6993072,0.976853423 9,2.57175559 L9,2.5 L0.997899669,9.5 L9,16.5 L9,16.4282444 Z"
                  fill="#3388FF"
                  className={`${prefix}-design-preview-controller__icon-add`}
                />
                <g transform="translate(12.000000, 6.000000)" fill="#FFFFFF">
                  <path d="M3,3 L0,3 L0,4 L3,4 L3,7 L4,7 L4,4 L7,4 L7,3 L4,3 L4,0 L3,6.123234e-17 L3,3 Z" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
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
