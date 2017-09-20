import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';

import { serializeDesignType } from '../utils/design-type';

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
    const { onAddComponent, fromSelected, componentInstanceCount } = this.props;

    if (canAddMoreInstance(component, componentInstanceCount)) {
      onAddComponent(component, fromSelected);
    }
  };

  render() {
    const { components, prefix, componentInstanceCount } = this.props;

    if (!components || !components.length) {
      return null;
    }

    return (
      <div className={`${prefix}-design-editor-add-component`}>
        <div className={`${prefix}-design-editor-add-component__title`}>
          添加内容
        </div>
        <div className={`${prefix}-design-editor-add-component__list`}>
          {components.map((c, idx) => (
            <button
              onClick={this.onAdd(c)}
              key={idx}
              className={cx(`${prefix}-design-editor-add-component__btn`, {
                [`${prefix}-design-editor-add-component__btn--disabled`]: !canAddMoreInstance(
                  c,
                  componentInstanceCount
                )
              })}
            >
              {c.editor.designDescription}
            </button>
          ))}
        </div>
      </div>
    );
  }
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
