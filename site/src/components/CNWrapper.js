import React from 'react';

import Layout from './Layout';

export default class CNWrapper extends React.Component {
  componentWillMount() {
    const { changeI18N, i18n } = this.props.pass;
    if (i18n !== 'zh-CN') {
      changeI18N('zh-CN');
    }
  }

  render() {
    const { children, pass } = this.props;
    return <Layout {...pass}>{children}</Layout>;
  }
}
