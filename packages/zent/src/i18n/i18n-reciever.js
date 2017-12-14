import * as React from 'react';
import PropTypes from 'prop-types';

const { Component, PureComponent } = React;

export default class I18nReciever extends (PureComponent || Component) {
  static propTypes = {
    componentName: PropTypes.string.isRequired,
    defaultI18n: PropTypes.object.isRequired
  };

  static contextType = {
    lang: PropTypes.object
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
      ...defaultI18n,
      ...i18n
    };
  }

  render() {
    return this.props.children(this.recieve());
  }
}
