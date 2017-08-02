import React, { PureComponent, Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import defaultTo from 'lodash/defaultTo';
import isFunction from 'lodash/isFunction';

import DesignPreviewItem from './DesignPreviewItem';
import DesignPreviewController from './DesignPreviewController';
import DesignEditorItem from '../editor/DesignEditorItem';
import DesignEditorAddComponent from '../editor/DesignEditorAddComponent';
import { isExpectedDesginType } from '../utils/design-type';

/**
 * DesignPreview 和 config 组件是相互关联的
 *
 * 这个组件里的一些 props 是需要 config 组件提供的
 */
class DesignPreview extends (PureComponent || Component) {
  // All props in this component are injected by Design
  static propTypes = {
    className: PropTypes.string,

    prefix: PropTypes.string,

    design: PropTypes.object.isRequired,

    components: PropTypes.array.isRequired,

    value: PropTypes.array.isRequired,

    appendableComponents: PropTypes.array,

    showAddComponentOverlay: PropTypes.bool.isRequired,

    selectedUUID: PropTypes.string,

    getUUIDFromValue: PropTypes.func.isRequired,

    onSelect: PropTypes.func.isRequired,

    // 处理添加按钮的回调函数
    onAdd: PropTypes.func.isRequired,

    // 添加新组件
    onAddComponent: PropTypes.func.isRequired,

    onDelete: PropTypes.func.isRequired,

    onEdit: PropTypes.func.isRequired,

    onMove: PropTypes.func.isRequired,

    disabled: PropTypes.bool,

    // 以下 props 由 config 组件提供
    background: PropTypes.string
  };

  static defaultProps = {
    background: '#f9f9f9',
    disabled: false,
    appendableComponents: [],
    prefix: 'zent'
  };

  previewItems = {};
  editorItems = {};

  render() {
    const {
      components,
      value,
      validations,
      showError,
      onComponentValueChange,
      onAddComponent,
      design,
      appendableComponents,
      showAddComponentOverlay,
      selectedUUID,
      getUUIDFromValue,
      onSelect,
      onDelete,
      onEdit,
      onAdd,
      onMove,
      className,
      prefix,
      globalConfig,
      disabled,
      background
    } = this.props;

    const children = value.map((v, idx) => {
      const valueType = v.type;
      const comp = find(components, c => isExpectedDesginType(c, valueType));
      const PreviewItem = comp.previewItem || DesignPreviewItem;
      const EditorItem = comp.editorItem || DesignEditorItem;
      const id = getUUIDFromValue(v);
      const selected = id === selectedUUID;
      const PreviewController =
        comp.previewController || DesignPreviewController;

      return (
        <PreviewItem
          prefix={prefix}
          key={id}
          id={id}
          ref={this.savePreviewItem(id)}
        >
          <PreviewController
            prefix={prefix}
            value={v}
            globalConfig={globalConfig}
            design={design}
            index={idx}
            dragable={defaultTo(comp.dragable, true)}
            editable={defaultTo(comp.editable, true)}
            configurable={defaultTo(comp.configurable, true)}
            highlightWhenSelect={defaultTo(comp.highlightWhenSelect, true)}
            isSelected={selected}
            onSelect={onSelect}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={onAdd}
            onMove={onMove}
            component={comp.preview}
            previewProps={getAdditionalProps(comp.previewProps, v)}
          />

          {selected &&
            !showAddComponentOverlay &&
            <EditorItem
              prefix={prefix}
              disabled={disabled}
              ref={this.saveEditorItem(id)}
            >
              <comp.editor
                {...getAdditionalProps(comp.editorProps, v)}
                value={v}
                onChange={onComponentValueChange(v)}
                globalConfig={globalConfig}
                design={design}
                validation={validations[id] || {}}
                showError={showError}
                prefix={prefix}
              />
            </EditorItem>}

          {selected &&
            showAddComponentOverlay &&
            <DesignEditorItem ref={this.saveEditorItem(id)} prefix={prefix}>
              <DesignEditorAddComponent
                prefix={prefix}
                fromSelected
                components={appendableComponents}
                onAddComponent={onAddComponent}
              />
            </DesignEditorItem>}
        </PreviewItem>
      );
    });

    const cls = cx(`${prefix}-design-preview`, className);
    const hasAppendableComponent = appendableComponents.length > 0;

    return (
      <div className={cls} style={{ background }}>
        {disabled && <div className={`${prefix}-design__disabled-mask`} />}
        <div
          className={cx(`${prefix}-design__item-list`, {
            [`${prefix}-design__item-list--full-height`]: !hasAppendableComponent
          })}
        >
          {children}
          {hasAppendableComponent &&
            <div className={`${prefix}-design__item-list-arrow-area`} />}
        </div>
        {hasAppendableComponent &&
          <div className={`${prefix}-design__add`}>
            <DesignEditorAddComponent
              prefix={prefix}
              components={appendableComponents}
              onAddComponent={onAddComponent}
            />
          </div>}
      </div>
    );
  }

  savePreviewItem = id => instance => {
    this.previewItems[id] = instance;
  };

  saveEditorItem = id => instance => {
    this.editorItems[id] = instance;
  };

  scrollToItem = (id, offsets) => {
    const item = this.previewItems[id];

    if (!item) {
      return;
    }

    item.scrollTop(offsets);
  };

  getEditorBoundingBox(id) {
    const item = this.editorItems[id];

    if (!item) {
      return;
    }

    return item.getBoundingBox();
  }
}

function getAdditionalProps(propsOrFn, value) {
  const props = isFunction(propsOrFn) ? propsOrFn(value) : propsOrFn;

  return props || {};
}

export default DesignPreview;
