import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import { serializeDesignType } from '../utils/design-type';
import { splitGroup, isGrouped } from '../utils/component-group';

export default class DesignEditorAddComponent extends (PureComponent ||
  Component) {
  static propTypes = {
    components: PropTypes.array,

    componentInstanceCount: PropTypes.object,

    onAddComponent: PropTypes.func.isRequired,

    fromSelected: PropTypes.bool,

    prefix: PropTypes.string
  };

  static defaultProps = {
    fromSelected: false,
    prefix: 'zent'
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
          {components.map((c, idx) => (
            <button
              onClick={this.onAdd(c)}
              key={idx}
              className={cx(
                `${prefix}-design-editor-add-component__mixed-btn`,
                {
                  [`${prefix}-design-editor-add-component__mixed-btn--disabled`]: !canAddMoreInstance(
                    c,
                    componentInstanceCount
                  )
                }
              )}
            >
              {c.editor.designDescription}
            </button>
          ))}
        </div>
      </div>
    );
  }

  renderGrouped() {
    const { components, prefix, componentInstanceCount } = this.props;
    const groups = splitGroup(components);

    return (
      <div
        className={`${prefix}-design-editor-add-component ${prefix}-design-editor-add-component--grouped`}
      >
        {groups.map(g => (
          <ComponentGroup
            key={g.group.name}
            group={g.group}
            components={g.components}
            componentInstanceCount={componentInstanceCount}
            prefix={prefix}
            onAdd={this.onAdd}
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
  componentInstanceCount
}) {
  return (
    <div className={`${prefix}-design-editor-add-component__grouped`}>
      <p className={`${prefix}-design-editor-add-component__grouped-title`}>
        {group.name}
      </p>
      <div className={`${prefix}-design-editor-add-component__grouped-list`}>
        {components.map((c, idx) => (
          <button
            onClick={onAdd(c)}
            key={idx}
            className={cx(
              `${prefix}-design-editor-add-component__grouped-btn`,
              {
                [`${prefix}-design-editor-add-component__grouped-btn--disabled`]: !canAddMoreInstance(
                  c,
                  componentInstanceCount
                )
              }
            )}
          >
            {c.editor.designDescription}
          </button>
        ))}
      </div>
    </div>
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

// Normalize to Promise
function shouldAddComponentPromise(component, fn) {
  if (isFunction(fn)) {
    return fn(component);
  }

  return Promise.resolve();
}
