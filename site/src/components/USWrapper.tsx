import { Component } from 'react';

import Layout from './Layout';
import { ILayoutProps } from '../types';

export interface IUSWrapperProps {
  pass: ILayoutProps;
}

export default class USWrapper extends Component<IUSWrapperProps> {
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
