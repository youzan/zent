import { Component } from 'react';
import PropTypes from 'prop-types';

import I18nContext from './I18nContext';

export default class I18nReceiver extends Component {
  static propTypes = {
    componentName: PropTypes.string.isRequired,
    defaultI18n: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  };

  static contextType = I18nContext;

  receive() {
    const { componentName, defaultI18n } = this.props;
    const zentI18n = this.context;
    const i18n = (zentI18n && zentI18n[componentName]) || {};

    return {
      ...(typeof defaultI18n === 'function' ? defaultI18n() : defaultI18n),
      ...(typeof i18n === 'function' ? i18n() : i18n),
      mark: (zentI18n && zentI18n.mark) || 'zh-CN', // i18n标记
    };
  }

  render() {
    const { children, componentName, defaultI18n, ...bypass } = this.props;

    return children(this.receive(), bypass);
  }
}
