import * as React from 'react';
import PropTypes from 'prop-types';

const { Component, PureComponent } = React;

export default class I18nReciever extends (PureComponent || Component) {
  static propTypes = {
    componentName: PropTypes.string.isRequired,
    defaultI18n: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
      .isRequired
  };

  static contextTypes = {
    zentI18n: PropTypes.object
  };

  /**
   * as a functional wrapper, update itself as its father re-render.
   *
   * @returns true
   * @memberof I18nReciever
   */
  shouldComponentUpdate() {
    return true;
  }

  recieve() {
    const { componentName, defaultI18n } = this.props;
    const { zentI18n } = this.context;
    const i18n = (zentI18n && zentI18n[componentName]) || {};
    return {
      ...(typeof defaultI18n === 'function' ? defaultI18n() : defaultI18n),
      ...(typeof i18n === 'function' ? i18n() : i18n)
    };
  }

  render() {
    const { children, componentName, defaultI18n, ...bypass } = this.props;
    return children(this.recieve(), bypass);
  }
}
