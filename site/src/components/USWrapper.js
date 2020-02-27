import React from 'react';

import Layout from './Layout';

export default class CNWrapper extends React.Component {
  componentDidMount() {
    const { changeI18N, i18n } = this.props.pass;
    if (i18n !== 'en-US') {
      changeI18N('en-US');
    }
  }

  render() {
    const { children, pass } = this.props;
    return <Layout {...pass}>{children}</Layout>;
  }
}
