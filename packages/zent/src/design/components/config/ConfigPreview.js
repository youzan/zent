import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ConfigPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

    // 用来和 Design 交互
    design: PropTypes.object,

    prefix: PropTypes.string,
  };

  render() {
    const { value, prefix } = this.props;

    return (
      <div className={`${prefix}-design-component-config-preview`}>
        <div className={`${prefix}-design-component-config-preview__title`}>
          {value.title}
        </div>
      </div>
    );
  }
}
