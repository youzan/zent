import { I18nComponentName, I18nLocaleDataType } from './locale';
import { useContext, useMemo } from 'react';
import I18nContext from './I18nContext';

export function useComponentI18nData<T extends I18nComponentName>(
  componentName: T
): I18nLocaleDataType<T> {
  const ctx = useContext(I18nContext);

  return useMemo(() => {
    const i18n = ctx[componentName];
    return (typeof i18n === 'function'
      ? i18n()
      : i18n) as unknown as I18nLocaleDataType<T>;
  }, [ctx, componentName]);
}
