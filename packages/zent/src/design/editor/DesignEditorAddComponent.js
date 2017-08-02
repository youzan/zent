import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';

export default class DesignEditorAddComponent extends (PureComponent ||
  Component) {
  static propTypes = {
    components: PropTypes.array,

    onAddComponent: PropTypes.func.isRequired,

    fromSelected: PropTypes.bool,

    prefix: PropTypes.string
  };

  static defaultProps = {
    fromSelected: false,
    prefix: 'zent'
  };

  onAdd = component => () => {
    const { onAddComponent, fromSelected } = this.props;
    onAddComponent(component, fromSelected);
  };

  render() {
    const { components, prefix } = this.props;

    if (!components || !components.length) {
      return null;
    }

    return (
      <div className={`${prefix}-design-editor-add-component`}>
        <div className={`${prefix}-design-editor-add-component__title`}>
          添加内容
        </div>
        <div className={`${prefix}-design-editor-add-component__list`}>
          {components.map((c, idx) =>
            <button
              onClick={this.onAdd(c)}
              key={idx}
              className={`${prefix}-design-editor-add-component__btn`}
            >
              {c.editor.designDescription}
            </button>
          )}
        </div>
      </div>
    );
  }
}
