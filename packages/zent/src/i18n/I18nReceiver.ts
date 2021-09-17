import { Component, ReactNode } from 'react';

import I18nContext from './I18nContext';
import { I18nComponentName, I18nLocaleDataType } from './locale';

export interface II18nReceiverProps<T extends I18nComponentName> {
  componentName: T;
  children(i18n: I18nLocaleDataType<T>): ReactNode;
}

export default class I18nReceiver<
  T extends I18nComponentName
> extends Component<II18nReceiverProps<T>> {
  static contextType = I18nContext;

  context!: React.ContextType<typeof I18nContext>;

  receive(): I18nLocaleDataType<T> {
    const { componentName } = this.props;
    const i18n = this.context[componentName];

    return (typeof i18n === 'function'
      ? i18n()
      : i18n) as unknown as I18nLocaleDataType<T>;
  }

  render() {
    const { children } = this.props;

    return children(this.receive());
  }
}
