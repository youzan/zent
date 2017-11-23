import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import Icon from 'icon';
import pick from 'lodash/pick';
import { Draggable } from 'react-beautiful-dnd';
import { DND_PREVIEW_CONTROLLER } from './constants';

class DesignPreviewController extends (PureComponent || Component) {
  static propTypes = {
    // 这个组件的唯一标示，不随位置变化而变化
    id: PropTypes.string.isRequired,

    // 是否允许 hover 效果，不允许的话不会显示各种按钮
    // 拖拽的时候用
    allowHoverEffects: PropTypes.bool.isRequired,

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
      component: PreviewComponent,
      previewProps,
      prefix,
      id,
      allowHoverEffects
    } = this.props;
    const props = pick(this.props, ['value', 'design', 'globalConfig']);
    const getClassName = highlight =>
      cx(`${prefix}-design-preview-controller`, {
        [`${prefix}-design-preview-controller--selected`]: isSelected,
        [`${prefix}-design-preview-controller--highlight`]: highlight,
        [`${prefix}-design-preview-controller--dragable`]: dragable
      });

    const tree = dragable ? (
      <Draggable
        draggableId={id}
        type={DND_PREVIEW_CONTROLLER}
        isDragDisabled={!dragable}
      >
        {(provided, snapshot) => {
          // 拖拽的时候隐藏各种按钮，会很丑
          const showButtons =
            configurable && allowHoverEffects && !snapshot.isDragging;
          const onClick = evt => {
            if (provided.dragHandleProps) {
              provided.dragHandleProps.onClick(evt);
            }

            this.onSelect(evt);
          };
          const cls = getClassName(allowHoverEffects && highlightWhenSelect);

          return (
            <div className={cls} onClick={onClick}>
              <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                className={`${prefix}-design-preview-controller__drag-handle`}
                {...provided.dragHandleProps}
              >
                <PreviewComponent
                  prefix={prefix}
                  {...previewProps}
                  {...props}
                />
              </div>
              {provided.placeholder}

              {showButtons && (
                <DeleteButton prefix={prefix} onDelete={this.onDelete} />
              )}
              {showButtons && <AddButton prefix={prefix} onAdd={this.onAdd} />}
              {showButtons && <AddMarker />}
            </div>
          );
        }}
      </Draggable>
    ) : (
      <div
        className={getClassName(highlightWhenSelect)}
        onClick={this.onSelect}
      >
        <div
          className={cx(
            `${prefix}-design-preview-controller__drag-handle`,
            `${prefix}-design-preview-controller__drag-handle--inactive`
          )}
        >
          <PreviewComponent prefix={prefix} {...previewProps} {...props} />
        </div>

        {configurable && (
          <DeleteButton prefix={prefix} onDelete={this.onDelete} />
        )}
        {configurable && <AddButton prefix={prefix} onAdd={this.onAdd} />}
        {configurable && <AddMarker />}
      </div>
    );

    return tree;
  }

  onSelect = evt => {
    const { editable } = this.props;
    if (!editable) {
      return;
    }

    this.invokeCallback('onSelect', evt, false);
    // this.invokeCallback('onEdit', evt, true);
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

function DeleteButton({ prefix, onDelete }) {
  return (
    <Pop
      content="确定删除？"
      trigger="click"
      position="left-center"
      centerArrow
      onConfirm={onDelete}
      wrapperClassName={`${prefix}-design-preview-controller__action-btn-delete`}
    >
      <Icon onClick={stopEventPropagation} type="close-circle" />
    </Pop>
  );
}

function AddButton({ prefix, onAdd }) {
  return (
    <a
      className={`${prefix}-design-preview-controller__action-btn-add`}
      onClick={onAdd}
    >
      <IconAdd prefix={prefix} />
    </a>
  );
}

function AddMarker({ prefix }) {
  return (
    <div className={`${prefix}-design-preview-controller__add-marker`}>
      <i className={`${prefix}-design-preview-controller__add-marker-circle`} />
      <div className={`${prefix}-design-preview-controller__add-marker-line`} />
    </div>
  );
}

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

function stopEventPropagation(evt) {
  evt && evt.stopPropagation();
}

export default DesignPreviewController;
