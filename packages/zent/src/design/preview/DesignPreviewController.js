import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { Draggable } from 'react-beautiful-dnd';
import { DND_PREVIEW_CONTROLLER, DEFAULT_BACKGROUND } from './constants';
import { ADD_COMPONENT_OVERLAY_POSITION } from '../constants';

class DesignPreviewController extends PureComponent {
  static propTypes = {
    // 这个组件的唯一标示，不随位置变化而变化
    id: PropTypes.string.isRequired,

    // 组件的下标，-1 如果不可拖拽
    index: PropTypes.number,

    // 是否允许 hover 效果，不允许的话不会显示各种按钮
    // 拖拽的时候用
    allowHoverEffects: PropTypes.bool.isRequired,

    // 是否可以编辑，UMP里面有些地方config是不能编辑的
    editable: PropTypes.bool,

    // 组件是否可以拖拽
    dragable: PropTypes.bool,

    // 是否显示右下角的编辑区域
    configurable: PropTypes.bool,

    // 时候现实删除按钮
    canDelete: PropTypes.bool,

    // 是否吸纳事添加组件按钮
    canInsert: PropTypes.bool,

    // 选中时是否高亮
    highlightWhenSelect: PropTypes.bool,

    // 当前是否选中
    isSelected: PropTypes.bool.isRequired,

    // 这个组件对应的值
    value: PropTypes.object.isRequired,

    // Design 组件的全局配置
    settings: PropTypes.object,

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

    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
  };

  render() {
    const {
      dragable,
      configurable,
      editable,
      canDelete,
      canInsert,
      highlightWhenSelect,
      isSelected,
      component: PreviewComponent,
      previewProps,
      settings,
      prefix,
      id,
      index,
      allowHoverEffects,
    } = this.props;
    const props = pick(this.props, [
      'value',
      'design',
      'globalConfig',
      'settings',
    ]);
    const getClassName = highlight =>
      cx(`${prefix}-design-preview-controller`, {
        [`${prefix}-design-preview-controller--editable`]: editable,
        [`${prefix}-design-preview-controller--selected`]: isSelected,
        [`${prefix}-design-preview-controller--highlight`]: highlight,
        [`${prefix}-design-preview-controller--dragable`]: dragable,
      });

    const tree = dragable ? (
      <Draggable
        draggableId={id}
        type={DND_PREVIEW_CONTROLLER}
        isDragDisabled={!dragable}
        index={index}
      >
        {(provided, snapshot) => {
          // 拖拽的时候隐藏各种按钮，会很丑
          const showButtons =
            configurable && allowHoverEffects && !snapshot.isDragging;
          const cls = getClassName(allowHoverEffects && highlightWhenSelect);

          return (
            <div className={cls} onClick={this.onSelect}>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  backgroundColor: get(
                    settings,
                    'previewBackground',
                    DEFAULT_BACKGROUND
                  ),
                }}
                className={`${prefix}-design-preview-controller__drag-handle`}
              >
                <PreviewComponent
                  prefix={prefix}
                  {...previewProps}
                  {...props}
                />
              </div>
              {provided.placeholder}

              {showButtons &&
                canDelete && (
                  <DeleteButton prefix={prefix} onDelete={this.onDelete} />
                )}
              {showButtons &&
                canInsert && (
                  <AddButton
                    prefix={prefix}
                    onAdd={this.onPrepend}
                    className={`${prefix}-design-preview-controller__prepend`}
                  />
                )}
              {showButtons &&
                canInsert && (
                  <AddButton
                    prefix={prefix}
                    onAdd={this.onAppend}
                    className={`${prefix}-design-preview-controller__append`}
                  />
                )}
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

        {configurable &&
          canDelete && (
            <DeleteButton prefix={prefix} onDelete={this.onDelete} />
          )}
        {configurable &&
          canInsert && (
            <AddButton
              prefix={prefix}
              onAdd={this.onPrepend}
              className={`${prefix}-design-preview-controller__prepend`}
            />
          )}
        {configurable &&
          canInsert && (
            <AddButton
              prefix={prefix}
              onAdd={this.onAppend}
              className={`${prefix}-design-preview-controller__append`}
            />
          )}
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
  };

  onPrepend = evt => {
    this.invokeCallback('onAdd', evt, true, ADD_COMPONENT_OVERLAY_POSITION.TOP);
  };

  onAppend = evt => {
    this.invokeCallback(
      'onAdd',
      evt,
      true,
      ADD_COMPONENT_OVERLAY_POSITION.BOTTOM
    );
  };

  onDelete = () => {
    this.invokeCallback('onDelete', null, true);
  };

  invokeCallback(action, evt, stopPropagation, ...args) {
    if (stopPropagation && evt) {
      evt.stopPropagation();
    }

    const { value } = this.props;
    const cb = this.props[action];
    cb && cb(value, ...args);
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
      <IconDelete prefix={prefix} onClick={stopEventPropagation} />
    </Pop>
  );
}

function AddButton({ prefix, onAdd, className }) {
  return (
    <div
      className={cx(
        `${prefix}-design-preview-controller__action-btn-add-container`,
        className
      )}
    >
      <a
        className={`${prefix}-design-preview-controller__action-btn-add`}
        onClick={onAdd}
      >
        <IconAdd prefix={prefix} />
      </a>
      <AddMarker prefix={prefix} />
    </div>
  );
}

function AddMarker({ prefix }) {
  return (
    <div className={`${prefix}-design-preview-controller__add-marker`}>
      <i
        className={cx(
          `${prefix}-design-preview-controller__add-marker-circle`,
          `${prefix}-design-preview-controller__add-marker-circle--left`
        )}
      />
      <div className={`${prefix}-design-preview-controller__add-marker-line`} />
      <i
        className={cx(
          `${prefix}-design-preview-controller__add-marker-circle`,
          `${prefix}-design-preview-controller__add-marker-circle--right`
        )}
      />
    </div>
  );
}

function IconAdd({ prefix }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
      className={`${prefix}-design-preview-controller__icon-add`}
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="8.5" cy="8.5" r="8.5" />
        <path d="M8 8H5v1h3v3h1V9h3V8H9V5H8v3z" fill="#FFF" />
      </g>
    </svg>
  );
}

class IconDelete extends PureComponent {
  render() {
    const { prefix, onClick } = this.props;
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className={`${prefix}-design-preview-controller__icon-delete`}
        onClick={onClick}
      >
        <g fill="none" fillRule="evenodd">
          <circle cx="10" cy="10" r="10" />
          <path
            fill="#FFF"
            d="M13.75 7.188l-.937-.938L10 9.063 7.188 6.25l-.938.937L9.062 10 6.25 12.812l.937.938L10 10.938l2.812 2.812.938-.937L10.938 10"
          />
        </g>
      </svg>
    );
  }
}

function stopEventPropagation(evt) {
  evt && evt.stopPropagation();
}

export default DesignPreviewController;
