import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pop from 'pop';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import noop from 'lodash/noop';

import LazyMap from '../utils/LazyMap';
import { serializeDesignType } from '../utils/design-type';
import { splitGroup, isGrouped } from '../utils/component-group';

export default class DesignEditorAddComponent extends PureComponent {
  static propTypes = {
    components: PropTypes.array,

    componentInstanceCount: PropTypes.object,

    onAddComponent: PropTypes.func.isRequired,

    fromSelected: PropTypes.bool,

    prefix: PropTypes.string,
  };

  static defaultProps = {
    fromSelected: false,
    prefix: 'zent',
  };

  state = {
    popVisibleMap: new LazyMap(false),
  };

  onPopVisibleChange = key => visible => {
    this.setState({
      popVisibleMap: this.state.popVisibleMap.clone().set(key, visible),
    });
  };

  onAdd = component => () => {
    const { componentInstanceCount } = this.props;

    if (canAddMoreInstance(component, componentInstanceCount)) {
      const { shouldCreate } = component;
      shouldAddComponentPromise(component, shouldCreate).then(() => {
        const { fromSelected, onAddComponent } = this.props;
        onAddComponent(component, fromSelected);
      }, noop);
    }
  };

  render() {
    const { components, prefix, componentInstanceCount } = this.props;
    const { popVisibleMap } = this.state;

    if (!components || !components.length) {
      return null;
    }

    if (isGrouped(components)) {
      return this.renderGrouped();
    }

    return (
      <div
        className={`${prefix}-design-editor-add-component ${prefix}-design-editor-add-component--mixed`}
      >
        <div className={`${prefix}-design-editor-add-component__mixed-title`}>
          添加内容
        </div>
        <div className={`${prefix}-design-editor-add-component__mixed-list`}>
          {components.map(c => {
            const { type } = c;
            const key = serializeDesignType(type);

            return (
              <ComponentButton
                prefix={prefix}
                type="mixed"
                key={key}
                component={c}
                componentInstanceCount={componentInstanceCount}
                onAdd={this.onAdd}
                popVisibleMap={popVisibleMap}
                onPopVisibleChange={this.onPopVisibleChange}
              />
            );
          })}
        </div>
      </div>
    );
  }

  renderGrouped() {
    const { components, prefix, componentInstanceCount } = this.props;
    const { popVisibleMap } = this.state;
    const groups = splitGroup(components);

    return (
      <div
        className={`${prefix}-design-editor-add-component ${prefix}-design-editor-add-component--grouped`}
      >
        {groups.map(g => (
          <ComponentGroup
            prefix={prefix}
            key={g.group.name}
            group={g.group}
            components={g.components}
            componentInstanceCount={componentInstanceCount}
            onAdd={this.onAdd}
            popVisibleMap={popVisibleMap}
            onPopVisibleChange={this.onPopVisibleChange}
          />
        ))}
      </div>
    );
  }
}

function ComponentGroup({
  prefix,
  group,
  components,
  onAdd,
  componentInstanceCount,
  onPopVisibleChange,
  popVisibleMap,
}) {
  return (
    <div className={`${prefix}-design-editor-add-component__grouped`}>
      <p className={`${prefix}-design-editor-add-component__grouped-title`}>
        {group.name}
      </p>
      <div className={`${prefix}-design-editor-add-component__grouped-list`}>
        {components.map(c => {
          const { type } = c;
          const key = serializeDesignType(type);

          return (
            <ComponentButton
              prefix={prefix}
              key={key}
              type="grouped"
              component={c}
              componentInstanceCount={componentInstanceCount}
              onAdd={onAdd}
              popVisibleMap={popVisibleMap}
              onPopVisibleChange={onPopVisibleChange}
            />
          );
        })}
      </div>
    </div>
  );
}

function ComponentButton(props) {
  const {
    prefix,
    component,
    componentInstanceCount,
    onAdd,
    popVisibleMap,
    onPopVisibleChange,
    type,
  } = props;

  const disabled = !canAddMoreInstance(component, componentInstanceCount);
  const key = serializeDesignType(component.type);
  const visible = popVisibleMap.get(key);
  const message = getLimitMessage(component, componentInstanceCount);

  return (
    <Pop
      content={message}
      trigger={disabled && message ? 'hover' : 'none'}
      visible={visible}
      onVisibleChange={onPopVisibleChange(key)}
      position="top-center"
      mouseLeaveDelay={100}
      mouseEnterDelay={300}
      className={`${prefix}-design-editor-add-component-pop`}
      wrapperClassName={`${prefix}-design-editor-add-component-btn-wrapper ${prefix}-design-editor-add-component__${type}-btn-wrapper`}
    >
      <a
        onClick={onAdd(component)}
        className={cx(`${prefix}-design-editor-add-component__${type}-btn`, {
          [`${prefix}-design-editor-add-component__${type}-btn--disabled`]: disabled,
        })}
        disabled={disabled}
      >
        {component.editor.designDescription}
      </a>
    </Pop>
  );
}

function canAddMoreInstance(component, componentInstanceCount) {
  const { type, limit } = component;
  const key = serializeDesignType(type);
  const count = componentInstanceCount.get(key);

  if (isFunction(limit)) {
    return limit(count);
  }

  return limit ? count < limit : true;
}

function getLimitMessage(component, componentInstanceCount) {
  const { type, limitMessage, limit } = component;
  const key = serializeDesignType(type);
  const count = componentInstanceCount.get(key);

  if (isFunction(limitMessage)) {
    return limitMessage(count);
  }

  let defaultMessage = '';
  if (isNumber(limit)) {
    // limit === 0 表示不限制
    if (limit > 0) {
      defaultMessage = `该组件最多可以添加 ${limit} 个`;
    } else if (limit < 0) {
      defaultMessage = '该组件暂不可用';
    }
  }

  return limitMessage || defaultMessage;
}

// Normalize to Promise
function shouldAddComponentPromise(component, fn) {
  if (isFunction(fn)) {
    return fn(component);
  }

  return Promise.resolve();
}
