import { Component, ReactNode } from 'react';

import I18nContext from './I18nContext';

export interface II18nReceiverProps<P> {
  componentName: string;
  defaultI18n?: () => {
    [key: string]: {
      [key: string]: string;
    };
  };
  children(
    map: {
      [key: string]: string;
    },
    props: P
  ): ReactNode;
}

export default class I18nReceiver<P extends {}> extends Component<
  II18nReceiverProps<P> & P
> {
  static contextType = I18nContext;

  context!: React.ContextType<typeof I18nContext>;

  receive() {
    const { componentName, defaultI18n } = this.props;
    const zentI18n = this.context;
    const i18n = (zentI18n && (zentI18n as any)[componentName]) || {};

    return {
      ...(typeof defaultI18n === 'function' ? defaultI18n() : defaultI18n),
      ...(typeof i18n === 'function' ? i18n() : i18n),
      mark: (zentI18n && zentI18n.mark) || 'zh-CN', // i18n标记
    };
  }

  render() {
    const { children, componentName, defaultI18n, ...bypass } = this.props;

    return children(this.receive(), (bypass as unknown) as P);
  }
}
