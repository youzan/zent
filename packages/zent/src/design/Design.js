/* eslint-disable no-script-url */

import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import Alert from 'alert';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'lodash/assign';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import defaultTo from 'lodash/defaultTo';

import DesignPreview from './preview/DesignPreview';
import uuid from './utils/uuid';
import { getDesignType, isExpectedDesginType } from './utils/design-type';
import * as storage from './utils/storage';

const UUID_KEY = '__zent-design-uuid__';
const CACHE_KEY = '__zent-design-cache-storage__';

const hasValidateError = v => !isEmpty(v[Object.keys(v)[0]]);

export default class Design extends (PureComponent || Component) {
  static propTypes = {
    components: PropTypes.arrayOf(
      PropTypes.shape({
        // 组件类型
        type: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string)
        ]).isRequired,

        // 预览这个组件的 Component
        preview: PropTypes.func.isRequired,

        // 预览组件的包裹层
        previewItem: PropTypes.func,

        // 所有预览界面上的事件都是在这个里面处理的
        previewController: PropTypes.func,

        // 编辑这个组件的 Component
        editor: PropTypes.func.isRequired,

        // 编辑组件的包裹层
        editorItem: PropTypes.func,

        // 传给 editor 的额外 props
        editorProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

        // 传给 preview 的额外 props
        previewProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

        // 组件是否可以拖拽
        dragable: PropTypes.bool,

        // 组件是否出现在添加组件的列表里面
        appendable: PropTypes.bool,

        // 是否显示右下角的编辑区域(编辑/加内容/删除)
        // 不支持在这里配置编辑区域的按钮，参数太多。
        // 如果要自定义编辑区域，可以通过重写 previewController 的方式来做。
        configurable: PropTypes.bool,

        // 组件是否可以编辑
        // 可以选中的组件一定是可以编辑的
        // 不可编辑的组件不可选中，只能展示。
        // 右下角的编辑区域由 configurable 单独控制
        editable: PropTypes.bool,

        // 选中时是否高亮
        highlightWhenSelect: PropTypes.bool
      })
    ).isRequired,

    value: PropTypes.arrayOf(PropTypes.object),

    // 默认选中的组件下标
    defaultSelectedIndex: PropTypes.number,

    // onChange(value: object)
    onChange: PropTypes.func.isRequired,

    // 用来渲染整个 Design 组件
    preview: PropTypes.func,

    // 有未保存数据关闭窗口时需要用户确认
    // 离开时的确认文案新版本的浏览器是不能自定义的。
    // https://www.chromestatus.com/feature/5349061406228480
    confirmUnsavedLeave: PropTypes.bool,

    // 是否将未保存的数据暂存到 localStorage 中
    // 下次打开时如果有未保存的数据会提示从 localStorage 中恢复
    // 这个 props 不支持动态修改，只会在 mount 的时候检查一次状态
    cache: PropTypes.bool,

    // Design 实例的缓存 id，根据这个 id 识别缓存
    cacheId: PropTypes.string,

    // 恢复缓存时的提示文案
    cacheRestoreMessage: PropTypes.string,

    // 是否禁用编辑功能
    // 开启后，会忽略 components 里面的 editable 设置，全部不可编辑
    disabled: PropTypes.bool,

    // 一些用户自定义的全局配置
    globalConfig: PropTypes.object,

    // 滚动到顶部时的偏移量
    scrollTopOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

    // 滚动到左侧时的偏移量
    scrollLeftOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),

    children: PropTypes.node,

    className: PropTypes.string,

    prefix: PropTypes.string
  };

  static defaultProps = {
    preview: DesignPreview,
    value: [],
    defaultSelectedIndex: -1,
    globalConfig: {},
    confirmUnsavedLeave: true,
    cacheToLocalStorage: false,
    cacheRestoreMessage: '提示：在浏览器中发现未提交的内容，是否使用该内容替换当前内容？',
    scrollTopOffset: -10,
    scrollLeftOffset: -10,
    prefix: 'zent'
  };

  constructor(props) {
    super(props);

    const { value, defaultSelectedIndex } = props;

    this.validateCacheProps(props);

    tagValuesWithUUID(value);

    const safeValueIndex = Math.min(defaultSelectedIndex, value.length - 1);
    const selectedValue = value[safeValueIndex];

    this.state = {
      // 当前选中的组件对应的 UUID
      selectedUUID: this.getUUIDFromValue(selectedValue),

      // 是否显示添加组件的浮层
      showAddComponentOverlay: false,

      // 可添加的组件列表
      appendableComponents: [],

      // 当前所有组件的 validation 信息
      // key 是 value 的 UUID
      validations: {},

      // 是否强制显示错误
      showError: false,

      // 是否显示从缓存中恢复的提示
      showRestoreFromCache: false,

      // 当 preview 很长时，为了对齐 preview 底部需要的额外空间
      bottomGap: 0
    };
  }

  render() {
    const {
      className,
      prefix,
      preview,
      cacheRestoreMessage,
      children
    } = this.props;
    const { showRestoreFromCache, bottomGap } = this.state;
    const cls = cx(`${prefix}-design`, className);

    return (
      <div className={cls} style={{ paddingBottom: bottomGap }}>
        {showRestoreFromCache &&
          <Alert
            className={`${prefix}-design__restore-cache-alert`}
            closable
            onClose={this.onRestoreCacheAlertClose}
            type="warning"
          >
            {cacheRestoreMessage}
            <a
              className={`${prefix}-design__restore-cache-alert-use`}
              onClick={this.restoreCache}
              href="javascript:void(0);"
            >
              使用
            </a>
          </Alert>}
        {this.renderPreview(preview)}
        {children}
      </div>
    );
  }

  componentWillMount() {
    this.cacheAppendableComponents(this.props.components);
  }

  componentDidMount() {
    this.setupBeforeUnloadHook();
    this.checkCache();
  }

  componentDidUpdate() {
    this.setupBeforeUnloadHook();
  }

  componentWillUnmount() {
    this.uninstallBeforeUnloadHook();
  }

  componentWillReceiveProps(nextProps) {
    this.validateCacheProps(nextProps);

    if (nextProps.value !== this.props.value) {
      tagValuesWithUUID(nextProps.value);
    }
    if (nextProps.components !== this.props.components) {
      this.cacheAppendableComponents(nextProps.components);
    }
  }

  cacheAppendableComponents(components) {
    this.setState({
      appendableComponents: components.filter(
        c => c.appendable === undefined || c.appendable
      )
    });
  }

  renderPreview(preview) {
    const { components, prefix, value, disabled, globalConfig } = this.props;
    const {
      selectedUUID,
      appendableComponents,
      showAddComponentOverlay,
      validations,
      showError
    } = this.state;

    return React.createElement(preview, {
      prefix,
      components,
      value,
      validations,
      showError,
      onComponentValueChange: this.onComponentValueChange,
      onAddComponent: this.onAdd,
      appendableComponents,
      selectedUUID,
      getUUIDFromValue: this.getUUIDFromValue,
      showAddComponentOverlay,
      onAdd: this.onShowAddComponentOverlay,
      onEdit: this.onShowEditComponentOverlay,
      onSelect: this.onSelect,
      onMove: this.onMove,
      onDelete: this.onDelete,
      design: this.design,
      globalConfig,
      disabled,
      ...this.getPreviewProps(),

      ref: this.savePreview
    });
  }

  onComponentValueChange = identity => (diff, replace = false) => {
    const { value } = this.props;
    const newComponentValue = replace
      ? assign({ [UUID_KEY]: this.getUUIDFromValue(identity) }, diff)
      : assign({}, identity, diff);
    const newValue = value.map(v => (v === identity ? newComponentValue : v));
    const changedProps = Object.keys(diff);

    this.trackValueChange(newValue);
    this.validateComponentValue(
      newComponentValue,
      identity,
      changedProps
    ).then(errors => {
      const id = this.getUUIDFromValue(newComponentValue);
      this.setValidation({ [id]: errors });
    });
  };

  validateComponentValue = (value, prevValue, changedProps) => {
    const { type } = value;
    const { components } = this.props;
    const comp = find(components, c => isExpectedDesginType(c, type));
    const { validate } = comp.editor;
    const p = validate(value, prevValue, changedProps);

    return p;
  };

  // 打开右侧添加新组件的弹层
  onShowAddComponentOverlay = component => {
    this.toggleEditOrAdd(component, true);

    // 将当前组件滚动到顶部
    const id = this.getUUIDFromValue(component);
    this.scrollToPreviewItem(id);
  };

  // 编辑一个已有组件
  onShowEditComponentOverlay = component => {
    this.toggleEditOrAdd(component, false);

    // 将当前组件滚动到顶部
    const id = this.getUUIDFromValue(component);
    this.scrollToPreviewItem(id);
  };

  // 选中一个组件
  onSelect = component => {
    const id = this.getUUIDFromValue(component);

    if (this.isSelected(component)) {
      return;
    }

    this.setState({
      selectedUUID: id,
      showAddComponentOverlay: false
    });

    this.adjustHeight();
  };

  // 添加一个新组件
  onAdd = (component, fromSelected) => {
    const { value } = this.props;
    const editor = component.editor;
    const instance = editor.getInitialValue();
    instance.type = getDesignType(editor);
    const id = uuid();
    this.setUUIDForValue(instance, id);

    /**
     * 添加有两种来源：底部区域或者弹层。
     * 如果来自底部的话，就在当前数组最后加；如果来自弹层就在当前选中的那个组件后面加
     */
    let newValue;
    if (fromSelected) {
      newValue = value.slice();
      const { selectedUUID } = this.state;
      const selectedIndex = findIndex(value, { [UUID_KEY]: selectedUUID });
      newValue.splice(selectedIndex + 1, 0, instance);
    } else {
      newValue = value.concat(instance);
    }

    this.trackValueChange(newValue);
    this.onSelect(instance);

    setTimeout(() => {
      this.scrollToPreviewItem(id);
    }, 0);
  };

  // 删除一个组件
  onDelete = component => {
    const { value, components } = this.props;
    let nextIndex = -1;
    const newValue = value.filter((v, idx) => {
      const skip = v !== component;
      if (!skip) {
        nextIndex = idx - 1;
      }
      return skip;
    });

    // 删除后默认选中前一项可选的，如果不存在则往后找一个可选项
    const nextSelectedValue = findFirstEditableSibling(
      newValue,
      components,
      nextIndex
    );
    const nextUUID = this.getUUIDFromValue(nextSelectedValue);

    this.trackValueChange(newValue);
    this.setState({
      selectedUUID: nextUUID,
      showAddComponentOverlay: false
    });

    this.adjustHeight();
    setTimeout(() => {
      this.scrollToPreviewItem(nextUUID);
    }, 0);
  };

  // 交换两个组件的位置
  onMove = (fromIndex, toIndex) => {
    const { value } = this.props;
    const newValue = value.slice();

    const tmp = value[fromIndex];
    newValue[fromIndex] = newValue[toIndex];
    newValue[toIndex] = tmp;

    this.trackValueChange(newValue);
  };

  // Injections can be overwritten
  getPreviewProps() {}

  setValidation = validation => {
    this.setState({
      validations: assign({}, this.state.validations, validation)
    });

    this.adjustHeight();
  };

  // 验证所有组件，如果有错误选中并跳转到第一个有错误的组件。
  // 如果没有错误，Promise resolve；如果有错误，Promise reject。
  // reject 的是个数组，
  // [
  //   { '508516bf-d3e5-40a5-812e-834d3dee1d54': {} },
  //   { 'c7c72599-2ac5-41bb-9ba0-45e8178ff5a6': { content: '请填写公告内容' } }
  // ]
  validate = () => {
    const { value, components } = this.props;

    return new Promise((resolve, reject) =>
      Promise.all(
        value.map(v => {
          const id = this.getUUIDFromValue(v);
          const { type } = v;
          const comp = find(components, c => isExpectedDesginType(c, type));
          // 假如组件设置了 editable: false，不处罚校验
          if (!defaultTo(comp.editable, true)) {
            return Promise.resolve({ [id]: {} });
          }

          return this.validateComponentValue(v, v, {}).then(errors => {
            return { [id]: errors };
          });
        })
      ).then(validationList => {
        const validations = assign({}, ...validationList);

        this.setState(
          {
            showError: true,
            validations
          },
          () => {
            // 跳转到第一个有错误的组件
            const firstError = find(validationList, hasValidateError);

            if (firstError) {
              const id = Object.keys(firstError)[0];
              this.scrollToPreviewItem(id);

              // 选中第一个有错误的组件
              this.setState({
                selectedUUID: id,
                showAddComponentOverlay: false,
                onShowEditComponentOverlay: true
              });
            }

            this.adjustHeight();
          }
        );

        // 过滤所有错误信息，将数组合并为一个对象，key 是每个组件的 id
        const validationErrors = validationList.filter(hasValidateError);
        const hasError = !isEmpty(validationErrors);

        if (!hasError) {
          resolve();
        } else {
          reject(
            validationErrors.reduce((err, v) => {
              const key = Object.keys(v)[0];
              if (key) {
                err[key] = v[key];
              }

              return err;
            }, {})
          );
        }
      })
    );
  };

  // 保存数据后请调用这个函数通知组件数据已经保存
  markAsSaved = () => {
    this._dirty = false;
    this.removeCache();
  };

  toggleEditOrAdd(component, showAdd) {
    const { showAddComponentOverlay } = this.state;
    const id = this.getUUIDFromValue(component);

    if (this.isSelected(component) && showAddComponentOverlay === showAdd) {
      return;
    }

    this.setState({
      selectedUUID: id,
      showAddComponentOverlay: showAdd
    });
    this.adjustHeight();
  }

  isSelected = value => {
    const { selectedUUID } = this.state;
    return this.getUUIDFromValue(value) === selectedUUID;
  };

  getUUIDFromValue(value) {
    return value && value[UUID_KEY];
  }

  setUUIDForValue(value, id) {
    if (value) {
      value[UUID_KEY] = id;
    }

    return value;
  }

  savePreview = instance => {
    if (instance && instance.getDecoratedComponentInstance) {
      instance = instance.getDecoratedComponentInstance();
    }
    this.preview = instance;
  };

  // 滚动到第一个有错误的组件
  scrollToPreviewItem(id) {
    if (this.preview) {
      const { scrollTopOffset, scrollLeftOffset } = this.props;
      this.preview.scrollToItem &&
        this.preview.scrollToItem(id, {
          top: scrollTopOffset,
          left: scrollLeftOffset
        });
    }
  }

  // 调整 Design 的高度，因为 editor 是 position: absolute 的，所以需要动态的更新
  // 实际并未改变高度，而是设置了margin/padding
  adjustHeight = id => {
    // 不要重复执行
    if (this.adjustHeightTimer) {
      clearTimeout(this.adjustHeightTimer);
      this.adjustHeightTimer = undefined;
    }

    this.adjustHeightTimer = setTimeout(() => {
      id = id || this.state.selectedUUID;
      if (this.preview && this.preview.getEditorBoundingBox) {
        const editorBB = this.preview.getEditorBoundingBox(id);
        if (!editorBB) {
          return this.setState({
            bottomGap: 0
          });
        }

        const previewNode = findDOMNode(this.preview);
        const previewBB = previewNode && previewNode.getBoundingClientRect();
        if (!previewBB) {
          return;
        }

        const gap = Math.max(0, editorBB.bottom - previewBB.bottom);
        this.setState({
          bottomGap: gap
        });
      }
    }, 0);
  };

  // 调用 onChange 的统一入口，用于处理一些需要知道有没有修改过值的情况
  trackValueChange(newValue, writeCache = true) {
    const { onChange } = this.props;
    onChange(newValue);

    if (!this._dirty) {
      this._dirty = true;
    }

    if (writeCache) {
      this.writeCache(newValue);
    }

    this.adjustHeight();
  }

  setupBeforeUnloadHook() {
    const { confirmUnsavedLeave } = this.props;

    if (this._hasBeforeUnloadHook || !confirmUnsavedLeave) {
      return;
    }

    window.addEventListener('beforeunload', this.onBeforeWindowUnload);
    this._hasBeforeUnloadHook = true;
  }

  uninstallBeforeUnloadHook() {
    window.addEventListener('beforeunload', this.onBeforeWindowUnload);
    this._hasBeforeUnloadHook = false;
  }

  onBeforeWindowUnload = evt => {
    if (!this._dirty) {
      return;
    }

    // 这个字符串其实不会展示给用户
    const confirmLeaveMessage = '页面上有未保存的数据，确定要离开吗？';
    evt.returnValue = confirmLeaveMessage;
    return confirmLeaveMessage;
  };

  // 缓存相关的函数
  validateCacheProps(props) {
    props = props || this.props;
    const { cache, cacheId } = props;
    if (cache && !cacheId) {
      throw new Error('Design: cacheId is required when cache is on');
    }
  }

  checkCache() {
    const { cache } = this.props;

    if (cache) {
      const cachedValue = this.readCache();

      if (cachedValue !== storage.NOT_FOUND) {
        this.setState({
          showRestoreFromCache: true
        });
      }
    }
  }

  readCache() {
    const { cache } = this.props;
    if (!cache) {
      return storage.NOT_FOUND;
    }

    const { cacheId } = this.props;
    return storage.read(CACHE_KEY, cacheId);
  }

  writeCache(value) {
    const { cache } = this.props;
    if (!cache) {
      return false;
    }

    const { cacheId } = this.props;
    return storage.write(CACHE_KEY, cacheId, value);
  }

  removeCache() {
    // 这个函数不需要检查有没有开启缓存，强制清除
    const { cacheId } = this.props;
    return storage.write(CACHE_KEY, cacheId, undefined);
  }

  // 关闭提示，但是不清楚缓存
  onRestoreCacheAlertClose = () => {
    this.setState({
      showRestoreFromCache: false
    });
  };

  // 恢复缓存的数据并删除缓存
  restoreCache = evt => {
    evt.preventDefault();

    const cachedValue = this.readCache();
    if (cachedValue !== storage.NOT_FOUND) {
      this.trackValueChange(cachedValue, false);
      this.setState({
        showRestoreFromCache: false
      });
      this.removeCache();
    }
  };

  // Actions on design
  design = (() => {
    return {
      injections: {
        getPreviewProps: implementation => {
          this.getPreviewProps = implementation;
        }
      },

      getUUID: this.getUUIDFromValue,

      validateComponentValue: this.validateComponentValue,

      setValidation: this.setValidation,

      markAsSaved: this.markAsSaved,

      adjustPreviewHeight: this.adjustHeight
    };
  })();
}

function tagValuesWithUUID(values) {
  values.forEach(v => {
    if (!v[UUID_KEY]) {
      v[UUID_KEY] = uuid();
    }
  });
}

/**
 * 从 startIndex 开始往前找到第一个可以选中的值
 * @param {array} value 当前的值
 * @param {array} components 当前可用的组件列表
 * @param {number} startIndex 开始搜索的下标
 */
function findFirstEditableSibling(value, components, startIndex) {
  const loop = i => {
    const val = value[i];
    const type = val.type;
    const comp = find(components, c => isExpectedDesginType(c, type));
    if (comp && defaultTo(comp.editable, true)) {
      return val;
    }
  };

  const valueLength = value.length;
  // 往前找
  for (let i = startIndex; i >= 0 && i < valueLength; i--) {
    const val = loop(i);
    if (val) {
      return val;
    }
  }

  // 往后找
  for (let i = startIndex + 1; i < valueLength; i++) {
    const val = loop(i);
    if (val) {
      return val;
    }
  }

  return null;
}
